<template>
    <div id="Democlassify">
        <el-card class="democlassify-card">
            <template #header>
                <p>自闭症情绪分析结果</p>
            </template>
            <div class="Democlassify-chart-container">
                    <div id="preChart" class="my-chart1" v-show="showChart" />
                    <div id="bankChart" v-show="showChart" class="my-chart2" />
            </div>
            <div class="Democlassify-text-container" element-loading-text="玩命加载中..."  spinner  v-loading="loading">
                 <div class="Democlassify-text" >
                     <p class="Democlassify-title">大模型情绪分析：</p>
                     <p class="Democlassify-content">{{content}}</p>
                 </div>      
            </div>
        </el-card>  
    </div>
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts'

let precisePredict = [];

// 忽略某些警告
const ignoredWarnings = [
    'Added non-passive event listener to a scroll-blocking',
];

console.defaultWarn = console.warn.bind(console);
console.warn = (msg, ...params) => {
    if (!ignoredWarnings.some(warning => msg.includes(warning))) {
        console.defaultWarn(msg, ...params);
    }
};


export default {
    name: 'Democlassify',
    data() {
        return {
            token: localStorage.getItem('token'),
            tasks: {},
            precisePredict: null,
            showChart: true,
            content: '',
            tasksid: localStorage.getItem('tasksid'),
            loading: true,
        }
    },
    created() {
        this.getTasks();
        this.getcontent();
    },
    mounted() {
        try {
            this.drawLine();
        } catch (error) {
            console.error(error);
        }
    },
    methods: {       
        getTasks() {
            const token = localStorage.getItem('token');

            axios.get('https://api-test.eeg4asd.astralbridge.space/task', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    params: {
                        id: this.tasksid,
                        eegFilePath : 0,
                        state : 0,
                        result : 1,
                        patientID : "1",
                    }
                })
                .then(response => {
                    this.tasks = response.data.data;
                    // console.log(this.tasks);
                    // console.log(this.tasks.result);
                    let result = JSON.parse(this.tasks.result); // 精确预测数据
                    precisePredict = result.prediction;
                    // console.log(precisePredict);
                    this.drawLine();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        drawLine() {

            //数据预处理
            //处理每段的长度数据
            let len = 0; //每个分段长度
            let size = precisePredict.length;
            for(let i = 0; i < size; i++){
                if(precisePredict[i].right_index > len)
                {
                    len = precisePredict[i].right_index;
                }
            }
            len = len + 30;

            //处理长度分段
            let mainleflenpieces = [0, ]; //主要区域左侧分段
            let bankleflenpieces = []; //空白区域左侧分段
            let mainrightlenpieces = []; //主要区域右侧分段
            let bankrightlenpieces = []; //空白区域右侧分段
            let num =0;
            //处理主要区域
            for(let i = 0; i < size; i++){
                num = num + len;
                if(i != size-1)
                    mainleflenpieces.push(num);
                mainrightlenpieces.push(num);
            }

            // 设置参数
            const samplingRate = 1000; // 采样率（每秒采样次数）
            const duration = 10; // 信号持续时间（秒）
            const numSamples = samplingRate * duration;
            // 生成随机信号
            var time = [];
            for (let i = 0; i < mainrightlenpieces[size-1]; i++) {
                time[i] = i;
            }

            let preamplitude = Array.from({
                length: numSamples
            }, () => Math.random() * 20 - 10); // 随机振幅 精确分类

            //处理颜色标记分段 精确分类
            let precisesignedlefpieces = [];
            let precisesignedrightpieces = [];
            for (let i = 0; i < size; i++) {
                precisesignedlefpieces.push(mainleflenpieces[i] + precisePredict[i].left_index);
                precisesignedrightpieces.push(mainleflenpieces[i] + precisePredict[i].right_index);
            }

            // 处理空白区域分段
            for (let i = 0; i < size; i++) {
                if(precisesignedlefpieces[i]!=0)
                {   bankleflenpieces.push(mainleflenpieces[i]);
                    bankrightlenpieces.push(precisesignedlefpieces[i]);
                    bankleflenpieces.push(precisesignedrightpieces[i]);
                    bankrightlenpieces.push(mainrightlenpieces[i]);
                }
                else{
                    bankleflenpieces.push(precisesignedrightpieces[i]);
                    bankrightlenpieces.push(mainrightlenpieces[i]);
                }
            }

            // 处理颜色标记显示精确分类
            for (let i = 0; i < size; i++) {
                for (let j = precisesignedlefpieces[i]; j <= precisesignedrightpieces[i]; j++) {
                    preamplitude[j] = 3.5 * preamplitude[j];
                }
            }

            // 处理颜色标记分段 精确分类
            let precisesignedpieces = [];
            for (let i = 0; i < size; i++) {
                precisesignedpieces.push({
                    min: precisesignedlefpieces[i],
                    max: precisesignedrightpieces[i],
                    color: '#c45656'
                });
            }

            //处理分区段的区域片段 显示label
            //获取label的数据
            let prepiecesarea = [];
            for (let i = 0; i < size; i++) {
                let labeldata = "";
                let colorshow = "";
                if (precisePredict[i].label == 0) labeldata = "消极", colorshow = "#c45656";
                else if (precisePredict[i].label == 1) labeldata = "中立", colorshow = "#79bbff";
                else labeldata = "积极", colorshow = " #95d475";
                prepiecesarea.push([{
                        name: labeldata,
                        type: 'line',
                        xAxis: mainleflenpieces[i],
                        itemStyle: {
                            color: colorshow
                        },
                    },
                    {
                        xAxis: mainrightlenpieces[i],
                    }
                ]);
            }
            // 基于准备好的dom，初始化echarts实例
            let prechartDom = document.getElementById('preChart');
            if (echarts.getInstanceByDom(prechartDom)) {
                // 如果这个 DOM 元素已经有一个 ECharts 实例，销毁它
                echarts.dispose(prechartDom);
            }
            let preChart = echarts.init(prechartDom);
            preChart.setOption({
                title: {
                    text: '脑电图数据分析',
                    left: 'center',
                },

                dataZoom: [ // 添加dataZoom组件
                    {
                        type: 'slider', // 类型为滑动条
                        start: 0, // 初始位置
                        end: 25, // 结束位置
                    },
                    {
                        type: 'inside', // 类型为内置
                        start: 0, // 初始位置为数据的10%
                        end: 20, // 结束位置为数据的60%
                    }
                ],
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    // prettier-ignore
                    data: time, // 时间点数据
                    axisLine: {
                        symbol: ['none', 'arrow'] // 在x轴末端添加箭头
                    },
                    position : 'middle'
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: false,
                    axisLine: {
                        symbol: ['none', 'arrow'] // 在x轴末端添加箭头
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisPointer: {
                        snap: true
                    },
                    max: 40,
                },

                visualMap: {
                    show: false,
                    dimension: 0,
                    pieces: precisesignedpieces,
                    outOfRange: {
                        // 对于除分段外的其他数据，颜色统一
                        color: '#303133'
                    }
                },
                series: [{
                    name: 'EEG-main-region',
                    type: 'line',
                    smooth: true,
                    // prettier-ignore
                    data: preamplitude, // 振幅数据
                    markArea: {
                        data: prepiecesarea,
                    }
                }],
            })

            // 图二数据准备
            let xkind=['消极','中立','积极'];
            let ykind=[0,0,0];
            for(let i = 0; i < size; i++){
                if(precisePredict[i].label == 0) ykind[0]++;
                else if(precisePredict[i].label == 1) ykind[1]++;
                else ykind[2]++;
            }

            var chartDom = document.getElementById('bankChart');
            if (echarts.getInstanceByDom(chartDom)) {
                // 如果这个 DOM 元素已经有一个 ECharts 实例，销毁它
                echarts.dispose(chartDom);
            }
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                title: {
                    text: '情绪分析归纳',
                    color: '#000000',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage: {              
                            show: true,
                            title: '保存为图片'
                        }
                    },
                     right: 10 // 工具箱位置
                     },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xkind,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        barWidth: '60%',
                        data: ykind,
                        label: {
                            show: true,
                            position: 'top',
                            formatter: function (params) {
                                return params.value;
                            }
                        },
                        itemStyle: {
                            color: function (params) {
                                var colorList = ['#c45656', '#79bbff', '#95d475'];
                                return colorList[params.dataIndex]
                            }
                        }
                    }
                ]
            };
            option && myChart.setOption(option);
        },
        getcontent() {
            const token = localStorage.getItem('token');
            axios.post('https://api-test.eeg4asd.astralbridge.space/llm/chat',{
                taskId : this.tasksid,
                message : "先总结一下我的自闭症评级，再帮我总结这次的情绪分析结果，字数限制在150词以内，请使用纯文本回答"
                } ,
                {
                    headers: {
                        Authorization: token
                    },
                })
                .then(res => {
                    this.loading = false;
                    this.content = res.data.data.message;
                })
                .catch(err => {
                    console.log(err);
                });
            }   
    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}

#Democlassify {
    height: 92vh;
    width: 100vw;
    background-color: #ffffff;
    border-radius: 3px; /* 设置圆角 */
    -webkit-app-region: drag;   
}

.democlassify-card{
    margin: 20px;
    width: 80vw;
    height: 88vh;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region:no-drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #ffffff;
}

.democlassify-card p {
    font-size: 20px;
    font-weight: 600;
    margin-top: 2px;
}

.Democlassify-chart-container{
    display: flex;
    justify-content: row;
    margin-top: 20px;
}

.my-chart1{
    width: 35vw;
    height: 350px;
    display: hidden;
    margin-top: 20px;
}

.my-chart2{
    width:25vw;
    height: 330px;
    display: hidden;
    margin-top:3vh;
    margin-left: 10vw;
}

.Democlassify-text-container{
    width: 100%;
    height:250px;
}

.Democlassify-text-container .Democlassify-title{
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
    margin-left: 0;
}

.Democlassify-text-container .Democlassify-content{
    font-size: 13px;
    font-weight: normal;
    line-height: 2;
    color: #2d2d2d;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    text-align: justify;
}

.Democlassify-text{
    width: 100%;
    height: 100%;
}
</style>
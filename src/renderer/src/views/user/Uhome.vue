<template>
    <div id="Uhome">
        <el-card class="uhome-card1">
            <template #header>
                <p>综合</p>
            </template>
            <el-row>
                <el-col  :span="8">
                    <el-statistic title="累计上线次数" :value="Number(utime)" ></el-statistic>
                </el-col> 
                <!-- <el-col  :span="6">
                    <el-statistic title="累计诊疗次数" :value="treattime" ></el-statistic>
                </el-col> -->
                <el-col  :span="8">
                    <el-statistic title="您的主治医生" :value="''">
                        <template #suffix>
                            <p class="docshow">已绑定</p>
                        </template>
                    </el-statistic>
                </el-col>
                <el-col  :span="8">
                    <el-statistic 
                    title="当前时间" 
                    :value="nowtime" 
                    :formatter="timeFormatter" 
                    />
                </el-col>
            </el-row>
        </el-card>
        <el-space wrap>
            <el-card class="uhome-card3">
                <el-row class="card3-title">
                    <el-icon><ChatDotRound /></el-icon>
                    <span>大模型对话</span>
                </el-row>
                <el-row class="card3-button">
                    <el-button type="success" @click="toudialogue"><p class="button-text">开始对话</p></el-button>
                </el-row>
            </el-card>
            <el-card class="uhome-card4">
                <el-row class="card4-title">
                    <el-icon><document /></el-icon>
                    <span>知识库</span>
                </el-row>
                <el-row class="card4-button">
                    <el-button type="success" @click="toulibrary"><p class="button-text">前往知识库</p></el-button>
                </el-row>
            </el-card>
            <el-card class="uhome-card5">
                <el-row class="card5-title">
                    <el-icon><setting /></el-icon>
                    <span>个人信息管理</span>
                </el-row>
                <el-row class="card5-button">
                    <el-button type="success" @click="toumanage"><p class="button-text">前往个人信息管理</p></el-button>
                </el-row>
            </el-card>
        </el-space>
    </div>  
</template>

<script>
import dayjs from 'dayjs';
import { ref, onMounted } from 'vue';

export default {
    name: 'Uhome',
    data() {
        return {
            utime: localStorage.getItem('utime'),
            // treattime:0,
            fileList: [],
            token: localStorage.getItem('token'),
            uploadData: {
                patientID : '',
                eegFile: null,
            },
            uploadHeaders: {
                Authorization: '',
            },
        }
    },
    created() {
         // 在 created 钩子中初始化依赖于 this 的数据属性
        this.uploadHeaders.Authorization = 'Bearer ' + this.token;
    },
    components: {
    }, 
    setup() {
        const nowtime = ref(Date.now());
        const updateTime = () => {
            nowtime.value = Date.now();
        };
        onMounted(() => {
            setInterval(updateTime, 1000); // 每秒更新一次时间
            });

            const timeFormatter = (value) => {
                return dayjs(value).format('HH:mm:ss');
            };
            return {
                nowtime,
                timeFormatter
            };
        },
    methods: {
            toudialogue() {
                this.$router.push('/user/udialogue');
            },
            toulibrary() {
                this.$router.push('/user/ulibrary');
            },
            toumanage() {
                this.$router.push('/user/umanage');
            },
            beforeUpload(file) {
                this.uploadHeaders.Authorization = `Bearer ${this.token}`;
                this.uploadData.patientID = this.form.treatid;
                this.uploadData.eegFile = file;
                return true; // 返回 true 以继续上传
                },
                changeFile(file, fileList) {
                    this.fileList = fileList;
                },
                submitForm(formName) {
                    this.$refs.upload.submit();
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                    this.form.treatid = '';
                    this.fileList = [];
                }
            }
}
</script>

<style>
#Uhome {
    height: 92vh;
    width: 85vw;
    background-color: #ffffff;
    -webkit-app-region: drag;   
    overflow: hidden;

}

.el-statistic .docshow {
    font-size: 14px; /* 调整字体大小 */
    margin-top: 0.6vh;
    justify-content: center;
    align-items: center;
    font-weight: 500; /* 调整字体粗细 */
    color: #333; /* 调整字体颜色 */
}

.el-col {
  text-align: center;
}

.ufrom-btn{
    margin-left: 34vw;
}

.upload-demo-btn{
    margin-left: 2.8vw;
}

.uhome-card1{
    margin: 20px;
    width: 80vw;
    height: auto;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #ffffff;
}

.uhome-card1 p{
    font-size: 20px;
    font-weight: 600;
    margin-top: 2px;
}

.uhome-card2{
    margin: 20px;
    width: 80vw;
    height: auto;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: no-drag;
    overflow: hidden;
    opacity: 0.9;
    background: #ffffff;
}

.uhome-card2 p{
    font-size: 20px;
    font-weight: 600;
    margin-top: 2px;
}

.uhome-card3{
    margin: 2vw;
    width: 20vw;
    height: auto;
    margin-left: 7.6vw;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: no-drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #01c99b;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card3-title{
    font-size: 18px;
    color: #000000;
    font-weight: 600;
    justify-content: center;
    align-items: center;
}

.card3-button{
    display: flex;
    margin-top: 2vh;
    justify-content: center;
    align-items: center;
}

.uhome-card4{
    margin: 20px;
    width: 20vw;
    height: auto;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: no-drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #0d8ce1;
}

.card4-title{
    font-size: 18px;
    color: #000000;
    font-weight: 600;
    justify-content: center;
    align-items: center;
}

.card4-button{
    display: flex;
    margin-top: 2vh;
    justify-content: center;
    align-items: center;
}

.uhome-card5{
    margin: 20px;
    width: 20vw;
    height: auto;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: no-drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #ccf001;
}

.card5-title{
    font-size: 18px;
    color: #000000;
    font-weight: 600;
    justify-content: center;
    align-items: center;
}

.card5-button{
    display: flex;
    margin-top: 2vh;
    justify-content: center;
    align-items: center;
}

.button-text{
    font-size: 14px;
    font-weight: 500;
}
</style>
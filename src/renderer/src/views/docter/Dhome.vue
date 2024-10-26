<template>
    <div id="Dhome" element-loading-text="玩命加载中..."  spinner   v-loading="selectLoading">
        <el-card class="dhome-card1">
            <template #header>
                <p>综合</p>
            </template>
            <el-row>
                <el-col  :span="6">
                    <el-statistic title="累计上线次数" :value="Number(dtime)"></el-statistic>
                </el-col> 
                <el-col  :span="6">
                    <el-statistic title="累计分析次数" :value='Number(emotime)'></el-statistic>
                </el-col>
                <el-col  :span="6">
                    <el-statistic title="您绑定的患者" :value='Number(tiednumber)'>
                    </el-statistic>
                </el-col>
                <el-col  :span="6">
                    <el-statistic 
                    title="当前时间" 
                    :value="nowtime" 
                    :formatter="timeFormatter" 
                    />
                </el-col>
            </el-row>
        </el-card>

        <el-card class="dhome-card2">
            <template #header>
                <p class="demo-uploadtitle">EEG文件上传 情绪分析</p>
            </template>
            <div class="dupload-div">
                <el-upload
                action="https://api-test.eeg4asd.astralbridge.space/task"  
                :http-request="uploadFile"
                ref="upload"
                :limit="fileLimit"
                :on-remove="handleRemove"
                :file-list="fileList"
                :on-exceed="handleExceed"
                :before-upload="beforeUpload"
                :show-file-list="false"
                :headers="headers"
                >
                <div class="dupload-div-container">
                    <div class="dupload-div-select">
                        <p class="dupload-mtitle">选择患者</p>
                        <el-select  v-model="selectedPatient"  placeholder="请选择情绪分析的患者"  style="width: 220px; margin-bottom: 2vh; ">
                            <el-option v-for="item in patientdata" :key="item._id" :label="item.username" :value="item._id"></el-option>
                        </el-select>
                    </div>
                    <el-button class="dupload-btn" type="primary">
                        <el-icon><UploadFilled /></el-icon>上传附件
                    </el-button> 
                </div>
                <template #tip>
                    <div class="dupload-p">支持扩展名：.mat</div>
                </template>
                </el-upload>
                </div>
               
        </el-card>
        <el-card class="dhome-card3"  v-loading="loading" element-loading-text="玩命加载中..."  spinner >
                <el-link type="primary" @click="regetpatientdata" style="margin-left: 5vw;" :underline="false"><el-icon><RefreshRight /></el-icon></el-link>
                <div>
                    <el-table :data="tableData" class="dtabledata">
                        <el-table-column type="index" label="序号" width="80" />
                        <el-table-column prop="id" label="任务序列号" width="220" />
                        <el-table-column prop="date" label="时间" width="200" />
                        <el-table-column prop="name" label="姓名" width="120" />
                        <el-table-column prop="state" label="状态" width="100" />
                        <el-table-column fixed="right" label="操作" width="120">
                            <template #default="scope">
                                <el-button :type="scope.row.state === '已完成' ? 'primary' : 'danger'" @click="handleClick(scope.row)" :disabled="scope.row.state !== '已完成'" size="small">
                                    {{ scope.row.state === '已完成' ? '查看' : '等待中' }}
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
        </el-card>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import moment from 'moment';
import { ElLoading } from 'element-plus';


export default {
    name: 'Dhome',
    data() {
        return {
            dtime: localStorage.getItem('dtime'),
            emotime: '',
            token: null,
            //上传后的文件列表
            fileList: [],
            // 允许的文件类型
            fileType: [ "mat"],
            // 运行上传文件大小，单位 M
            fileSize: 5000,
            // 附件数量限制
            fileLimit: 5,
            //请求头
            headers: { },
            //患者数据
            patientdata: [],
            //选中的患者
            selectedPatient: '',
            tiednumber: '',
            tableData: [],
            token: localStorage.getItem('token'),
            loading: true,
            selectLoading : false,
        }
    },
    mounted() {
      localStorage.setItem('pape', 'inhome');
      if(localStorage.getItem('dtime') == null){
            localStorage.setItem('dtime', 0);
        }
        if(localStorage.getItem('emotime') == null){
            localStorage.setItem('emotime', 0);
        }
        this.fetchPatientData();
        this.fetchtotalData();

    },
    created() {
        this.headers = {
            'Authorization': 'Bearer '+ this.token
        };
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
        dback() {
            window.ipcRenderer.send('logintomain', false);
            this.$router.push('/login')
        },
        regetpatientdata() {
            this.loading = true;
            this.fetchtotalData();
        },
        handleClick(row) {
            if (row.state === '已完成') {
                localStorage.setItem('tasksid', row.id);
                this.$router.push('/doctor/democlassify');
            }
        },
        fetchPatientData() {
            // 获取患者数据
            axios.get('https://api-test.eeg4asd.astralbridge.space/user/children', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }})
                .then(response => {
                    if (response.data.code === 0) {
                        this.tiednumber = response.data.data.length;
                        for(let i = 0; i < response.data.data.length; i++){
                            this.patientdata[i] = {
                                _id: response.data.data[i]._id,
                                username: response.data.data[i].legalName,
                            };
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.msg
                        });
                    }
                })
    },
    async fetchtotalData() {
      try {
        const response = await axios.get('https://api-test.eeg4asd.astralbridge.space/tasks', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        const data = response.data.data;
        let totaldata = [];
        this.emotime = data.length;
        for (let i = data.length -1 ; i >= 0 ; i--) {
          let dates = data[i].updatedAt;
          // 使用 moment.js 格式化日期
          let formattedDate = moment(dates).format('YYYY-MM-DD HH:mm:ss');
          let formattedname = await this.getname(data[i].patientID); // 等待 getname 方法的结果
          if (data[i].state === 'done') {
            data[i].state = '已完成';
          } else {
            data[i].state = '等待中';
          }
            totaldata.push({
                id: data[i]._id,
                date: formattedDate,
                name: formattedname,
                state: data[i].state
            });
        }
        this.loading = false;
        this.tableData = totaldata;
      } catch (error) {
        console.error('Error fetching total data:', error);
      }
    },   
    async getname(uid) {
      try {
        const response = await axios.get(`https://api-test.eeg4asd.astralbridge.space/user/${uid}`,{
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        if (response.data && response.data.data) {
          return response.data.data.legalName;
        } else {
          return 'Unknown';
        }
      } catch (error) {
        return 'Unknown';
      }
    },
    beforeUpload(file){
	if (file.type != "" || file.type != null || file.type != undefined){
	    //截取文件的后缀，判断文件类型
		const FileExt = file.name.replace(/.+\./, "").toLowerCase();
		//计算文件的大小
		const isLt5M = file.size / 1024 / 1024 < 500; //这里做文件大小限制
		//如果大于50M
		if (!isLt5M) {
			this.$showMessage('上传文件大小不能超过 500MB!');
			return false;
		}
		//如果文件类型不在允许上传的范围内
		if(this.fileType.includes(FileExt)){
			return true;
		}
		else {
			this.$message.error("上传文件格式不正确!");
			return false;
		}
	}
},
    handleRemove(){
    },
    //这是我自定义的移除事件
    handleClose(i){
        this.fileList.splice(i,1);//删除上传的文件
	    if(this.fileList.length == 0){//如果删完了
            this.fileflag = true;//显示url必填的标识
            this.$set(this.rules.url,0,{ required: true, validator: this.validatorUrl, trigger: 'blur' })//然后动态的添加本地方法的校验规则
            }
        },
        //超出文件个数的回调
        handleExceed(){
            this.$message({
                type:'warning',
                message:'超出最大上传文件数量的限制！'
            });return
        },
        //上传文件的事件
        uploadFile(item){
            if(this.selectedPatient == ''){
            this.$message.error("请选择患者!");
            return false;
        }
            this.selectLoading = true;
            this.$message({
                type:'info',
                message:'文件上传中...',
            });
	        //上传文件的需要formdata类型;所以要转
            let FormDatas = new FormData()
            FormDatas.append('eegFile',item.file);
            FormDatas.append('patientID',this.selectedPatient);
            axios({
                method: 'post',
                url: 'https://api-test.eeg4asd.astralbridge.space/task',
                headers: this.headers,
                timeout: 300000,
                data: FormDatas
            }).then(res=>{
                if(res.data.id != '' || res.data.id != null){
                    this.fileList.push(item.file);//成功过后手动将文件添加到展示列表里
                    localStorage.setItem('tasksid', res.data.data.id);
                    this.handleSuccess(res.data.data.id);
			    }
            }).catch(err => {
                console.error('文件上传失败:', err);
                    this.handleUploadError(null, item.file, this.fileList);
            });
        },
        //上传成功后的回调
        handleSuccess(taskid){
            axios.get('https://api-test.eeg4asd.astralbridge.space/task', {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    },
                    params: {
                        id: taskid,
                        eegFilePath : 0,
                        state : 1,
                        result : 1,
                        patientID : "1",
                    }
                })
                .then(response => {
                if (response.data.code === 0) {
                    if(response.data.data.state === 'done'){
                        this.$message({
                            type: 'success',
                            message: '文件上传成功！'
                        });
                        this.selectLoading = false;
                        this.$router.push('/doctor/democlassify');
                    }
                    else{
                        setTimeout(() => {
                        this.handleSuccess(taskid);
                    }, 3000);
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: response.data.msg
                    });
                    this.selectLoading = false;
                    return;
                }
            })
        },
        //上传失败后的回调
        handleUploadError(err, file, fileList){
            this.selectLoading = false;
            this.$message({
                type:'error',
                message:'文件上传失败！'
            });
        },

    }
}
</script>

<style>
#Dhome {
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

.dhome-card1{
    margin: 20px;
    width: 80vw;
    height: auto;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #ffffff;
}

.dhome-card1 p{
    font-size: 20px;
    font-weight: 600;
    margin-top: 2px;
}

.dhome-card2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px;
    margin-top: 2vh;
    width: 80vw;
    height: auto;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: no-drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #ffffff;
}



.dhome-card2 .demo-uploadtitle{
    font-size: 20px;
    font-weight: 600;
    margin-top: 1px;
}

.dhome-card2 .dupload-p{
    font-size: 12px;
    margin-top: 2px;
    color: #909399;
    margin-left: 5vw;
}

.dhome-card2 .dupload-mtitle{
    font-size: 12px;
    margin-top: 1px;
    color: #909399;
    -webkit-app-region: drag;  
}

.dupload-div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
}

.dupload-div-select{
    display: flex;
    height: auto;
    width: 100%;
    flex-direction: column;
    margin-top: 2vh;
}

.dhome-card3{
    margin: 20px;
    width: 80vw;
    height: 30vh;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: no-drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #ffffff;
}

.dhome-card3 p{
    font-size: 20px;
    font-weight: 600;
    margin-top: 2px;
}

.dupload-div-container{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
}

.dtabledata{
    margin-left: 5vw;
    height:25vh;
    width: 100%;
    overflow-y: auto; /* 允许垂直滚动 */
}

</style>
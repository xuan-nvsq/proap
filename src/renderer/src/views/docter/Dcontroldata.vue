<template>
    <div id="Dcontroldata">
        <el-card class="dcontroldata-card1" lement-loading-text="玩命加载中..."  spinner   v-loading="selectLoading">
            <template #header>
                <p>绑定患者列表</p>
            </template>
            <el-row>
                <el-table :data="patientdata"  height="250">
                    <el-table-column prop="username" label="患者真实姓名" width="180" />
                    <el-table-column prop="_id" label="患者ID号" width="180" />
                    <el-table-column prop="phonenumber" label="电话号码" width="180" />
                    <el-table-column prop="patientstate" label="患者当前状态" width="180" />     
                </el-table>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Dcontroldata',
    data() {
        return {
            patientdata: [],
            token: localStorage.getItem('token'),
            selectLoading: true,
        }
    },
    created() {
        this.getPatientData();
    },
    methods: {
        getPatientData() {
            // 获取患者数据
            axios.get('https://api-test.eeg4asd.astralbridge.space/user/children', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }})
                .then(response => {
                    const datas = [];
                    if (response.data.code === 0) {
                        for(let i = 0; i < response.data.data.length; i++) {
                            datas[i]={
                                _id: response.data.data[i].username,
                                username: response.data.data[i].legalName,
                                phonenumber: response.data.data[i].phoneNumber,
                                patientstate: '正常'
                            }
                        }
                        this.patientdata = datas;
                        this.selectLoading = false;
                    } else {
                        this.$message({
                            type: 'error',
                            message: response.data.msg
                        });
                    }
                })
                .catch(error => {
                    console.error('获取患者数据失败:', error);
                    this.$message({
                        type: 'error',
                        message: '获取患者数据失败'
                    });
                })
        }
    }
}
</script>

<style>
#Dcontroldata {
    height: 92vh;
    width: 100vw;
    background-color: #ffffff;
    border-radius: 3px; /* 设置圆角 */
    -webkit-app-region: drag;   
}

.dcontroldata-card1{
    margin: 20px;
    width: 80vw;
    height: 37vh;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #ffffff;
}

.dcontroldata-card1 p{
    font-size: 20px;
    font-weight: 600;
    margin-top: 2px;
}

.dcontroldata-card2{
    margin: 20px;
    width: 80vw;
    height: 45vh;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #ffffff;
}

.dcontroldata-card2 p{
    font-size: 20px;
    font-weight: 600;
    margin-top: 2px;
}
</style>
<template>
    <div id="Userverification">
        <div id="lamb">
            <Versions></Versions>
        </div>
        <div class="userverification-content">
           <el-card class="userverification-card">
            <template #header>
                <h2 style="margin-left: 5vw;">用户端</h2>
            </template>
                <div class="userverification-form">
                    <el-form ref="form" :model="verifyform" label-width="80px">
                        <el-form-item label="邀请码">
                            <el-input v-model="verifyform.setcode" placeholder="请输入邀请码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="vercation" class="vercation-btn" size="large">确认</el-button>
                        </el-form-item>
                    </el-form>
                    <el-link class="ano-drag" @click="() => {this.$router.push('/login')}" type="primary" :underline="false" >返回登录页面</el-link>
                </div>
           </el-card>
        </div>
    </div>
</template>

<script>
import Versions from '../components/Versions.vue';
import axios from 'axios';
export default {
    name: 'Userverification',
    data() {
        return {
            verifyform :{
                setcode: '',
            },
            Header : {
                Authorization : 'Bearer ' + localStorage.getItem('token')
            },
            }
        },
    components: {
        Versions,
    },
    methods: {
        vercation() {
            if(this.verifyform.setcode === ''){
                this.$message({
                    message: '邀请码不能为空',
                    type: 'error'
                });
                return;
            }
            const data = {
                parentId : this.verifyform.setcode
            };
            axios.post('https://api-test.eeg4asd.astralbridge.space/user/parent', data, {
                headers: this.Header
            }).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '验证成功',
                        type: 'success'
                    });
                    window.ipcRenderer.send('logintomain',true);
                    this.$router.push('/user');
                }
                else {
                    this.$message({
                        message: '邀请码错误',
                        type: 'error'
                    });
                }
            }).catch(err => {
                console.log(err);
                this.$message({
                    message: '网络错误',
                    type: 'error'
                });
            });
        },
    },
}
</script>

<style>
body {
      margin: 0;
      padding: 0;  
      overflow: hidden;
}

a{
    font-size: 12px;
    color: #666;
    text-decoration: none;
}

a:hover{
    color: #79bbff;
}

.ano-drag{
    margin-left: 2vw;
}

#Userverification {
    width: 100vw;
    height: 100vh;
    background-image:url(../assets/loginshow.jpg); ;
    background-size: cover;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
}

.userverification-card{
    margin-left: 10vw;
    margin-top: 10vh;
    width: 80vw;
    height: 70vh;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
    opacity: 0.7;
    background: #ffffff;
}


.userverification-card .userverification-form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
    width: 70vw;
    -webkit-app-region: no-drag;
}

.userverification-card .vercation-btn{
    -webkit-app-region: no-drag;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 3vw;
}
</style>
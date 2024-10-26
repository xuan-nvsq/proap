<template>
    <div id="login">
        <div class="left">
        </div>
        <div class="right">
            <Versions></Versions>
            <div class="header">
                <p class="title">登录</p>
                <p class="subtitle">欢迎来到星界桥梁</p>
            </div>
            <div class="content">
                <el-form :model="form" :rules="rules" ref="loginForm" label-position="top" :show-message="false">
                    <el-form-item label="用户名" prop="username" class="myitem">
                        <el-input v-model="form.username" placeholder="请输入用户名" :class="['no-drag', 'myput']" ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" class="myitem">
                        <el-input v-model="form.password" placeholder="请输入密码" show-password :class="['no-drag', 'myput']" ></el-input>
                    </el-form-item>
                    <div class="bottom">
                        <el-button type="primary"  @click="login" class="no-drag">登录</el-button>
                        <el-button @click="register"  class="no-drag">注册</el-button>
                    </div>
                    <el-link class="no-drag" @click="() => {this.$router.push('/forget')}" type="primary" :underline="false" >忘记密码？</el-link>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Versions from '../components/Versions.vue';

export default {
  name: 'Login',
  components: {
        Versions,
  },
  mounted() {
      localStorage.setItem('pape', 'inlogin');
      localStorage.setItem('username', '');
      localStorage.setItem('password', '');
  },
  data() {
    return {
        form: {
        username: '',
        password: '',
      },
        rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ]
        },
    }
  },
  methods: {
    async login() {
        const data = {
            username: this.form.username,
            pwd: this.form.password
        };
        try {
            if (this.form.username === ''|| this.form.password === '') {
                this.$message({
                    message: '用户名或密码不能为空',
                    type: 'error'
                });
                return;
            }
            const res = await axios.post('https://api-test.eeg4asd.astralbridge.space/auth/login', data);
            if (res.data.code === 0) {
                localStorage.setItem('token', res.data.data.token);
                const svalue = await this.test(res.data.data.token); 
                if (svalue === 0) {
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    this.$router.push('select');
                } else if(svalue === 'b'){
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    window.ipcRenderer.send('logintomain', true);
                    this.$router.push('/doctor');
                }
                else if(svalue === 'c'){
                    const state = await this.retest(res.data.data.token);
                    this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                    if(state === 1){
                        window.ipcRenderer.send('logintomain', true);
                        this.$router.push('/user');
                    }
                    else{
                        window.ipcRenderer.send('logintomain', false);
                        this.$router.push('/userverification');
                    }
                }
                else {
                    this.$message({
                        message: '用户类型错误',
                        type: 'error'
                    });
                }
            } else {
                this.$message({
                    message: '用户名或密码错误',
                    type: 'error'
                });
            }
        } catch (err) {
            this.$message({
                message: '网络错误',
                type: 'error'
            });
        }
    },
    async test(token) {
        try {
            const res = await axios.get('https://api-test.eeg4asd.astralbridge.space/user', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (res.data.code === 0) {
                if(res.data.data.role === null){
                    return 0;
                }
                else{
                    return res.data.data.role;
                }
            } else {
                return -1;
            }
        } catch (err) {
            return -1;
        }
    },
    async retest(token) {
        try {
            const res = await axios.get('https://api-test.eeg4asd.astralbridge.space/user', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (res.data.code === 0) {
                if(res.data.data.parentId === null){
                    return 0;
                }
                else{
                    return 1;
                }
            } else {
                return -1;
            }
        } catch (err) {
            return -1;
        }
    },
    register() {
        this.$router.push('/register')
    },
    
  }
}
</script>

<style>
body {
      margin: 0;
      padding: 0;  
      overflow: hidden;
}

p{
    font-size: 14px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    
}

a{
    font-size: 12px;
    color: #666;
    text-decoration: none;
    margin-left: 5px;
}

a:hover{
    color: #79bbff;
}

#login {
    display: flex;
    height: 100vh;
    width: 100vw;
    background: rgba(255, 255, 255); /* 设置背景透明度 */
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
}

.left {
    display: flex;
    float: left;
    width: 45vw;
    height: 100vh;
    background: url(../assets/loginshow.jpg) no-repeat;
    background-size: cover;
    -webkit-app-region: drag;
}

.right {
    width: 55vw;
    height: 100vh;
    background: #fff;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    -webkit-app-region: drag;
}

.right .header {
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.title {
    font-size: 30px;
    font-weight: 600;
    color: #333;
    margin:50px 0 5px 0;
    padding: 0;
}

.subtitle {
    font-size: 15px;
    color: #666;
    margin:0 0 15px 0;
    padding: 0;
}

.no-drag {
    -webkit-app-region: no-drag; /* 设置特定元素不可拖拽 */
}

.right .content {
    margin: 0 120px;
}



.bottom {
    display: flex;
    margin-top: 10px;
    padding: auto;
}

.myput {
    margin: 0 0 5px 0;
}
</style>
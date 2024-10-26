<template>
    <div id="register">
        <div class="left">
        </div>
        <div class="right">
            <Versions></Versions>
            <div class="header">
                <p class="title">注册</p>
                <p class="subtitle">欢迎来到星界桥梁</p>
            </div>
            <div class="content">
                <el-form :model="form" :rules="rules" ref="registerForm" label-position="top" :show-message="false" >
                    <el-form-item label="真实姓名" prop="legalName" class="myitem">
                        <el-input v-model="form.legalName" placeholder="请输入您的真实姓名" :class="['no-drag', 'myput']" ></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="phoneNumber" class="myitem">
                        <el-input v-model="form.phoneNumber" placeholder="请输入您的电话号码" :class="['no-drag', 'myput']" ></el-input>
                    </el-form-item>
                <div class="bottom">
                    <el-button type="primary"  @click="register" class="no-drag">注册</el-button>
                </div>
                 <el-link class="no-drag" @click="() => {this.$router.push('/register')}" type="primary" :underline="false" >返回上一页</el-link>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import Versions from '../components/Versions.vue';
import axios from 'axios';

export default {
  name: 'Register',
  components: {
    Versions,
  },
  data() {
    return {
        form: {
        legalName: '',
        phoneNumber: '',
      },
    }
  },
  methods: {
      register() {
       if(this.form.legalName=== '' || this.form.phoneNumber=== '') {
           this.$message.error('请填写完整信息');
           return;
       }
       else{
        if (this.form.phoneNumber.length !== 11 || !this.isAllDigits(this.form.phoneNumber)) {
          this.$message.error('请输入11位手机号码');
          this.form.phoneNumber = '';
          return;
        }
        const data ={
            username : localStorage.getItem('username'),
            pwd : localStorage.getItem('password'),
            legalName : this.form.legalName,
            phoneNumber : this.form.phoneNumber
        }
        axios.post('https://api-test.eeg4asd.astralbridge.space/auth/signup',data
        ).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '注册成功',
                        type: 'success'
                    });
                    this.$router.push('/login');
                }
                else {
                    this.$message({
                        message: '注册失败',
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
       }   

    },
    isAllDigits(str) {
      return /^\d+$/.test(str);
    }
  }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;  
    overflow: hidden;
}

#register {
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
    width: 45%;
    height: 100%;
    background: url(../assets/loginshow.jpg) no-repeat;
    background-size: cover;
    -webkit-app-region: drag;
}

.right {
  width: 55%;
    height: 100%;
    background: #fff;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    -webkit-app-region: drag;
}

.right .header {
  /* display: flex; */
  align-items: center;
  justify-content: center;
  text-align: center;
}

.title {
    font-size: 30px;
    font-weight: 600;
    color: #333;
    margin:20px 0 5px 0;
    padding: 0;
}

.subtitle {
    font-size: 15px;
    color: #666;
   margin-bottom: 20px;
}

.no-drag {
    -webkit-app-region: no-drag; /* 设置特定元素不可拖拽 */
}

.right .content {
    margin: 0 120px;
}

.myput {
    width: 100%;
    margin: 0 0 0px 0;
}

.myitem{
    margin: 9px 0 0 0 ;
}

.bottom {
    margin-top: 20px;
    padding: auto;
}
</style>
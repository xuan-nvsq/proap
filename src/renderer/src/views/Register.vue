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
                    <el-form-item label="用户名" prop="username" class="myitem">
                        <el-input v-model="form.username" placeholder="请输入用户名" :class="['no-drag', 'myput']"  @blur="validateField('username')"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" class="myitem">
                        <el-input v-model="form.password" placeholder="请输入密码" show-password :class="['no-drag', 'myput']" @blur="validateField('password')"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2" class="myitem">
                        <el-input v-model="form.password2" placeholder="请再次输入密码" show-password :class="['no-drag', 'myput']"  @blur="validateField('password2')"></el-input>
                    </el-form-item>
                <div class="bottom">
                    <el-button type="primary"  @click="nextpage" class="no-drag">下一页</el-button>
                </div>
                 <el-link class="no-drag" @click="() => {this.$router.push('/login')}" type="primary" :underline="false" >已有账号？去登录</el-link>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import Versions from '../components/Versions.vue';

export default {
  name: 'Register',
  components: {
    Versions,
  },
  data() {
    return {
        form: {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
        password2: localStorage.getItem('password'),
      },
        rules: {
            username: [
                { min: 1, max: 10, message: '用户名长度在 1 到 10 个字符', trigger: 'blur' },
                { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password: [
                { min: 6, message: '密码长度至少为 6 个字符', trigger: 'blur' },
                { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            password2: [
                { required: true, message: '请再次输入密码', trigger: 'blur' }
            ]
        },
    }
  },
  methods: {
    validateField(field) {
      this.$refs.registerForm.validateField(field, (errorMessage) => {
        if (!errorMessage) {
          this.$message.error(this.rules[field][0].message);
          this.form[field] = '';
        }
      });
    },
    nextpage() {
          if (this.form.password !== this.form.password2) {
              this.$message.error('两次输入的密码不一致')
              this.form.password2 = '';
              return;
          }
          else{
                if (this.form.username === '' || this.form.password === '') {
                    this.$message.error('用户名或密码不能为空');
                    return;
                }
                localStorage.setItem('username', this.form.username);
                localStorage.setItem('password', this.form.password);
                this.$router.push('/reregister');
          }
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
    margin: 0 17vw;
}

.myput {
    width: 100%;
}

.myitem{
    margin: 9px 0 0 0 ;
}

.bottom {
    margin-top: 20px;
    padding: auto;
}
</style>
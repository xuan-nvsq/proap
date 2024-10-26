<template>
    <div id="Umanage">
        <el-card class="Umanage-card">
            <div class="Umanage-desc">
            <el-descriptions title="个人信息" size="large" :column="2" >
              <el-descriptions-item label="真实姓名" >{{ulegalName}}</el-descriptions-item>
              <el-descriptions-item label="用户id号" >{{uusername}}</el-descriptions-item>
              <el-descriptions-item label="手机号" >{{ uphone }}</el-descriptions-item>
              <el-descriptions-item label="应用端口" >{{ urole }}</el-descriptions-item>
              <el-descriptions-item label="id号" >{{ uid }}</el-descriptions-item>
              <el-descriptions-item label="当前登录状态">{{state}}</el-descriptions-item> 
              <el-descriptions-item label="过期时间" >{{outtime}}</el-descriptions-item>
            </el-descriptions>
            </div>
            <div class="Umanage-alert">
                <el-alert title="若登录状态过期则需重新登录" type="error" :closable="false" center style="margin-top: 2vh; float: left; max-width: 20vw ;margin-left: 22vw;" />
            </div>
            <div class="Umanage-button">
            <el-button type="primary" @click="showDialog = true" style="margin-top: 1vh; margin-left: 5vw;">修改密码</el-button>
            <el-button type="danger" @click="backtologin" style="margin-top: 1vh; margin-left: 2vw;">退出登录</el-button>
          </div>
        </el-card>

          <el-dialog v-model="showDialog" title="修改密码" width="35%" center :before-close="handleClose" class="Umanage-dialog">
              <el-form :model="form">
                <el-form-item label="旧密码">
                  <el-input v-model="form.oldPassword" type="password" placeholder="请输入旧密码" show-password style="-webkit-app-region: no-drag;"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                  <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码" show-password style="-webkit-app-region: no-drag;"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码">
                  <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入新密码" show-password style="-webkit-app-region: no-drag;"></el-input>
                </el-form-item>
              </el-form>
              <template #footer>
                <el-button @click="quitfrom">取消</el-button>
                <el-button type="primary" @click="submitForm">提交</el-button>
              </template>
            </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default {
    name: 'Umanage',
    data() {
        return {
            token : localStorage.getItem('token'),
            uusername : '',
            urole : '',
            uid : '',
            state : '',
            uphone : '',
            ulegalName : '',
            outtime : '',
            showDialog: false,
            form: {
              oldPassword: '',
              newPassword: '',
              confirmPassword: ''
              
            },
            rules: {
              oldPassword: [
                { required: true, message: '请输入旧密码', trigger: 'blur' }
              ],
              newPassword: [
                { required: true, message: '请输入新密码', trigger: 'blur' }
              ],
              confirmPassword: [
                { required: true, message: '请再次输入新密码', trigger: 'blur' }
              ]
            }
        }
    },
    created() {
    this.fetchUserData();
  },
    methods: {  
        async fetchUserData() {
      if (!this.token) {
        this.$message({
          type: 'error',
          message: '未找到有效的令牌，请重新登录'
        });
        return;
      }

      try {
        const response = await axios.get('https://api-test.eeg4asd.astralbridge.space/user', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        const data = response.data;
        this.uusername = data.data.username;
        this.urole = data.data.role;
        this.uphone = data.data.phoneNumber;
        this.ulegalName = data.data.legalName;
        
        const decoded = jwtDecode(this.token);
        this.uid = decoded.uid;
        
        const exp = decoded.exp;
        const expDate = new Date(exp);
        this.state = expDate > new Date() ? '良好' : '已过期';
        this.outtime = expDate.toLocaleString();
      } catch (error) {
        console.error('获取用户数据失败:', error);
        this.$message({
          type: 'error',
          message: '获取用户数据失败'
        });
      }
    },
    async submitForm() {
      try {
        if(!this.form.oldPassword || !this.form.newPassword || !this.form.confirmPassword){
          this.$message({
            type: 'error',
            message: '请填写完整信息'
          });
          return;
        }
        if(this.form.newPassword !== this.form.confirmPassword){
          this.$message({
            type: 'error',
            message: '两次输入的新密码不一致'
          });
          return;
        }
        const myform ={
          oldPwd : this.form.oldPassword,
          newPwd : this.form.newPassword
        };
        const response = await axios.post('https://api-test.eeg4asd.astralbridge.space/user/changePwd',myform, {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        if(response.data.code === 0){
          this.$message({
            type: 'success',
            message: '修改密码成功'
          });
          this.showDialog = false;
        }
        else{
          this.$message({
            type: 'error',
            message: '原密码填写错误'
          });
        }
      }
        catch (error) {
        console.error('修改密码失败:', error);
        ElMessage.error('修改密码失败');
      }
    },
    backtologin(){
      window.ipcRenderer.send('logintomain', false);
      this.$router.push('/login');
    },
    quitfrom(){
      this.form.oldPassword = '';
      this.form.newPassword = '';
      this.form.confirmPassword = '';
      this.showDialog = false;
    },
    handleClose(done) {
      this.form.oldPassword = '';
      this.form.newPassword = '';
      this.form.confirmPassword = '';
      done();
    }
    },
}
</script>

<style>
#Umanage {
    height: 92vh;
    width: 100vw;
    background-color: #ffffff;
    border-radius: 3px; /* 设置圆角 */
    -webkit-app-region: drag;   
}

.Umanage-card {
  margin: 20px;
  width: 80vw;
  height: auto;
  border-radius: 5px; /* 设置圆角 */
  -webkit-app-region: drag;   
  overflow: hidden;
  opacity: 0.9;
  background: #ffffff;
}

.Umanage-desc{
  width: 100%;
  height: 150px;
  -webkit-app-region: no-drag;  
}

.Umanage-alert{
  margin-top: 5vh;
  width: 100%;
  height: 80px;    
}

.Umanage-dialog{
  width: 400px;
  height: 300px; 
  border-radius:6px;
  -webkit-app-region: no-drag;  
}

.Umanage-button{
  /* position: relative; */
  width: 100%;
  height: 100px;
  -webkit-app-region: no-drag;   
}


</style>
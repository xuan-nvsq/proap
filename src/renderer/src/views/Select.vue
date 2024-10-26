<template>
    <div id="Select">
      <div id="lamb">
        <Versions></Versions>
      </div>
      <div class="shead">
        <p>选择您的用户类型</p>
      </div>
      <div class="scontent">
        <div class="sleft-content" @click="roleb(true)">
        </div>
        <div class="sright-content" @click="roleb(false)">
        </div>
      </div>
      <div class="sbottom">
          <el-button type="primary" @click="tomain" class="no-drag">确认并进入主页面</el-button>
          <el-link class="no-drag" @click="() => {this.$router.push('/login')}" type="primary" :underline="false" >返回登录页面</el-link>
        </div>
      </div>
</template>

<script>
import Versions from '../components/Versions.vue';
import axios from 'axios';

export default {
  name: 'Select',
  components: {
    Versions,
  },
  mounted() {
      localStorage.setItem('pape', 'inlogin');
  },
    data() {
    return {
        type: '',
    }
  },
  methods: {
    tomain() {
      const token = localStorage.getItem('token');
      if(this.type===''){
        this.$message({
          message: '请选择用户类型',
          type: 'error'
        });
        return;
      }
      const data = {
        role: this.type
      };
      axios.post('https://api-test.eeg4asd.astralbridge.space/user/role',data, {
        headers: {
          'Authorization': 'Bearer ' + token // 添加 Authorization 参数
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: '成功绑定用户类型',
            type: 'success'
          });
          if(data.role === 'b'){
            window.ipcRenderer.send('logintomain',true);
            this.$router.push('/doctor');
          }
          else if(data.role === 'c'){
            this.$router.push('/userverification');
            }

        } else {
          console.log(res.data);
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(err => {
        this.$message({
            message: '网络错误',
            type: 'error'
          });
      });
    },
    roleb(n) {
      const Bselectpic = document.querySelector('.sleft-content');
      const Cselectpics = document.querySelector('.sright-content')
      if(n){
        Bselectpic.style.transform = 'scale(1.1)'; 
        Cselectpics.style.transform= 'scale(1)';
        this.type = 'b';
      }
      else{
        Bselectpic.style.transform = 'scale(1)'; 
        Cselectpics.style.transform= 'scale(1.1)';
        this.type = 'c';
      }
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
    font-size: 20px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-weight: bolder;
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

.no-drag{
    -webkit-app-region: no-drag;
}

#Select {
  width: 100vw;
  height: 100vh;
  background-image:url(../assets/loginshow.jpg);
  background-size: cover;
  border-radius: 5px; /* 设置圆角 */
  -webkit-app-region: drag;   
  overflow: hidden;
}

.scontent{
  display: flex;
  flex-direction:row;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100vw;
  margin-top: 10vh;
}

.sleft-content {
  display: flex;
  width: 20vw;
  height: 45vh;
  background-size: cover;
  -webkit-app-region: no-drag;
  margin-right: 100px;
  background-image:url(../assets/selectb.png);
  background-size: center;
  border-radius: 10px; /* 设置圆角 */
  cursor: pointer;
}

.sleft-content:hover{
  transform: scale(1.1);
  transition: all 0.5s;
}

.sright-content {
  width: 20vw;
  height: 45vh;
  -webkit-app-region: drag;
  background-size: cover;
  background-image:url(../assets/selectc.png);
  background-size: center;
  border-radius: 10px; /* 设置圆角 */
  cursor: pointer;
  -webkit-app-region: no-drag;
}

.sright-content:hover{
  transform: scale(1.1);
  transition: all 0.5s;
}

.sbottom{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sbottom .no-drag{
  margin: 0 0 10px 0;
}

.shead{
  display: flex;
  justify-content: center;
  align-items: bottom;
  height: 5vh;
  width: 100vw;
  -webkit-app-region: drag;
}

.shead p{
  margin: 0;
  padding: 0;
  font-size: 22px;
  font-family:  'fangsong';
  font-weight: bolder;
  color: #c22222;
  
}


</style>
<template>
  <div id="home">
    <div>
      <Versions></Versions>
    </div>
    <div class="content">
      <el-button type="primary" @click="back" class="no-drag">返回</el-button>
      <el-button type="primary" @click="logout" class="no-drag">登录页面</el-button>
      <el-button type="primary" @click="select" class="no-drag">选择端口页面</el-button>
      <el-button type="primary" @click="uhome" class="no-drag">用户主页面</el-button>
      <el-button type="primary" @click="dhome" class="no-drag">医生主页面</el-button>
    </div>
  </div>
</template>

<script>
import Versions from '../components/Versions.vue';

export default {
  name: 'Home',
  components: {
    Versions,
  },
  mounted() {
      localStorage.setItem('pape', 'inhome');
  },
  data() {
    return {
      
    }
  },
  methods: {
    logout() {
      window.ipcRenderer.send('logintomain', false);
      this.$router.push('/login');
    },
    select() {
      window.ipcRenderer.send('logintomain', false);
      this.$router.push('/select');
    },
    uhome() {
      this.$router.push('/user');
    },
    dhome() {
      this.$router.push('/doctor');
    },
    back() {
      window.ipcRenderer.send('logintomain', false);
      this.$router.push('/forget');
    }
  }
}
</script>

<style>
#home {
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
}

.content {
    display: flex;
}

.no-drag {
    -webkit-app-region: no-drag; /* 设置特定元素不可拖拽 */
}

</style>
<template>
  <div id="versions">
    <el-link @click="vback" class="vno-drag" :underline="false">
      <el-icon><Minus /></el-icon>
    </el-link>
    <el-link @click="vmax" class="vno-drag" :underline="false" >
      <el-icon><FullScreen /></el-icon>
    </el-link>
    <el-link @click="vclose" class="vno-drag" :underline="false" >
      <el-icon><Close /></el-icon>
    </el-link>
  </div>
</template>

<script>
export default {
  name: 'Versions',
  components: {
    
  },
  data() {
    return {
      
    }
  },
  methods: {
    vback() {
      window.ipcRenderer.send('minimize', true);
    },
    vmax() {
      const pape = localStorage.getItem('pape');
      if (pape === 'inhome') {
        window.ipcRenderer.send('maximize', false);
      } else {
        window.ipcRenderer.send('maximize', true);
      }
    },
    vclose() {
      window.ipcRenderer.send('close');
    },
  }
}
</script>

<style>
#versions {
  display: flex;
  margin: 0;
  justify-content: flex-end;
  padding: 0px 10px 0px 5px;
  z-index: 10; /* 设置层级 */
}

#versions .vno-drag {
  -webkit-app-region: no-drag; /* 设置特定元素不可拖拽 */
  cursor: pointer;
  width: 25px;
  height: 20px;
}
</style>
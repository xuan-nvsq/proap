<template>
    <div id="Dheader">
            <div class="dheader-title">
                <p class="dheader-titlefont">星界 · 桥梁</p>
            </div>
                <div class="vertical-line"></div> 
            <div id="dheader-solt">
                <p class="dheader-soltname">欢迎来到自闭症治疗辅助系统医生端</p>
            </div>
            <div class="endmain">
            <el-link @click="ulogout" :underline="false"><el-icon><SwitchButton /></el-icon></el-link>
            </div>
        <div class="dheader-bank">
            <versions></versions>
        </div>
    </div>
</template>

<script>
import Versions from './Versions.vue';
export default {
    name: 'Dheader',
    data() {
        return {
            
        }
    },
    components: {
        Versions,
    },
    methods: {
        ulogout() {
            window.ipcRenderer.send('logintomain', false);
            this.$router.push('/login');
        }
    }
}
</script>

<style>
#Dheader {
    display: flex;
    height: 8vh;
    width: 100vw;
    border-radius: 3px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #ffffff;
    background: linear-gradient(to bottom, #ffffff 0%, #ffffff 99%, #828282 100%); 
}

.dheader-title {
    display: flex;
    height: 8vh;
    float: left;
    align-items: center;
    justify-content: center;
    margin-left: 3vw;
  
}

.dheader-title .dheader-titlefont {
    font-size: 18px;
    font-weight: bolder;
    font-family: 'zehngkai';
}

.vertical-line {
    display: flex;
    margin: 2.3vh 1.8vw;
    height: 4vh;    
    width: 1px;
    background-color: #9b9b9b; /* 可以根据需要调整颜色 */
}

#dheader-solt {
    display: flex;
    align-items: center; 
    margin: 0.7vh 0 0 0;
}

.endmain{
    display: flex;
    align-items: center;
    margin-top: 0.6vh;
    margin-left: 1vw;
    -webkit-app-region: no-drag;  

}

#dheader-solt .dheader-soltname {
    font-size: 12px;
    font-weight: bold;
    color: #9b9b9b;
}

.dheader-bank {
    display: flex;
    margin-left: auto;
    align-items: center;
}
</style>
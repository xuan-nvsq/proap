<template>
    <div id="forget">
        <div>
            <Versions></Versions>
        </div>
        <div class="fmain">
            <h2>暂时还没有什么你想要的信息哦</h2>
            <el-button type="primary" @click="back" class="no-drag1">返回</el-button>
            <a @click="tohome" class="por">这里是测试端口</a>
        </div>
    </div>
</template>

<script>
import Versions from '../components/Versions.vue';
export default {
    name: 'Forget',
    components: {
        Versions,
    },
    data() {
        return {
            
        }
    },
    methods: {
        back() {
            this.$router.push('/login');
        },
        tohome() {
            window.ipcRenderer.send('logintomain', true);
            this.$router.push('/home');
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

a{
    text-decoration: none;
    color: #666;
    font-size: 14px;
}

a:hover{
    color: #79bbff;
}

#forget {
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: drag;
    overflow: hidden;
}

#forget .fmain{
    width: 100vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.no-drag1 {
    -webkit-app-region: no-drag; /* 设置特定元素不可拖拽 */
    margin-top: 20px;
}

.por {
    -webkit-app-region: no-drag; /* 设置特定元素不可拖拽 */
    cursor: pointer;
    margin-top: 10px;
}
</style>
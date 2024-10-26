<template>
    <div id="Uleftbar">
        <div class="uleftbarmate">
            <el-menu
            mode="vertical"
            :default-active="activePath"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            :router="true"
            >
            <el-menu-item index="/user/uhome" >
                <el-icon><House /></el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/user/udialogue">
                <el-icon><ChatDotRound /></el-icon>
                <span>大模型对话</span>
            </el-menu-item>
            <el-menu-item index="/user/ulibrary">
                <el-icon><document /></el-icon>
                <span>知识库</span>
            </el-menu-item>
            <el-menu-item index="/user/umanage">
                <el-icon><setting /></el-icon>
                <span>个人信息管理</span>
            </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ChatDotRound, Collection, Setting } from '@element-plus/icons-vue';

export default {
    name: 'Uleftbar',
    data() {
        return {
        }
    },
    created() {
    this.$router.push('/user/uhome');
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const activePath = ref(route.path);

    const handleSelect = (index) => {
      router.push(index);
      activePath.value = index;
    };

    onMounted(() => {
      activePath.value = route.path;
    });

    watch(route, (newRoute) => {
      activePath.value = newRoute.path;
    });

    return {
      activePath,
      handleSelect,
      ChatDotRound,
      Collection,
      Setting
    };
  },
    methods: {
        logout() {
            window.ipcRenderer.send('logintomain', false);
            this.$router.push('/login');
        }
    }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}

body{
    display: flex;
    justify-content: center;
    align-items: center;
}

span{
    font-size: 0.85em;
}

.el-menu-item.is-active {
  background-color: #409eff;
  color: white;
  border-radius: 8px;
}


#Uleftbar {
    display: flex;
    float: left;
    height: 92vh;
    width: 15vw;
    background-color: #ffffff;
    opacity: 0.95;
    -webkit-app-region: drag;   
    overflow: hidden;
}

#Uleftbar .uleftbarmate{
    width: 100%;
    -webkit-app-region: no-drag;   
}

#Uleftbar .uleftbarmate .el-menu{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    opacity: 0.95;
    -webkit-app-region: no-drag;   
}
</style>
<template>
    <div id="Dleftbar">
        <div class="dleftbarmate">
            <el-menu
            mode="vertical"
            :default-active="activePath"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            :router="true"
            >
            <el-menu-item index="/doctor/dhome" >
                <el-icon><House /></el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/doctor/democlassify">
                <el-icon><Orange /></el-icon>
                <span>情绪分析</span>
            </el-menu-item>
            <el-menu-item index="/doctor/dcontroldata">
                <el-icon><DocumentRemove /></el-icon>
                <span>数据管理</span>
            </el-menu-item>
            <el-menu-item index="/doctor/dmanage">
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
    name: 'Dleftbar',
    data() {
        return {
            
        }
    },
    created() {
    this.$router.push('/doctor/dhome');
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
    flex-direction: column;
    background-color: #f0f0f0;
    height: 100vh;
    width: 100vw;
}

span{
    font-size: 0.85em;
}

.el-menu-item.is-active {
  background-color: #409eff;
  border-radius: 8px;
  color: white;
}


#Dleftbar {
    display: flex;
    flex-direction: column;
    height: 92vh;
    width: 15vw;
    border-radius: 3px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #ffffff;
    background: linear-gradient(to bottom, #ffffff 0%, #ffffff 99%, #828282 100%); 
}


#Dleftbar .dleftbarmate{
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
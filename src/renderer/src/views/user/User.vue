<template>
    <div id="User">
        <div id="userheader">
            <Uheader></Uheader>
        </div>
        <div id="user-container">
            <div id="userleftbar">
                <Uleftbar></Uleftbar>
            </div>
            <div id="usercontent">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import Uheader from '../../components/Uheader.vue';
import Uleftbar from '../../components/Uleftbar.vue';
export default {
    name: 'User',
    data() {
        return {
            
        }
    },
    mounted() {
    localStorage.setItem('pape', 'inhome');
    if (localStorage.getItem('utime') == null) {
        localStorage.setItem('utime', '1');
    } else {
        let utime = localStorage.getItem('utime');
        utime = parseInt(utime) + 1;
        utime = utime.toString();
        localStorage.setItem('utime', utime);
    }
},
    components: {
        Uheader,
        Uleftbar,
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

#User {
    height: 100vh;
    width: 100vw;
    background-color: #ffffff;
    border-radius: 3px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
}

#userheader{
    height: 8vh;
    width: 100vw;
    border-radius: 3px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
    box-shadow: 0 20px 100px rgba(110, 110, 110, 0.3);
    opacity: 0.9;
    background: linear-gradient(to bottom, #ffffff 0%, #ffffff 99%, #585858 100%); 
}

#user-container {
    display: flex;
    /* 确保子元素并排显示 */
}

#userleftbar {
    float: left;
    height: 92vh;
    width: 15vw;
    background-color: #ffffff;
    opacity: 0.95;
    -webkit-app-region: no-drag;   
    overflow: hidden;
}

#usercontent{
    float: right;
    height: 92vh;
    width: 85vw;
    background-color: #ffffff;
    -webkit-app-region: drag;   
    overflow: hidden;
    flex: 1;
}


</style>
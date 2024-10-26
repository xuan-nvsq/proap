<template>
    <div id="Doctor">
        <div id="doctorheader">
            <Dheader></Dheader>
        </div>
        <div id="doctor-container">
            <div id="doctorleftbar">
                <Dleftbar></Dleftbar>
            </div>
            <div id="doctorcontent">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import Dheader from '../../components/Dheader.vue';
import Dleftbar from '../../components/Dleftbar.vue';
export default {
    name: 'Doctor',
    data() {
        return {
            
        }
    },
    mounted() {
      localStorage.setItem('pape', 'inhome');
      if (localStorage.getItem('dtime') == null) {
        localStorage.setItem('dtime', '1');
    } else {
        let dtime = localStorage.getItem('dtime');
        dtime = parseInt(dtime) + 1;
        dtime = dtime.toString();
        localStorage.setItem('dtime', dtime);
    }
    },
    components: {
        Dheader,
        Dleftbar,
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

#Doctor {
    height: 100vh;
    width: 100vw;
    background-color: #ffffff;
    border-radius: 3px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
}

#doctorheader{
    height: 8vh;
    width: 100vw;
    border-radius: 3px; /* 设置圆角 */
    -webkit-app-region: drag;   
}

#doctor-container{
    display: flex;
    height: 92vh;
    width: 100vw;
    -webkit-app-region: drag;   
}

#doctorleftbar{
    height: 92vh;
    width: 15vw;
    background-color: #ffffff;
    opacity: 0.95;
    -webkit-app-region: drag;   
    overflow: hidden;
}

#doctorcontent{
    height: 92vh;
    width: 85vw;
    background-color: #ffffff;
    opacity: 0.95;
    -webkit-app-region: drag;   
    overflow: hidden;
}
</style>
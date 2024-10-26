<template>
    <div id="Ulibrary">
        <el-card class="ulibrary-card1">
            <template #header>
                <p class="ulibrary-card-title">推荐书目</p>
            </template>
            <div class="ulibrary-card-content">
                <el-row>
                    <el-col :span="6">
                        <a href="https://www.qidian.com/book/1023615041/" target="_blank"><img src="../../assets/upicture/ADS1.webp" class="ulibrary-card-content-card-img"></a>
                        <div class="ulibrary-card-content-card-title">追寻自闭症的真相</div>
                    </el-col>
                    <el-col :span="6">
                        <a href="https://www.qidian.com/book/1015131297/" target="_blank"><img src="../../assets/upicture/ADS2.webp" class="ulibrary-card-content-card-img"></a>
                        <div class="ulibrary-card-content-card-title">不同的音调：自闭症的故事</div>
                    </el-col>
                    <el-col :span="6">
                        <a href="https://www.qidian.com/book/1038302403/" target="_blank"><img src="../../assets/upicture/ADS3.jpg" class="ulibrary-card-content-card-img"></a>
                        <div class="ulibrary-card-content-card-title">自闭症终结者</div>
                    </el-col>
                    <el-col :span="6">
                        <a href="https://www.qidian.com/book/1023538738/" target="_blank"><img src="../../assets/upicture/ADS4.webp" class="ulibrary-card-content-card-img"></a>
                        <div class="ulibrary-card-content-card-title">是自闭症还是误诊</div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <el-card class="ulibrary-card2">
            <template #header>
                <p class="ulibrary-card-title">相关资讯</p>
            </template>
            <div class="ulibrary-card-content">
                <div class="ulibrary-left-content">
                    <div class="ulibrary-left-maincontent">
                        <img src="../../assets/upicture/dote.png">
                        <span><a href="http://health.people.com.cn/n1/2023/0914/c14739-40077438.html" target="_blank">人脑类器官准确模拟自闭症</a></span>
                    </div>
                    <div class="ulibrary-left-maincontent">
                        <img src="../../assets/upicture/dote.png">
                        <span><a href="http://cq.people.com.cn/n2/2024/0207/c367640-40742088.html" target="_blank">自闭症的居家康复训练方法</a></span>
                    </div>
                    <div class="ulibrary-left-maincontent">
                        <img src="../../assets/upicture/dote.png">
                        <span><a href="http://cq.people.com.cn/n2/2023/1213/c365414-40676448.html" target="_blank">儿童幼时丨自闭症有哪些表现？</a></span>
                    </div>
                    <div class="ulibrary-left-maincontent">
                        <img src="../../assets/upicture/dote.png">
                        <span><a href="http://sc.people.com.cn/n2/2024/0401/c345167-40796182.html" target="_blank">世界自闭症日丨如何判断自闭症？</a></span>
                    </div>
                    <div class="ulibrary-left-maincontent">
                        <img src="../../assets/upicture/dote.png">
                        <span><a href="http://health.people.com.cn/n1/2024/0725/c14739-40285221.html" target="_blank">产前健康饮食或降低儿童自闭症风险</a></span>
                    </div>
                </div>
                <div class="ulibrary-right-content">
                    <div class="ulibrary-right-maincontent">
                        <img src="../../assets/upicture/dote.png">
                        <span><a href="http://sc.people.com.cn/n2/2022/0402/c345459-35205072.html" target="_blank">如何拥抱来自“星星的孩子”</a></span>
                    </div>
                    <div class="ulibrary-right-maincontent">
                        <img src="../../assets/upicture/dote.png">
                        <span><a href="http://health.people.com.cn/n1/2022/1101/c14739-32556319.html" target="_blank">让自闭症儿童更好地随班就读</a></span>
                    </div>
                    <div class="ulibrary-right-maincontent">
                        <img src="../../assets/upicture/dote.png">
                        <span><a href="http://cq.people.com.cn/n2/2023/0412/c365414-40373627.html" target="_blank">如何识别自闭症早期的行为异常</a></span>
                    </div>
                    <div class="ulibrary-right-maincontent">
                        <img src="../../assets/upicture/dote.png">
                        <span><a href="http://cq.people.com.cn/n2/2022/1025/c367640-40169261.html" target="_blank">自闭症儿童干预需要注意哪些问题</a></span>
                    </div>
                    <div class="ulibrary-right-maincontent">
                        <img src="../../assets/upicture/dote.png">
                        <span><a href="http://cq.people.com.cn/n2/2022/0406/c365414-35210193.html" target="_blank">用一颗“平常心”为自闭症儿童打开一扇窗</a></span>
                    </div>
                </div>   
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'Ulibrary',
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style>
#Ulibrary{
    width: 100%;
    height: 100%;
    background: #ffffff;
}

.ulibrary-card1{
    margin: 20px;
    width: 80vw;
    height: 43vh;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #ffffff;
}

.ulibrary-card-title{
    font-size: 20px;
    font-weight: bold;
}

.ulibrary-card-content{
    -webkit-app-region: no-drag; 
}


.ulibrary-card2{
    margin: 20px;
    width: 80vw;
    height: 38vh;
    border-radius: 5px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
    opacity: 0.9;
    background: #ffffff;
}

.ulibrary-card-content-card-img{
    width: 100px;
    height: 150px;
    box-shadow: 0 0 10px 4px rgba(0,0,0,.5);
}

.ulibrary-card-content-card-img:hover{
    scale: 1.1;
    transition: all 0.5s;
}

.ulibrary-card-content-card-title{
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    margin-top: 15px;
}

.ulibrary-left-maincontent a{
    color: #747474;
    font-size: 17px;
    font-family: 'kaiti';
    font-weight:600;
    text-decoration: none;
}

.ulibrary-left-maincontent a:hover{
    color: #000000;
}

.ulibrary-left-maincontent img{
    width: 25px;
    height: 25px;
    vertical-align: middle; /* 垂直对齐 */
    margin-right: 7px;
}

.ulibrary-left-maincontent{
    padding:0 0 1.5vh 0;
    -webkit-app-region: no-drag;
}

.ulibrary-left-content{
    margin: 10px;
    float: left;
    width: 45%;
    height: 100%;
    -webkit-app-region: no-drag;
}

.ulibrary-right-content{
    margin: 10px;
    float: right;
    width: 45%;
    height: 100%;
    -webkit-app-region: no-drag;
}

.ulibrary-right-maincontent{
    padding:0 0 1.5vh 0;
    -webkit-app-region: no-drag;
}

.ulibrary-right-maincontent a{
    color: #747474;
    font-size: 17px;
    font-family: 'kaiti';
    font-weight:600;
    text-decoration: none;
}

.ulibrary-right-maincontent a:hover{
    color: #000000;
}

.ulibrary-right-maincontent img{
    width: 25px;
    height: 25px;
    vertical-align: middle; /* 垂直对齐 */
    margin-right: 7px;
}


</style>
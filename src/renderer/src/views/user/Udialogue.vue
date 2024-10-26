<template>
    <div id="Udialogue">
        <div class="udialoguecontent">
          <el-card class="udialogue-card1">
            <template #header>
              <p>大模型对话</p>
            </template>
            <div class="chat-container">
              <div class="messages"  ref="messagesContainer">
                <Message v-for="(msg, index) in messages" :key="index" :message="msg" />
              </div>
            </div>
            <div class="input-area">
              <input v-model="userInput" class="input-field" type="text" placeholder="输入消息..." @keyup.enter="sendMessage" style="width: 400px;" />
              <button @click="sendMessage" class="send-button">发送</button>
            </div>
          </el-card>
        </div>
    </div>
</template>

<script>
import Message from '../../components/Message.vue';
import axios from 'axios';

export default {
    name: 'Udialogue',
    data() {
      return {
      userInput: '',
      messages: [
        { text: '你好！我来自星界桥梁，你有什么问题都可以问我。', type: 'bot' },
      ]
    };
  },
    components: {
        Message,
    },
    methods: {  
      async sendMessage() {
      if (this.userInput.trim() === '') return;

      // 添加用户消息到消息列表
      this.messages.push({ text: this.userInput, type: 'user' });
      // 清空输入框
      var content = this.userInput;
      this.userInput = '';

      // 发送用户消息到API并获取回复
      const response = await this.getBotReply(content);

      // 添加机器回复到消息列表
      this.messages.push({ text: response, type: 'bot' });
    },
    async getBotReply(message) {
      // 调用API获取机器回复
      const response = await axios.post('https://api-test.eeg4asd.astralbridge.space/llm/chat', {
        "taskId" : localStorage.getItem("taskId"),
        "message" : message+'请用纯文本内容回答且字数不超过150字'
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).catch(err => {
        console.error(err);
        return '抱歉，我不明白你在说什么';
      });
      return response.data.data.message;
    }
    },
}
</script>

<style scoped>
#Uhome {
    height: 100vh;
    width: 100vw;
    background-color: #ffffff;
    border-radius: 3px; /* 设置圆角 */
    -webkit-app-region: drag;   
    overflow: hidden;
}

.udialogue-card1{
  margin:3vh 0 0 5vw;
  height: 80vh;
  width: 70vw;
  -webkit-app-region: no-drag;
  overflow-y: auto;
  padding: 10px;
  border-radius: 5px; /* 设置圆角 */
}

.udialogue-card1 p{
  font-size: 20px;
    font-weight: 600;
    margin-top: 2px;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  position: relative;
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  max-height: 100%; /* 确保消息容器的高度是动态的 */
  margin-bottom: 60px; /* 确保消息容器的底部留出空间给输入区域 */
}

.input-area {
  display: flex;
  position: absolute;
  bottom: 0;
  margin: 0 0 10vh 7vw;
  background: white; /* 确保背景色与页面一致 */
  padding: 10px;
  align-items: center;
  -webkit-app-region: no-drag; 
}
.input-field {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border-radius: 4px;
}
.send-button {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.send-button:hover {
  background-color: #66b1ff;
}
</style>
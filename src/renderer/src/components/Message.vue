<template>
  <div :class="['message', message.type]">
    <div class="avatar" v-if="getbimg(message.type).show">
      <img :src="getbimg(message.type).src" alt="" class="avatar-img"/>
    </div>
    <div class="message-content" style="max-width: 323px;word-wrap: break-word; white-space: pre-wrap;">
      <p class="message-text">{{ message.text }}</p>
    </div>
    <div class="avatar" v-if="getuimg(message.type).show">
      <img :src="getuimg(message.type).src" alt="" class="avatar-img"/>
    </div>
  </div>
</template>

<script>
import userAvatar from '../assets/user.jpg';
import botAvatar from '../assets/bot.png';

export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    getbimg(type) {
      if (type === 'bot') {
        return {
          src: botAvatar,
          show: true
        };
      }
      return {
        src: '',
        show: false
      };
    },
    getuimg(type) {
      if (type === 'user') {
        return {
          src: userAvatar,
          show: true
        };
      }
      return {
        src: '',
        show: false
      };
    }
  }
}
</script>

<style scoped>
.message {
  display: flex;
  margin: 10px 0;
}

.message-content {
  padding: 10px;
  border-radius: 5px;
  max-width: 60%;
}

.message.user {
  justify-content: flex-end;
}

.message.user .message-content {
  background-color: #dcf8c6; /* 绿色背景 */
}

.message.bot {
  justify-content: flex-start;
}

.message.bot .message-content {
  background-color: #f1f1f1; /* 灰色背景 */
}

.avatar-img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin:2px 2px 0 2px;
}

.message-text{
  font-size: 14px;
  color: #000000;
  font-weight: 500;
}
</style>
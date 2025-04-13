<template>
  <v-app>
    <v-main>
          <join-chat-form v-if="!isJoined" @joined-chat="handleJoinChat"/>
          <chat-room v-else :userInfo="userInfo" :messages="messages" :currentUser="currentUser"/>
        </v-main>
  </v-app>
</template>

<script>
import JoinChatForm from './views/chat/JoinChatForm.vue';
import HubConnection from '@/plugins/hub-connections';
import ChatRoom from './views/chat/ChatRoom.vue';
export default {
  components: {
    JoinChatForm,
    ChatRoom
  },
  name: 'App',
  data() {
    return {
      userInfo: [],
      currentUser: [],
      messages: [],
      isJoined: false,
    };
  },
  async mounted() {
  this.$hubConnection = new HubConnection({ url: 'https://localhost:7282/chatHub' });

  try {
    await this.$hubConnection.hub.start()
    .then(() => console.log('Hub connection started'))

    this.$hubConnection.hub.on('ReceiveMessage', (username, msg) => {
      this.userInfo= [...this.userInfo, {username, msg}];
    });
    this.$hubConnection.hub.on('ReceiveSpecificMessage', (username, msg) => {
      this.messages= [...this.messages, {username, msg}];
    });

  } catch (error) {
    console.error('Error starting hub connection:', error);
  }
},
methods:{
  handleJoinChat(connectionInfo) {
    this.currentUser = connectionInfo.username;
    this.isJoined = true;
  }
}
};
</script>

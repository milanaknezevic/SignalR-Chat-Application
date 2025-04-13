<template>
    <v-container>
        <v-row class="pa-5">
            <v-col cols="12">
                <h2>Chatroom</h2>
            </v-col>
            <v-col cols="12">
                <v-list>
                    <v-list-item v-for="(info, index) in userInfo" :key="index">
                        <v-list-item-content>
                            <v-list-item-title>{{ info.msg}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-list>
                    <v-list-item v-for="(message, index) in messages" :key="index">
                        <v-list-item-content>
                            <v-list-item-title :class="['font-weight', 'bold', isCurrentUser(message.username) ? 'text-start' : 'text-end']">{{ message.username }}</v-list-item-title>
                            <v-list-item-subtitle :class="['pa-4', 'mb-2', 'message-bubble', isCurrentUser(message.username) ? 'blue' : 'gray']">
                                {{ message.msg }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-form ref="frm" @submit.prevent="submit">
                    <v-row>
                        <v-col cols="10">
                            <v-text-field
                            v-model="message"
                            :rules="messageRule"
                            outlined
                            ></v-text-field>
                        </v-col>
                        <v-col cols="2" class="mt-2">
                            <v-btn color="primary" type="submit" block>Send</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    components: {
  },
  data() {
    return {
        message: '',
        messageRule: [
            v => !!v || 'Message is required',
        ],
    };
  },
  props: {
    userInfo: {
        type: Array,
        required: true
      },
      messages:{
        type: Array,
        required: true
      },
      currentUser: {
        type: String,
        required: true
      }
    },
    computed:{
        isCurrentUser() {
            return (user) => this.currentUser === user;
        }
    },
    methods: {
        submit() {
            if(!this.$refs.frm.validate())
            return;
        this.$hubConnection.invoke("SendMessage", this.message).
        then(()=>{
            this.message = '';
            this.$refs.frm.reset(); 
            this.$refs.frm.resetValidation();
        })
        .catch(err => console.error("Error while sending the message:", err));}
    }
}
</script>
<style scoped>
.message-bubble {
    border-radius: 15px;
}
.blue{
    background-color:blue;
}
.gray{
    background-color:lightgray;
}
</style>

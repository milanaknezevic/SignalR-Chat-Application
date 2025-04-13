<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5">Join chat</v-card-title>
          <v-card-text>
            <v-form ref="frm" @submit.prevent="submitLogin">
              <v-text-field
                v-model="username"
                label="Username"
                :rules="usernameRule"
                outlined
              ></v-text-field>

              <v-text-field
                v-model="room"
                label="Room"
                :rules="roomRule"
                outlined
              ></v-text-field>

              <v-btn color="primary" type="submit" block>
                Join
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      room: null,
      usernameRule: [
        v => !!v || 'Username is required',
      ],
      roomRule: [
        v => !!v || 'Room is required',
      ],
    };
  },
  methods: {
    submitLogin() {      
      if( this.$refs.frm.validate()){
        const userConnection = {
        userName: this.username ,
        chatRoom:this.room
    };

    this.$hubConnection.invoke("JoinSpecificChatRoom", userConnection)
    .then(() => {
      this.$emit('joined-chat', { username: this.username, room: this.room });
    })
    .catch(err => console.error("Error while joining the room:", err));}
    },
  }
};
</script>

<style scoped>
</style>

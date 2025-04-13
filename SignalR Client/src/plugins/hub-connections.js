import * as signalR from '@microsoft/signalr';
import Vue from 'vue';

class HubConnection {
  constructor({url}) {
    this.url = url;
    this.hub = null;

    const connect = () => {
      this.hub = new signalR.HubConnectionBuilder()
      .withUrl(this.url)
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
    }

    connect()

    Vue.prototype.$hubConnection = this.hub;
  }
}

export default HubConnection;

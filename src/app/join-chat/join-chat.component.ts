import { Component, OnInit } from '@angular/core';
import { StreamChat, ChannelData, Message, User } from 'stream-chat';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-join-chat',
  templateUrl: './join-chat.component.html',
  styleUrls: ['./join-chat.component.css']
})
export class JoinChatComponent implements OnInit {

  username = "";
  groupId="";
  messages: Message[] = [];
  newMessage = '';
  channelList: ChannelData[];
  chatClient: any;
  currentUser: User;
  channel: ChannelData;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
   this.username=this.route.snapshot.queryParamMap.get('username');
   this.groupId=this.route.snapshot.queryParamMap.get('id');
   this.joinChat();
  }
  async joinChat() {
    const username=this.username.toString();
    try {
      const response = await axios.post('https://calm-citadel-71012.herokuapp.com/join', {
       "username": username,
       "groupId":this.groupId
      });
      const { token } = response.data;
      const apiKey = response.data.api_key;

      this.chatClient = new StreamChat(apiKey);

      this.currentUser = await this.chatClient.setUser(
        {
          id:  username,
          name:  username,
        },
        token
      );
console.log( this.chatClient);

      const channel = this.chatClient.channel('team', this.groupId);
console.log(channel);

      await channel.watch();
      this.channel = channel;
      this.messages = channel.state.messages;
      this.channel.on('message.new', event => {
        this.messages = [...this.messages, event.message];
      });
console.log(this.currentUser.me.id)
      const filter = {
        type: 'team',
        members: { $in: [`${this.currentUser.me.id}`] },
      };
      const sort = { last_message_at: -1 };

      this.channelList = await this.chatClient.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });
      console.log(this.channelList)
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }
    try {
      await this.channel.sendMessage({
        text: this.newMessage,
      });
      this.newMessage = '';
    } catch (err) {
      console.log(err);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { StreamChat, ChannelData, Message, User } from 'stream-chat';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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

  constructor(private route:ActivatedRoute,private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    setTimeout(function() { window.scrollTo(0, 1) }, 100);
   this.username=localStorage.getItem("chatUsername");
   this.groupId=localStorage.getItem("channelID");
   this.joinChat();
  }
  async joinChat() {
    this.ngxService.startLoader("master",'do-background-things1')
    this.ngxService.startBackground('do-background-things');
    const username=this.username.toString();
    try {
      const response = await axios.post('https://calm-citadel-71012.herokuapp.com/join', {
       username: username,
       groupId:this.groupId
      }
       );  
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

      const channel = this.chatClient.channel('team', this.groupId);

      await channel.watch();
      this.channel = channel;
      this.messages = channel.state.messages;
      this.channel.on('message.new', event => {
        this.messages = [...this.messages, event.message];
      });
      const filter = {
        type: 'team',
        members: { $in: [`${this.currentUser.me.id}`] },
      };
      const sort = { last_message_at: -1 };

      this.channelList = await this.chatClient.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });
    document.getElementById("messagebox").scrollTo(0, document.getElementById("messagebox").scrollHeight)

    } catch (err) {
      console.log(err);
      return;
    }
    this.ngxService.stopBackground('do-background-things');
    this.ngxService.stopLoader("master",'do-background-things1');
    (setTimeout(() => {
      document.getElementById("messagebox").scrollTo(0, document.getElementById("messagebox").scrollHeight)
        
      }, 60))

  }
  focusEvent(){
    document.body.requestFullscreen();
    document.getElementById("messagebox").scrollTo(0, document.getElementById("messagebox").scrollHeight)

  }
  sendMessage1(){
    if (this.newMessage.trim() === '') {
      return;
    }
    this.sendMessage()
    this.newMessage = '';
    document.getElementById("messagebox").scrollTo(0, document.getElementById("messagebox").scrollHeight)

  }

  async sendMessage() {
  
    try {
      await this.channel.sendMessage({
        text: this.newMessage,
      });
      (setTimeout(() => {
      document.getElementById("messagebox").scrollTo(0, document.getElementById("messagebox").scrollHeight)
        
      }, 60))
    } catch (err) {
      console.log(err);
    }
  }
}

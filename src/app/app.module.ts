import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { AppRoutingModule } from './app-routing.module';
import { JoinChatComponent } from './join-chat/join-chat.component';

@NgModule({
  declarations: [AppComponent, CreateChannelComponent, JoinChatComponent],
  imports: [BrowserModule, FormsModule,ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

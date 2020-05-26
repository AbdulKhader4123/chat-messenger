import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateChannelComponent } from './create-channel/create-channel.component';
import { JoinChatComponent } from './join-chat/join-chat.component';

const routes: Routes = [
  { path: 'create', component: CreateChannelComponent },
  { path: 'join', component: JoinChatComponent },
  { path: '', component: CreateChannelComponent },
];

@NgModule({
  declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

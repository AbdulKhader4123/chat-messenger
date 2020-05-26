import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { AppRoutingModule } from './app-routing.module';
import { JoinChatComponent } from './join-chat/join-chat.component';
import { TimeSplitPipe } from './timepipe';

import {
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule
} from 'ngx-ui-loader';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#563d7c",
  "bgsOpacity": 0.7,
  "bgsPosition": "center-center",
  "bgsSize": 70,
  "bgsType": "three-strings",
  "blur": 6,
  "delay": 0,
  "fgsColor": "yellow",
  "fgsPosition": "center-center",
  "fgsSize": 90,
  "fgsType": "three-strings",
  "gap": 53,
  "logoPosition": "center-center",
  "logoSize": 120,
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  // "pbColor": "#fffbfb",
  "pbColor": "#edeb00",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  // "text": "Adf fashion",
  // "textColor": "#FFFFFF",
  // "textPosition": "center-center",
  "maxTime": -1,
  //set 300 or more to view foreground spinner
  "minTime": 0
};

@NgModule({
  declarations: [AppComponent, CreateChannelComponent, JoinChatComponent,TimeSplitPipe],
  imports: [BrowserModule, BrowserAnimationsModule,FormsModule,ReactiveFormsModule, AppRoutingModule, NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,// import NgxUiLoaderRouterModule. By default, it will show foreground loader.
    NgxUiLoaderHttpModule ,],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

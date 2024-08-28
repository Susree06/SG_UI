import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChatGpt } from '../../core/services/chat-gpt.service';
//import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dyanamic-revenue',
  templateUrl: './dyanamic-revenue.component.html',
  styleUrls: ['./dyanamic-revenue.component.scss']
})

export class DyanamicRevenueComponent implements OnInit{
  // Highcharts: typeof Highcharts = Highcharts;
  // @ViewChild('msgEnd')
  // msgEnd!: ElementRef;
  // input: string = "";
  // isLoading: boolean = false;
  // isTextboxEnabled: boolean = true;
  // isImageRequested: boolean = false;
  // messages: { text: string, image: string | null, isBot: boolean, options: Highcharts.Options | null }[] = [{
  //   text: "Hi, I am HappiestMindsGPT!! How can I assist you today?",
  //   image: null,
  //   isBot: true,
  //   options: null
  // }];
  // // gptForm: FormGroup;
  // responseData: any;
  // chats: { type: string, message: string }[] = [];
  // chatBotData:any;
  // public chart: any;

  // constructor(private http: ChatGpt) {}

  ngOnInit(): void {
   // this.scrollToBottom();
  }

  // scrollToBottom(): void {
  //   try {
  //     this.msgEnd.nativeElement.scrollIntoView();
  //   } catch (err) { }
  // }

  // onEnterKeyPress(event:KeyboardEvent){
  //   if(event.key === 'Enter'){
  //     this.onSubmit(event)
  //   }
  // }

  // onNewChat(){
  //   window.location.reload()
  // }

  // onSubmit(event:any) {
  //   const text = this.input;
  //   this.input = "";
  //   this.messages.push({ text, image: null, isBot: false, options: null });

  //   const query = { prompt: this.input, isImageRequested: this.isImageRequested };
  //   this.isLoading = true;
  //   this.isTextboxEnabled = false;
  //   const gptInputValue = text;
  //   const serviceEndpoint = 'Gpt/directdb';
  //   this.chats.push({ type: 'user', message: gptInputValue });

  //   this.http.chatGpt(serviceEndpoint, { prompt: gptInputValue }).subscribe({
  //     next: (data: any) => {
  //       this.chatBotData=data
  //       this.responseData = data.response;
  //       this.isLoading = false;

  //     //let options: Highcharts.Options | null;
  //     if (data.chartdata == null) {
  //       options = null;
  //     } else {
  //       options = data.chartdata;
  //     }
  //     const finaltext = data.response.replace(/\n/g, '\n\n');
  //       if(finaltext){
  //        const splitAccount = finaltext.split("|");
  //        if(splitAccount.length >0){
  //         data.response= splitAccount[0];
  //        }
  //       }
  //     //  });
  //     this.isTextboxEnabled = true;
  //     this.messages.push( {
  //       text: finaltext,
  //       image: data.imageUrl,
  //       isBot: true,
  //       options
  //     });
  //     },
  //     error: (error: any) => {
  //       console.error('Error:', error);
  //     }
  //   });;
  // }

}

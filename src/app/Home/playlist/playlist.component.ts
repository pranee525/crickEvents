import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientJsonpModule,HttpParams } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
import { NumberSymbol } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';




export interface videoInfo {
  videoId:number,
  src:string,
  title:string,
  matchId:number,
  matchType:string,
  showOnTop:boolean,
  img:string

}
interface MailChimpResponse {
  result: string;
  msg: string;
}
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  name="";
  topSafeUrl="";
  topVideo:videoInfo={matchId:0,matchType:"",videoId:0,src:"",showOnTop:false,title:"",img:""};
  otherVideos:Array<videoInfo>=[];
  submitted = false;
	mailChimpEndpoint = 'https://username.us6.list-manage.com/subscribe/post-json?u=abc123&amp;id=123&';
	error = '';
 
  constructor(private httpClient:HttpClient,private _sanitizer:DomSanitizer) { }

  ngOnInit(): void {

    this.httpClient.get("/assets/js/liveMatches.json").subscribe(data =>{
      console.log(data);
      console.log(data["matchInfo"].length)

      for(var i=0;i<data["matchInfo"].length;i++){
        if(data["matchInfo"][i].showOnTop){
          this.topVideo=data["matchInfo"][i];
          this.topVideo.src=this.topVideo.src+"?autoplay=1"
        }
        else{
          this.otherVideos.push(data["matchInfo"][i]);
        }

      }

      
     this.topSafeUrl==this._sanitizer.bypassSecurityTrustUrl(this.topVideo.src)
      console.log(this.topVideo)
      console.log(this.otherVideos)
      //this.products = data;
    })
  }

  videoURL(url:string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  emailControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);
	nameControl = new FormControl('', [
		Validators.required
	]);

	submit() {
		this.error = '';
		if (this.emailControl.status === 'VALID' && this.nameControl.status === 'VALID') {

			const params = new HttpParams()
				.set('NAME', this.nameControl.value)
				.set('EMAIL', this.emailControl.value)
				.set('b_123abc123abc123abc123abc123abc123abc', ''); // hidden input name

			const mailChimpUrl = this.mailChimpEndpoint + params.toString();

      // 'c' refers to the jsonp callback param key. This is specific to Mailchimp
			this.httpClient.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(response => {
				if (response.result && response.result !== 'error') {
					this.submitted = true;
				}
				else {
					this.error = response.msg;
				}
			}, error => {
				console.error(error);
				this.error = 'Sorry, an error occurred.';
			});
		}
	}


}

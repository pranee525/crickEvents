import { Component, OnInit, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; import {
  HttpClient,
  HttpClientJsonpModule,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


export interface videoInfo_index {
  videoId: number,
  src: string,
  title: string,
  matchId: number,
  matchType: string,
  showOnTop: boolean,
  img: string,
  index: number,
  url:string,
  showurl:boolean


}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  match = 0;
  videoId = 0;
  isInit: boolean = true;
  show_innings1: boolean = false;
  show_innings2: boolean = false;

  topVideo: videoInfo_index = { matchId: 0, matchType: "", videoId: 0, src: "", showOnTop: false, title: "", img: "", index: 0 ,url:"",showurl:false};
  innings_1: Array<videoInfo_index> = [];
  innings_2: Array<videoInfo_index> = [];

  inning_1_info: Array<videoInfo_index> = [];
  inning_2_info: Array<videoInfo_index> = [];
  liveVideo: videoInfo_index = { matchId: 0, matchType: "", videoId: 0, src: "", showOnTop: false, title: "", img: "", index: 0,url:"",showurl:false };

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private _sanitizer: DomSanitizer) { }

  async ngOnInit() {
    console.log("Came here to check data")
    this.route.queryParams.subscribe(params => {
      this.match = params['matchId'] != null ? params["matchId"] : 0;
      this.videoId = params['videoId'];

    });
    if (this.isInit) {
      this.loadVideos(this.match, this.videoId);
      this.isInit = false;
    }
    else {
      this.swapVideos(this.match, this.videoId);
    }


  }

  async loadVideos(selectedMatchId: number, selectedVideoId: number) {
    console.log(this.match + "matchId true")

    var corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const vidData = await this.httpClient
      .get(
        'http://localhost:3000/api/match/getmatch/60cd39a12523c92d20603802',
        { headers: corsHeaders }
      )
      .toPromise();
    console.log(vidData + "this info");
    var arr_selected ;
    
    for(var i=0;i<Object.keys(vidData).length;i++){
      if(vidData[i]._id==this.match){
       arr_selected = vidData[i];
   
      }
    }
    console.log("found the array")
    console.log(arr_selected)


    if (this.liveVideo.videoId == 0) {
      this.liveVideo.videoId = 0;
      this.liveVideo.title = arr_selected.title;
      this.liveVideo.src = arr_selected.youtube_url;
      //this.liveVideo.matchType=arr_selected.matchType;
      this.liveVideo.matchId = arr_selected._id;
      this.liveVideo.url=arr_selected.url;

      if(arr_selected.url!=""){
        this.liveVideo.showurl=true;
      }
      else{
        this.liveVideo.showurl=false;
      }

    }

    var i_value = 1;
    for (var i = i_value; i <= Object.keys(arr_selected.innings_1).length; i++) {

      const vidObject: videoInfo_index = { matchId: 0, matchType: "", videoId: 0, src: "", showOnTop: false, title: "", img: "", index: 0,url:"",showurl:false };
      vidObject.matchId = arr_selected.innings_1[i-1]._id,
        vidObject.src = arr_selected.innings_1[i-1].url + '?autoplay=1';
      vidObject.title = arr_selected.innings_1[i-1].title;
      vidObject.videoId = i;
      vidObject.url=arr_selected.innings_1[i-1].url;
      if(arr_selected.innings_1[i-1].url!=""){
        vidObject.showurl=true;
      }
      else{
        vidObject.showurl=false;
      }

      this.inning_1_info.push(vidObject);
      i_value = i;
    }


   // i_value = i_value + 1;
    for (var i = i_value; i <=Object.keys(arr_selected.innings_2).length; i++) {

      const vidObject: videoInfo_index = { matchId: 0, matchType: "", videoId: 0, src: "", showOnTop: false, title: "", img: "", index: 0,url:"",showurl:false };
      vidObject.matchId = arr_selected.innings_1[i-1]._id,
        vidObject.src = arr_selected.innings_1[i-1].url + '?autoplay=1';
      vidObject.title = arr_selected.innings_1[i-1].title;
      vidObject.videoId = i + i_value;
      i_value = i + i_value;
      vidObject.url=arr_selected.innings_2[i-1].url;

      if(arr_selected.innings_2[i-1].url!=""){
        vidObject.showurl=true;
      }
      else{
        vidObject.showurl=false;
      }
      this.inning_2_info.push(vidObject);
    }



    this.innings_1 = [];
    this.innings_2 = [];
    for (var i = 0; i < this.inning_1_info.length; i++) {
      if (this.inning_1_info[i].videoId == this.videoId) {
        this.topVideo = this.inning_1_info[i];
        this.topVideo.src = this.topVideo.src + "?autoplay=1";
        this.innings_1.push(this.liveVideo)
      }
      else {
        this.innings_1.push(this.inning_1_info[i])
      }

    }
    for (var i = 0; i < this.inning_2_info.length; i++) {

      if (this.inning_2_info[i].videoId == this.videoId) {
        this.topVideo = this.inning_2_info[i];
        this.topVideo.src = this.topVideo.src + "?autoplay=1";
        this.innings_2.push(this.liveVideo)
      }
      else {
        this.innings_2.push(this.inning_2_info[i])
      }
    }

    if (this.topVideo.videoId === 0) {
      this.topVideo = this.liveVideo;
    }
    console.log(this.innings_1)
    console.log(this.innings_2)


    this.show_innings1 = this.innings_1.length > 0 ? true : false;
    this.show_innings2 = this.innings_2.length > 0 ? true : false;
    //this.products = data;


    console.log(this.show_innings1)
  }
  swapVideos(selectedMatchId: number, selectedVideoId: number) {
    console.log("comes here now");
  }

  videoURL(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }




}

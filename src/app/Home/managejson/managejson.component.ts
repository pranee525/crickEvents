import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { HttpClient,HttpHeaders  } from "@angular/common/http";
//import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/common/http';

import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

import {animate, state, style, transition, trigger} from '@angular/animations';

export interface videoInfo_index {
  videoId:number,
  src:string,
  title:string,
  matchId:number,
  matchType:string,
  showOnTop:boolean,
  img:string,
  index:number,
  isExpanded:boolean,
  isEdit:boolean,
  inningsList:Array<videoInfo_index>,

}


@Component({
  selector: 'app-managejson',
  templateUrl: './managejson.component.html',
  styleUrls: ['./managejson.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ManagejsonComponent implements OnInit {

  constructor(private httpClient: HttpClient,private _sanitizer:DomSanitizer) { }
  dataStudentsList = new MatTableDataSource();
  videoList:Array<videoInfo_index>=[];
  dataSource = this.videoList;
  columnsToDisplay = ['id', 'Title ', 'Match Type', 'Show On Top'];
  //expandedElement:videoInfo_index={videoId:0,src:'',title:'',matchId:0,matchType:'',showOnTop:true,img:'',index:0,inningsList:[]};


  ngOnInit(): void {
this.loadVideos();
this.dataStudentsList.data = this.videoList;

   // this.dataStudentsList.data = this.STUDENTS_DATA;
  }
  loadVideos(){
    this.httpClient.get("/assets/js/liveMatches.json").subscribe(data =>{
      console.log(data +"this info");
      console.log(data["matchInfo"].length)
      var arr_selected=data["matchInfo"];
      console.log("found the array")
      console.log(arr_selected)
     
      //var inning_1_info=arr_selected.videos.innings_1;
      //var inning_2_info=arr_selected.videos.innings_2;
      

      for(var i=0;i<arr_selected.length;i++){
        arr_selected[i].isEdit=false;
        this.videoList.push(arr_selected[i])

      }
      this.dataStudentsList.data =this.videoList;
      console.log(this.dataSource)
      //this.products = data;
    })

  }
  isTableExpanded = false;

 

 // dataStudentsList = new MatTableDataSource();
  displayedStudentsColumnsList: string[] = ['videoId', 'title', 'src', 'showOnTop','actions'];


 
  // Toggel Rows
  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.dataStudentsList.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }

  savevideo(){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
   // saveText( JSON.stringify(obj), "filename.json" );
    this.httpClient.post('/assets/js/todo.json', this.dataSource,requestOptions);
  }

}

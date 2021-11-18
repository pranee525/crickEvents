import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './Home/index/index.component';
import { PlaylistComponent } from './Home/playlist/playlist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {CommonModule}from '@angular/common';
import {HttpClientModule}from'@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ManagejsonComponent } from './Home/managejson/managejson.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RecordedComponent } from './Home/recorded/recorded.component';




@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PlaylistComponent,
    ManagejsonComponent,
    RecordedComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IvyCarouselModule,
    CommonModule,
    HttpClientModule, 
    BrowserAnimationsModule,

    // Material Modules for Datatable, List and Buttons
    MatTableModule,
    MatListModule,
    MatButtonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }

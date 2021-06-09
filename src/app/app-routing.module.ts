import { NgModule } from '@angular/core';
import { RouterModule, Routes,ParamMap } from '@angular/router';
import{IndexComponent}from './Home/index/index.component';
import{PlaylistComponent}from './Home/playlist/playlist.component'
import{ManagejsonComponent}from './Home/managejson/managejson.component'
const routes: Routes = [
  { path: 'live', component:PlaylistComponent },
  {path:'highlights',component:IndexComponent},

  {path:'manage',component:ManagejsonComponent},
  {path:'',component:PlaylistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

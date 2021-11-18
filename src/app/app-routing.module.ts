import { NgModule } from '@angular/core';
import { RouterModule, Routes,ParamMap } from '@angular/router';
import{IndexComponent}from './Home/index/index.component';
import{PlaylistComponent}from './Home/playlist/playlist.component'
import{ManagejsonComponent}from './Home/managejson/managejson.component'
import { RecordedComponent } from './Home/recorded/recorded.component';
const routes: Routes = [

  { path: 'woodley/live', component:PlaylistComponent },
  {path:'woodley/recorded',component:IndexComponent},
  {path:'woodley',component:PlaylistComponent},

  {path:'other',component:RecordedComponent},
  { path: '',   redirectTo: '/woodley', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

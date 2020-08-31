import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceListComponent } from './device-list/device-list.component';
import { ActivityLinkComponent } from './activity-link/activity-link.component';
import { UnavailableComponent } from './unavailable/unavailable.component';
import { TemplategroupComponent } from './templategroup/templategroup.component';


const routes: Routes = [
  {path: '', component: DeviceListComponent},
  {path: 'device-list', component: DeviceListComponent},
  {path: 'activity-link', component: ActivityLinkComponent},
  {path: 'templategroup', component: TemplategroupComponent},
  {path: '**', component: UnavailableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

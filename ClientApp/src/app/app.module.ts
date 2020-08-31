import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NotificationModule} from './config/notification.module'
import { HttpClientModule} from '@angular/common/http'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {CommonModule} from '@angular/common'
import { NgxSpinnerModule } from "ngx-spinner";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { ActivityLinkComponent } from './activity-link/activity-link.component';
import { UnavailableComponent } from './unavailable/unavailable.component';
import { from } from 'rxjs';
import {DeviceService} from './services/device.service'
import { TemplategroupComponent } from './templategroup/templategroup.component';

@NgModule({
  declarations: [
      AppComponent,
      NavBarComponent,
      DeviceListComponent,
      ActivityLinkComponent,
      UnavailableComponent,
      TemplategroupComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NotificationModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgxNavbarModule
  ],
  providers: [
    DeviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

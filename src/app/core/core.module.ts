import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { BookingDAO } from './dao/booking-dao.service';
import { AppConfig } from './app-configs/app-configs.service';
import { HttpAccess } from './http/http-access.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    BookingDAO,
    AppConfig,
    HttpAccess
  ]
})
export class CoreModule {
}

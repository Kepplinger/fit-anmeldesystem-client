import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingDAO } from './dao/booking.dao';
import { AppConfig } from './app-config/app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { BranchDAO } from './dao/branch.dao';
import { ResourceDAO } from './dao/resource.dao';
import { PackageDAO } from './dao/package.dao';
import { AreaDAO } from './dao/area.dao';
import { ApplicationStateService } from './app-services/application-state-service';
import { RouterService } from './app-services/router-service';
import { EventDAO } from './dao/event.dao';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    BookingDAO,
    BranchDAO,
    ResourceDAO,
    PackageDAO,
    AreaDAO,
    EventDAO,
    AppConfig,
    ApplicationStateService,
    RouterService
  ]
})
export class CoreModule {
}

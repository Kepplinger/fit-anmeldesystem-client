import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingDAO } from './dao/booking.dao';
import { AppConfig } from './app-config/app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { BranchDAO } from './dao/branch.dao';
import { ResourceDAO } from './dao/resource.dao';
import { PackageDAO } from './dao/package.dao';
import { AreaDAO } from './dao/area.dao';
import { ApplicationStateService } from './app-services/application-state.service';
import { RouterService } from './app-services/router.service';
import { EventDAO } from './dao/event.dao';
import { LocationDao } from './dao/location.dao';
import { AuthenticationDAO } from './dao/authentication.dao';
import { CompanyDAO } from './dao/company.dao';
import { FitRegistrationService } from './app-services/fit-registration.service';
import { ModalWindowService } from './app-services/modal-window.service';
import { BookingTransferService } from './app-services/booking-transfer.service';
import { EventService } from './app-services/event.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    BookingDAO,
    BranchDAO,
    ResourceDAO,
    PackageDAO,
    CompanyDAO,
    LocationDao,
    AuthenticationDAO,
    AreaDAO,
    EventDAO,
    AppConfig,
    ApplicationStateService,
    FitRegistrationService,
    ModalWindowService,
    BookingTransferService,
    RouterService,
    EventService
  ]
})
export class CoreModule {
}

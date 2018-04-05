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
import { LocationDAO } from './dao/location.dao';
import { AuthenticationDAO } from './dao/authentication.dao';
import { CompanyDAO } from './dao/company.dao';
import { FitRegistrationService } from './app-services/fit-registration.service';
import { ModalWindowService } from './app-services/modal-window.service';
import { BookingTransferService } from './app-services/booking-transfer.service';
import { EventService } from './app-services/event.service';
import { ChangeProtocolDAO } from './dao/change-protocol.dao';
import { AppLoadingService } from './app-services/app-loading.service';
import { EmailDAO } from './dao/email.dao';
import { GraduateDao } from './dao/graduate.dao';

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
    ChangeProtocolDAO,
    LocationDAO,
    AuthenticationDAO,
    AreaDAO,
    EventDAO,
    EmailDAO,
    GraduateDao,
    AppConfig,
    ApplicationStateService,
    FitRegistrationService,
    ModalWindowService,
    BookingTransferService,
    RouterService,
    EventService,
    AppLoadingService
  ]
})
export class CoreModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingDAO } from './dao/booking.dao';
import { AppConfig } from './app-config/app-config.service';
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
import { ModalWindowService } from './app-services/modal-window.service';
import { EventService } from './app-services/event.service';
import { ChangeProtocolDAO } from './dao/change-protocol.dao';
import { AppLoadingService } from './app-services/app-loading.service';
import { EmailDAO } from './dao/email.dao';
import { GraduateDao } from './dao/graduate.dao';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PresentationDAO } from './dao/presentation.dao';
import { TagDAO } from './dao/tag.dao';
import { AuthDAO } from './dao/auth.dao';
import { AdminAuthorizationService } from './app-services/admin-authorization.service';
import { AdminAuthenticationInterceptor } from './interceptors/admin-authentication.interceptor';
import { AccountManagementService } from './app-services/account-managenment.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AuthDAO,
    BookingDAO,
    BranchDAO,
    ResourceDAO,
    PackageDAO,
    CompanyDAO,
    LocationDAO,
    ChangeProtocolDAO,
    AuthenticationDAO,
    PresentationDAO,
    TagDAO,
    AreaDAO,
    EventDAO,
    EmailDAO,
    GraduateDao,
    AppConfig,
    ApplicationStateService,
    AdminAuthorizationService,
    AccountManagementService,
    ModalWindowService,
    AppLoadingService,
    RouterService,
    EventService,
    {provide: HTTP_INTERCEPTORS, useClass: AdminAuthenticationInterceptor, multi: true}
  ]
})
export class CoreModule {
}

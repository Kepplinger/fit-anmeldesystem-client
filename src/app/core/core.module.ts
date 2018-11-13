import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingDAO } from './dao/booking.dao';
import { AppConfig } from './app-config/app-config.service';
import { BranchDAO } from './dao/branch.dao';
import { ResourceDAO } from './dao/resource.dao';
import { PackageDAO } from './dao/package.dao';
import { ApplicationStateService } from './app-services/application-state.service';
import { RouterService } from './app-services/router.service';
import { EventDAO } from './dao/event.dao';
import { AuthenticationDAO } from './dao/authentication.dao';
import { CompanyDAO } from './dao/company.dao';
import { ModalWindowService } from './app-services/modal-window.service';
import { EventService } from './app-services/event.service';
import { ChangeProtocolDAO } from './dao/change-protocol.dao';
import { AppLoadingService } from './app-services/app-loading.service';
import { EmailDAO } from './dao/email.dao';
import { GraduateDAO } from './dao/graduate.dao';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PresentationDAO } from './dao/presentation.dao';
import { TagDAO } from './dao/tag.dao';
import { UserAuthorizationService } from './app-services/user-authorization.service';
import { UserAuthenticationInterceptor } from './interceptors/user-authentication.interceptor';
import { AccountManagementService } from './app-services/account-managenment.service';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { DataUpdateNotifier } from './app-services/data-update-notifier';
import { SmtpConfigDAO } from './dao/smtp-config.dao';
import { FitUserDAO } from './dao/fit-user.dao';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { IsRoleGrantedGuard } from './guards/is-role-granted.guard';
import { MemberStatusDAO } from './dao/member-status.dao';
import { EmailVariableDAO } from './dao/email-variable.dao';
import { LockPageDAO } from './dao/lock-page.dao';
import { MediaDAO } from './dao/media.dao';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    FitUserDAO,
    BookingDAO,
    BranchDAO,
    ResourceDAO,
    PackageDAO,
    CompanyDAO,
    ChangeProtocolDAO,
    AuthenticationDAO,
    PresentationDAO,
    TagDAO,
    EventDAO,
    EmailDAO,
    EmailVariableDAO,
    GraduateDAO,
    SmtpConfigDAO,
    MemberStatusDAO,
    MediaDAO,
    LockPageDAO,
    AppConfig,
    ApplicationStateService,
    AccountManagementService,
    ModalWindowService,
    AppLoadingService,
    RouterService,
    EventService,
    DataUpdateNotifier,
    CanDeactivateGuard,
    UserAuthorizationService,
    IsAuthenticatedGuard,
    IsRoleGrantedGuard,
    {provide: HTTP_INTERCEPTORS, useClass: UserAuthenticationInterceptor, multi: true}
  ]
})
export class CoreModule {
}

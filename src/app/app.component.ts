import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from './core/app-services/application-state.service';
import { FitApplication } from './core/model/enums/fit-application';
import { RouterService } from './core/app-services/router.service';
import { EventService } from './core/app-services/event.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorInterceptor } from './core/dao/helper/error-interceptor';
import { AppLoadingService } from './core/app-services/app-loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  FitApplication = FitApplication;

  // noinspection JSUnusedLocalSymbols
  public constructor(private applicationStateService: ApplicationStateService,
                     private appLoadingService: AppLoadingService,
                     private toastr: ToastrService,
                     private eventService: EventService,
                     private router: Router,
                     private routerService: RouterService) {
  }

  public ngOnInit(): void {
    ErrorInterceptor.toastr = this.toastr;
  }

  public isAppLoading(): boolean {
    return this.appLoadingService.isAppLoading();
  }

  public showAdminHeader(): boolean {
    return this.applicationStateService.activatedApplication === FitApplication.AdminTool && this.router.url !== '/admin-tool/login';
  }

  public showFitHeader(): boolean {
    return this.applicationStateService.activatedApplication === FitApplication.FitRegistration;
  }
}

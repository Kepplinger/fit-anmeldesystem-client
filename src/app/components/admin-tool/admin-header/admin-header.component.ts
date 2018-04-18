import { Component } from '@angular/core';
import { AdminAuthorizationService } from '../../../core/app-services/admin-authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fit-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {


  public constructor(private adminAuthorizationService: AdminAuthorizationService,
                     private router: Router) {
  }

  public logout(): void {
    this.adminAuthorizationService.logoutAdmin();
    this.router.navigate(['/admin-tool', 'login']);
  }

}

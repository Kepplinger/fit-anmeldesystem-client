import { Injectable } from '@angular/core';
import { AdminDAO } from '../dao/admin.dao';

@Injectable()
export class AdminAuthorizationService {

  public isFitAdmin: boolean = false;
  public token: string;

  public constructor(private authDAO: AdminDAO) {
    this.token = sessionStorage.getItem('token');
  }

  public async loginAdmin(email: string, password: string): Promise<boolean> {
    let response: any = await this.authDAO.loginAdmin(email, password);

    if (response.auth_token != null) {
      this.token = response.auth_token;
      sessionStorage.setItem('token', this.token);
      return true;
    } else {
      return false;
    }
  }

  public logoutAdmin(): void {
    sessionStorage.removeItem('token');
    this.token = null;
  }
}

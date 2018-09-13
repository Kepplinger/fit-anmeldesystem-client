import { Injectable } from '@angular/core';
import { FitUserDAO } from '../../../core/dao/fit-user.dao';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AdminAuthorizationService {

  public token: string;

  public constructor(private authDAO: FitUserDAO) {
    this.token = sessionStorage.getItem('token');
  }

  public async loginAdmin(email: string, password: string): Promise<boolean> {
    let response: any = await this.authDAO.loginAdmin(email, password);

    let jwtService: JwtHelperService = new JwtHelperService();

    if (response.auth_token != null) {
      this.token = response.auth_token;
      console.log(jwtService.decodeToken(this.token));
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

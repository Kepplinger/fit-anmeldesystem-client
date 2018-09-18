import {Injectable} from '@angular/core';
import {FitUserDAO} from '../dao/fit-user.dao';
import {JwtHelperService} from '@auth0/angular-jwt';
import {FitUserRole} from '../model/enums/fit-user-role';

@Injectable()
export class AdminAuthorizationService {

  private jwtService  = new JwtHelperService();

  public constructor(private authDAO: FitUserDAO) {
  }

  public async loginAdmin(email: string, password: string): Promise<boolean> {
    let response: any = await this.authDAO.loginAdmin(email, password);

    if (response.auth_token != null) {
      let token = response.auth_token;
      sessionStorage.setItem('token', token);
      return true;
    } else {
      return false;
    }
  }

  // noinspection JSMethodCanBeStatic
  public logoutAdmin(): void {
    sessionStorage.removeItem('token');
  }

  public getUserRole(): FitUserRole {
    let token: any = this.getToken();
    if (token != null) {
      return token.rol;
    } else {
      return null;
    }
  }

  public isUserAuthenticated(): boolean {
    let token = sessionStorage.getItem('token');
    if (token != null && token !== '') {
      return !this.jwtService.isTokenExpired(token);
    } else {
      return false;
    }
  }

  public isUserLoggedIn(email: string): boolean {
    let token: any = this.getToken();
    return token != null && token.sub === email;
  }

  public getDecodedToken(): string {
    return sessionStorage.getItem('token');
  }

  private getToken(): any {
    let encodedToken = sessionStorage.getItem('token');

    if (encodedToken != null && encodedToken !== '') {
      try {
        return this.jwtService.decodeToken(encodedToken);
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }
}

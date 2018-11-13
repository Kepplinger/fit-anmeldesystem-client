import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Location } from '@angular/common';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  public constructor(private readonly location: Location,
                     private readonly router: Router) {
  }

  public async canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot): Promise<boolean> {
    if (component.canDeactivate ? !await component.canDeactivate() : false) {
      const currentUrl = this.router.createUrlTree([], currentRoute).toString();
      this.location.go(currentUrl);
      return false;
    } else {
      return true;
    }
  }
}

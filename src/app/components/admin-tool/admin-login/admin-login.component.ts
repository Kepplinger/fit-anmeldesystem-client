import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fit-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  public constructor(private router: Router) { }

  public ngOnInit() {
  }

  public loginAdmin(): void {
    this.router.navigate(['admin-tool/dash']);
  }
}

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'fit',
    loadChildren: 'app/components/fit-registration/fit-registration.module#FitRegistrationModule'
  },
  {
    path: 'admin-tool',
    loadChildren: 'app/components/admin-tool/admin-tool.module#AdminToolModule'
  },
  {
    path: 'konto',
    loadChildren: 'app/components/account-management/account-management.module#AccountManagementModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

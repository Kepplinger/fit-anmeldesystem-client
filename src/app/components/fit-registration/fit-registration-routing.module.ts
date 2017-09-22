import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FitRegistrationComponent } from './fit-registration.component';

const routes: Routes = [
  {
    path: '',
    component: FitRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FitRegistrationRoutingModule {
}

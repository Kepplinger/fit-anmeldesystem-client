import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FitRegistrationComponent } from './fit-registration.component';
import { CodeRequestComponent } from './code-request/code-request.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'anmelden',
        component: FitRegistrationComponent
      },
      {
        path: 'code-beantragen',
        component: CodeRequestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FitRegistrationRoutingModule {
}

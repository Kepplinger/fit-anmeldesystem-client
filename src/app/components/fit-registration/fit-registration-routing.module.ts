import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FitRegistrationComponent } from './fit-registration.component';
import { CodeRequestComponent } from './code-request/code-request.component';
import { SubmissionSuccessComponent } from './submission-success/submission-success.component';

const routes: Routes = [
  {
    path: 'anmelden',
    component: FitRegistrationComponent
  },
  {
    path: 'code-beantragen',
    component: CodeRequestComponent
  },
  {
    path: 'anmeldung-erfolgreich',
    component: SubmissionSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FitRegistrationRoutingModule {
}

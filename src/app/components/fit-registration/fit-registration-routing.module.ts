import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FitRegistrationComponent } from './fit-registration.component';
import { CodeRequestComponent } from './code-request/code-request.component';
import { SubmissionSuccessComponent } from './submission-success/submission-success.component';
import { CodeLostComponent } from '../shared-components/code-lost/code-lost.component';
import { UpdateSuccessComponent } from './update-success/update-success.component';

const routes: Routes = [
  {
    path: 'anmelden',
    component: FitRegistrationComponent
  },
  {
    path: 'code-vergessen',
    component: CodeLostComponent
  },
  {
    path: 'code-beantragen',
    component: CodeRequestComponent
  },
  {
    path: 'anmeldung-erfolgreich',
    component: SubmissionSuccessComponent
  },
  {
    path: 'änderung-erfolgreich',
    component: UpdateSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FitRegistrationRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminToolComponent } from './admin-tool.component';

const routes: Routes = [
  {
    path: '',
    component: AdminToolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminToolRoutingModule {
}

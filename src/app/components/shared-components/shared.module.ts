import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HintIconComponent } from './hint-icon/hint-icon/hint-icon.component';
import { FitHeaderComponent } from './fit-header/header.component';
import { FitFooterComponent } from './fit-footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HintIconComponent,
    FitHeaderComponent,
    FitFooterComponent
  ],
  exports: [
    HintIconComponent,
    FitHeaderComponent,
    FitFooterComponent
  ]
})
export class SharedModule {
}

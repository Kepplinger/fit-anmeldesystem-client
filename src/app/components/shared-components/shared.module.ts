import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';

import { HintIconComponent } from './hint-icon/hint-icon/hint-icon.component';
import { FitHeaderComponent } from './fit-header/header.component';
import { FitFooterComponent } from './fit-footer/footer.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { FormsModule } from '@angular/forms';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TagInputModule,
  ],
  declarations: [
    HintIconComponent,
    FitHeaderComponent,
    FitFooterComponent,
    TagInputComponent,
    CustomCheckboxComponent
  ],
  exports: [
    HintIconComponent,
    FitHeaderComponent,
    FitFooterComponent,
    TagInputComponent,
    CustomCheckboxComponent
  ]
})
export class SharedModule {
}

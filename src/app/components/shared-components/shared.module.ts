import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';

import { HintIconComponent } from './hint-icon/hint-icon/hint-icon.component';
import { FitHeaderComponent } from './fit-header/header.component';
import { FitFooterComponent } from './fit-footer/footer.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { FormsModule } from '@angular/forms';

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
    TagInputComponent
  ],
  exports: [
    HintIconComponent,
    FitHeaderComponent,
    FitFooterComponent,
    TagInputComponent
  ]
})
export class SharedModule {
}

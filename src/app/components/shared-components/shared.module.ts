import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';

import { HintIconComponent } from './hint-icon/hint-icon/hint-icon.component';
import { FitHeaderComponent } from './fit-header/header.component';
import { FitFooterComponent } from './fit-footer/footer.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { CompanyOverviewComponent } from '../account-management/account-overview/company-overview/company-overview.component';
import { GraduateOverviewComponent } from '../account-management/account-overview/graduate-overview/graduate-overview.component';
import { CodeLostComponent } from './code-lost/code-lost.component';
import { TruncatePipe } from './truncate-pipe/truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TagInputModule,
  ],
  declarations: [
    HintIconComponent,
    FitHeaderComponent,
    FitFooterComponent,
    CodeLostComponent,
    TagInputComponent,
    CustomCheckboxComponent,
    CompanyOverviewComponent,
    GraduateOverviewComponent,
    TruncatePipe
  ],
  exports: [
    HintIconComponent,
    FitHeaderComponent,
    FitFooterComponent,
    TagInputComponent,
    CodeLostComponent,
    CustomCheckboxComponent,
    CompanyOverviewComponent,
    GraduateOverviewComponent,
    TruncatePipe
  ]
})
export class SharedModule {
}

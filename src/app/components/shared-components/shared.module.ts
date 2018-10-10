import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';

import { HintIconComponent } from './hint-icon/hint-icon/hint-icon.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { CompanyOverviewComponent } from '../account-management/account-overview/company-overview/company-overview.component';
import { GraduateOverviewComponent } from '../account-management/account-overview/graduate-overview/graduate-overview.component';
import { CodeLostComponent } from './code-lost/code-lost.component';
import { TruncatePipe } from './truncate-pipe/truncate.pipe';
import { MemberCodeInputComponent } from './member-code-input/member-code-input.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

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
    CodeLostComponent,
    TagInputComponent,
    CustomCheckboxComponent,
    CompanyOverviewComponent,
    GraduateOverviewComponent,
    MemberCodeInputComponent,
    LoadingSpinnerComponent,
    TruncatePipe
  ],
  exports: [
    HintIconComponent,
    TagInputComponent,
    CodeLostComponent,
    CustomCheckboxComponent,
    CompanyOverviewComponent,
    GraduateOverviewComponent,
    MemberCodeInputComponent,
    LoadingSpinnerComponent,
    TruncatePipe
  ]
})
export class SharedModule {
}

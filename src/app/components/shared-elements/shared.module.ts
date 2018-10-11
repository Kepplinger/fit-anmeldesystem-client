import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TagInputModule } from 'ngx-chips';

import { HintIconComponent } from './components/hint-icon/hint-icon/hint-icon.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomCheckboxComponent } from './components/custom-checkbox/custom-checkbox.component';
import { CompanyOverviewComponent } from '../account-management/account-overview/company-overview/company-overview.component';
import { GraduateOverviewComponent } from '../account-management/account-overview/graduate-overview/graduate-overview.component';
import { CodeLostComponent } from './components/code-lost/code-lost.component';
import { TruncatePipe } from './pipes/truncate-pipe/truncate.pipe';
import { MemberCodeInputComponent } from './components/member-code-input/member-code-input.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { HtmlSecurityBypassPipe } from './pipes/html-security-bypass-pipe/html-security-bypass.pipe';

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
    TruncatePipe,
    HtmlSecurityBypassPipe
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
    TruncatePipe,
    HtmlSecurityBypassPipe
  ]
})
export class SharedModule {
}

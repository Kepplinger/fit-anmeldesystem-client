import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FitRegistrationRoutingModule } from './fit-registration-routing.module';
import { FitRegistrationComponent } from './fit-registration.component';
import { CodeRequestComponent } from './code-request/code-request.component';
import { GeneralDataComponent } from './registration-steps/1-general-data/general-data.component';
import { DetailedDataComponent } from './registration-steps/2-detailed-data/detailed-data.component';
import { FitAppearanceComponent } from './registration-steps/3-fit-appearance/fit-appearance.component';
import { ContactAndRemarksComponent } from './registration-steps/5-contact-and-remarks/contact-and-remarks.component';
import { SubmissionSuccessComponent } from './submission-success/submission-success.component';
import { PackagesAndLocationComponent } from './registration-steps/4-packages-and-locations/packages-and-location.component';
import { FilePickerModule } from '../../libs/file-picker/file-picker.module';
import { TagInputComponent } from './registration-steps/2-detailed-data/tag-input/tag-input.component';
import { LocationPickerModalComponent } from './registration-steps/4-packages-and-locations/location-picker-modal/location-picker-modal.component';
import {CoreModule} from '../../core/core.module';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {HintIconComponent} from '../shared-components/hint-icon/hint-icon/hint-icon.component';
import {SharedModule} from '../shared-components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FitRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FilePickerModule,
    TagInputModule,
    CoreModule,
    FroalaEditorModule,
    FroalaViewModule,
    SharedModule
  ],
  declarations: [
    FitRegistrationComponent,
    CodeRequestComponent,
    GeneralDataComponent,
    DetailedDataComponent,
    FitAppearanceComponent,
    PackagesAndLocationComponent,
    ContactAndRemarksComponent,
    SubmissionSuccessComponent,
    TagInputComponent,
    LocationPickerModalComponent]
})
export class FitRegistrationModule {
}

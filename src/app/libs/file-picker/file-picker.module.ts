import { NgModule } from '@angular/core';

import { FilePickerDirective } from './file-picker.directive';
import { FileDropzoneDirective } from './file-dropzone.directive';

@NgModule({
  declarations: [
    FilePickerDirective,
    FileDropzoneDirective
  ],
  exports: [
    FilePickerDirective,
    FileDropzoneDirective
  ]
})
export class FilePickerModule {
}

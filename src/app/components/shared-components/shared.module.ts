import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HintIconComponent } from './hint-icon/hint-icon/hint-icon.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    HintIconComponent
  ],
  exports: [
    HintIconComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule {
}

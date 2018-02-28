import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from './components/shared-components/shared.module';
import { AppRoutingModule } from './app.routing.module';
import { RegistrationLockedComponent } from './components/main/registration-locked/registration-locked.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-AT';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

registerLocaleData(localeDe, 'de-AT');

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CoreModule,
    SharedModule
  ], declarations: [
    AppComponent,
    MainComponent,
    RegistrationLockedComponent
  ],
  providers: [{provide: LOCALE_ID, useValue: 'de-AT'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

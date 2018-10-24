import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import localeDe from '@angular/common/locales/de-AT';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing.module';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from './components/shared-elements/shared.module';
import { AdminHeaderComponent } from './components/shared-elements/components/admin-header/admin-header.component';
import { FitHeaderComponent } from './components/shared-elements/components/fit-header/header.component';
import { FitFooterComponent } from './components/shared-elements/components/fit-footer/footer.component';
import { RegistrationLockedComponent } from './components/main/registration-locked/registration-locked.component';
import { RegistrationLockedResolver } from './core/resolver/registration-locked.resolver';

registerLocaleData(localeDe, 'de-AT');

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CoreModule,
    SharedModule,
    JwtModule
  ], declarations: [
    AppComponent,
    MainComponent,
    RegistrationLockedComponent,
    AdminHeaderComponent,
    FitHeaderComponent,
    FitFooterComponent
  ],
  providers: [
    RegistrationLockedResolver,
    {provide: LOCALE_ID, useValue: 'de-AT'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

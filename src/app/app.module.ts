import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from './components/shared-components/shared.module';
import { AppRoutingModule } from './app.routing.module';
import { RegistrationLockedComponent } from './components/main/registration-locked/registration-locked.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

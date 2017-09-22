import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from './components/shared-components/shared.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { RegistrationLockedComponent } from './components/main/registration-locked/registration-locked.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegistrationLockedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

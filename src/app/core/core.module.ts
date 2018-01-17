import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingDAO } from './dao/booking.dao';
import { AppConfig } from './app-config/app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { BranchDAO } from './dao/branch.dao';
import { ResourceDAO } from './dao/resource.dao';
import { PackageDAO } from './dao/package.dao';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AreaDAO } from './dao/area.dao';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [],
  providers: [
    BookingDAO,
    BranchDAO,
    ResourceDAO,
    PackageDAO,
    AreaDAO,
    AppConfig,
  ]
})
export class CoreModule {
}

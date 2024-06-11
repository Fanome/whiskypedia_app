import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';

import { LoadingSpinnerLoginComponent } from '../app/Utils/loading-spinner-login/loading-spinner-login.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

@NgModule({
  declarations: [AppComponent, LoadingSpinnerLoginComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule, 
    NgChartsModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatDialogModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    ),
  ],
  providers: [SQLite, provideNgxMask(),{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy,
   }],
  bootstrap: [AppComponent],
})
export class AppModule {}

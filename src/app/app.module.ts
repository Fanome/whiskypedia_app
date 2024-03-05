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

import { LoadingSpinnerLoginComponent } from '../app/Utils/loading-spinner-login/loading-spinner-login.component';
import { SQLite } from '@ionic-native/sqlite/ngx';

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
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    ),
  ],
  providers: [provideNgxMask(),{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy,
   },
   SQLite
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

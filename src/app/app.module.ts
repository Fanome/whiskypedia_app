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

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ReactiveFormsModule,
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
   }],
  bootstrap: [AppComponent],
})
export class AppModule {}

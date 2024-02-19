import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FolderPageRoutingModule } from './folder-routing.module';
import { FolderPage } from './folder.page';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { FabricanteComponent } from '../pages/fabricante/listarfabricante/fabricante.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(FolderPageRoutingModule),
    ScrollingModule
  ],
  declarations: [FolderPage, FabricanteComponent]
})
export class FolderPageModule {}

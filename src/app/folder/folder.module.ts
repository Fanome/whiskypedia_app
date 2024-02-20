import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FolderPageRoutingModule } from './folder-routing.module';
import { FolderPage } from './folder.page';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { FabricanteComponent } from '../pages/fabricante/listarfabricante/fabricante.component';
import { CriarfabricanteComponent } from '../pages/fabricante/criarfabricante/criarfabricante.component';
import { EditarfabricanteComponent } from '../pages/fabricante/editarfabricante/editarfabricante.component';
import { ExcluirfabricanteComponent } from '../pages/fabricante/excluirfabricante/excluirfabricante.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(FolderPageRoutingModule),
    ScrollingModule
  ],
  declarations: [
    FolderPage, 
    FabricanteComponent, 
    CriarfabricanteComponent,
    EditarfabricanteComponent,
    ExcluirfabricanteComponent
  ]
})
export class FolderPageModule {}

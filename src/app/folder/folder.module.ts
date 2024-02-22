import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FolderPageRoutingModule } from './folder-routing.module';
import { FolderPage } from './folder.page';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxPaginationModule } from 'ngx-pagination';

import { FabricanteComponent } from '../pages/fabricante/listarfabricante/fabricante.component';
import { CriarfabricanteComponent } from '../pages/fabricante/criarfabricante/criarfabricante.component';
import { EditarfabricanteComponent } from '../pages/fabricante/editarfabricante/editarfabricante.component';
import { ExcluirfabricanteComponent } from '../pages/fabricante/excluirfabricante/excluirfabricante.component';

import { ListarTipowhiskyComponent } from '../pages/tipowhisky/listar-tipowhisky/listar-tipowhisky.component';
import { CriarTipowhiskyComponent } from '../pages/tipowhisky/criar-tipowhisky/criar-tipowhisky.component';
import { EditarTipowhiskyComponent } from '../pages/tipowhisky/editar-tipowhisky/editar-tipowhisky.component';
import { ExcluirTipowhiskyComponent } from '../pages/tipowhisky/excluir-tipowhisky/excluir-tipowhisky.component';

import { HomeComponent } from '../pages/home/home.component';

import { ListarWhiskyComponent } from '../pages/whisky/listar-whisky/listar-whisky.component';
import { CriarWhiskyComponent } from '../pages/whisky/criar-whisky/criar-whisky.component';
import { EditarWhiskyComponent } from '../pages/whisky/editar-whisky/editar-whisky.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(FolderPageRoutingModule),
    ScrollingModule,
    NgxPaginationModule
  ],
  declarations: [
    FolderPage, 
    FabricanteComponent, 
    CriarfabricanteComponent,
    EditarfabricanteComponent,
    ExcluirfabricanteComponent,
    ListarTipowhiskyComponent,
    CriarTipowhiskyComponent,
    EditarTipowhiskyComponent,
    ExcluirTipowhiskyComponent,
    HomeComponent,
    ListarWhiskyComponent,
    CriarWhiskyComponent,
    EditarWhiskyComponent
  ]
})
export class FolderPageModule {}

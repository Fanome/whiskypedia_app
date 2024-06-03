import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';


import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
//import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppModule } from '../inicio/app.module';
import { LoadingSpinnerComponent } from '../utils/loading-spinner/loading-spinner.component';
import { HomeLogadoComponent } from '../pages/home-logado/home-logado.component';

import { FabricanteComponent } from '../pages/fabricante/listarfabricante/fabricante.component';
import { CriarfabricanteComponent } from '../pages/fabricante/criarfabricante/criarfabricante.component';
import { EditarfabricanteComponent } from '../pages/fabricante/editarfabricante/editarfabricante.component';
import { ExcluirfabricanteComponent } from '../pages/fabricante/excluirfabricante/excluirfabricante.component';

import { ListarTipowhiskyComponent } from '../pages/tipowhisky/listar-tipowhisky/listar-tipowhisky.component';
import { CriarTipowhiskyComponent } from '../pages/tipowhisky/criar-tipowhisky/criar-tipowhisky.component';
import { EditarTipowhiskyComponent } from '../pages/tipowhisky/editar-tipowhisky/editar-tipowhisky.component';
import { ExcluirTipowhiskyComponent } from '../pages/tipowhisky/excluir-tipowhisky/excluir-tipowhisky.component';

import { ListarWhiskyComponent } from '../pages/whisky/listar-whisky/listar-whisky.component';
import { CriarWhiskyComponent } from '../pages/whisky/criar-whisky/criar-whisky.component';
import { EditarWhiskyComponent } from '../pages/whisky/editar-whisky/editar-whisky.component';
import { ExcluirWhiskyComponent } from '../pages/whisky/excluir-whisky/excluir-whisky.component';

import { ClienteWhiskyComponent } from '../pages/clientewhisky/clientewhisky.component';
import { MinhaAdegaComponent } from '../pages/minhaadega/minhaadega.component';
import { MeusFavoritosComponent } from '../pages/meusfavoritos/meusfavoritos.component';
import { MeuPerfilComponent } from '../pages/meuperfil/meuperfil.component';

import { ExibirWhiskyComponent } from '../pages/exibirwhisky/exibirwhisky.component';

import { ModelOrdenacaoComponent } from '../pages/modalOrdenacao/modalordenacao.component';
import { ModelFiltroComponent } from '../pages/modalFiltro/modalfiltro.component';
import { MigracaoComponent } from '../pages/migracao/migracao.component';

import { NgChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(FolderPageRoutingModule),
    NgxPaginationModule,  
    NgChartsModule,
    AppModule
  ],
  declarations: [
    FolderPage,
    LoadingSpinnerComponent,

    HomeLogadoComponent,

    FabricanteComponent,
    CriarfabricanteComponent,
    EditarfabricanteComponent,
    ExcluirfabricanteComponent,

    ListarTipowhiskyComponent,
    CriarTipowhiskyComponent,
    EditarTipowhiskyComponent,
    ExcluirTipowhiskyComponent,

    ListarWhiskyComponent,
    CriarWhiskyComponent,
    EditarWhiskyComponent,
    ExcluirWhiskyComponent,

    ClienteWhiskyComponent,
    MinhaAdegaComponent,
    MeusFavoritosComponent,
    MeuPerfilComponent,
    ExibirWhiskyComponent,

    ModelOrdenacaoComponent,
    ModelFiltroComponent,
    MigracaoComponent,
  ]
})
export class FolderPageModule {}

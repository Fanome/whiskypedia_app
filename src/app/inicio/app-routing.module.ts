import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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

import { HomeLogadoComponent } from '../pages/home-logado/home-logado.component';
import { ClienteWhiskyComponent } from '../pages/clientewhisky/clientewhisky.component';
import { MinhaAdegaComponent } from '../pages/minhaadega/minhaadega.component';
import { MeusFavoritosComponent } from '../pages/meusfavoritos/meusfavoritos.component';
import { MeuPerfilComponent } from '../pages/meuperfil/meuperfil.component';

import { ExibirWhiskyComponent } from '../pages/exibirwhisky/exibirwhisky.component';

import { MigracaoComponent } from '../pages/migracao/migracao.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homelogado',
    pathMatch: 'full' 
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('../folder/folder.module').then( m => m.FolderPageModule)
  },

  //{path: 'login/:numero', component: AppComponent},

  /// MENU
  {path: 'homelogado', component: HomeLogadoComponent},
  {path: 'clientewhisky', component: ClienteWhiskyComponent},
  {path: 'minhaadega', component: MinhaAdegaComponent},
  {path: 'meusfavoritos', component: MeusFavoritosComponent},
  {path: 'meuperfil', component: MeuPerfilComponent},

  /// FABRICANTE
  { path: 'fabricante', component: FabricanteComponent},
  { path: 'fabricante/criarfabricante', component: CriarfabricanteComponent},
  { path: 'fabricante/editarfabricante/:idFabricante/:nomeFabricante', component: EditarfabricanteComponent},
  { path: 'fabricante/excluirfabricante/:idFabricante/:nomeFabricante', component: ExcluirfabricanteComponent },

    /// TIPO WHISKY
  { path: 'tipowhisky', component: ListarTipowhiskyComponent},
  { path: 'tipowhisky/criartipowhisky', component: CriarTipowhiskyComponent},
  { path: 'tipowhisky/editartipowhisky/:idTipoWhisky/:nomeTipoWhisky', component: EditarTipowhiskyComponent},
  { path: 'tipowhisky/excluirtipowhisky/:idTipoWhisky/:nomeTipoWhisky', component: ExcluirTipowhiskyComponent },

  /// WHISKY
  { path: 'whisky', component: ListarWhiskyComponent},
  { path: 'whisky/criarwhisky', component: CriarWhiskyComponent},
  { path: 'whisky/editarwhisky', component: EditarWhiskyComponent},
  { path: 'whisky/excluirwhisky', component: ExcluirWhiskyComponent },

  /// EXIBIR WHISKY
  { path: 'exibirwhisky', component: ExibirWhiskyComponent },

  /// Carga
  { path: 'migracao', component: MigracaoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

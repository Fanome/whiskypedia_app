import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { FabricanteComponent } from './pages/fabricante/listarfabricante/fabricante.component';
import { CriarfabricanteComponent } from './pages/fabricante/criarfabricante/criarfabricante.component';
import { EditarfabricanteComponent } from './pages/fabricante/editarfabricante/editarfabricante.component';
import { ExcluirfabricanteComponent } from './pages/fabricante/excluirfabricante/excluirfabricante.component';

import { ListarTipowhiskyComponent } from './pages/tipowhisky/listar-tipowhisky/listar-tipowhisky.component';
import { CriarTipowhiskyComponent } from './pages/tipowhisky/criar-tipowhisky/criar-tipowhisky.component';
import { EditarTipowhiskyComponent } from './pages/tipowhisky/editar-tipowhisky/editar-tipowhisky.component';
import { ExcluirTipowhiskyComponent } from './pages/tipowhisky/excluir-tipowhisky/excluir-tipowhisky.component';

import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },

  /// HOME
  {path: 'home', component: HomeComponent},

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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

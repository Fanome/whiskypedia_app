import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { FabricanteComponent } from './pages/fabricante/listarfabricante/fabricante.component';
import { CriarfabricanteComponent } from './pages/fabricante/criarfabricante/criarfabricante.component';
import { EditarfabricanteComponent } from './pages/fabricante/editarfabricante/editarfabricante.component';
import { ExcluirfabricanteComponent } from './pages/fabricante/excluirfabricante/excluirfabricante.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },

  /// FABRICANTE
  { path: 'fabricante', component: FabricanteComponent},
  { path: 'fabricante/criarfabricante', component: CriarfabricanteComponent},
  { path: 'fabricante/edicarfabricante/:idFabricante/:nomeFabricante', component: EditarfabricanteComponent},
  { path: 'fabricante/excluirfabricante/:idFabricante/:nomeFabricante', component: ExcluirfabricanteComponent },

  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

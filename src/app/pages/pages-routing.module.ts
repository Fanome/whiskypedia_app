import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriarUsuarioComponent} from './usuarios/criar-usuario/criar-usuario.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent
  // }
  { path: 'usuario/criar_usuario', component: CriarUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

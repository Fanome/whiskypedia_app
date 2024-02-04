import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { CadastroUsuarioComponent} from './cadastro-usuario/cadastro-usuario.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent
  // }
  //{ path: 'usuario/cadastro_usuario', component: CadastroUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

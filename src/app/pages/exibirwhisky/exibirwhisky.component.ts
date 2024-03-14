import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
// import { ListaWhiskyPaginado } from "../../model/listawhiskyPaginado.model";
import { ListaWhisky } from "../../model/listawhisky.model";
import { ListaWhiskyService } from 'src/app/service/listawhisky/listawhisky.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Usuario } from '../../model/usuario.model';


@Component({
    selector: 'app-exibir-whisky',
    templateUrl: './exibirwhisky.component.html',
    styleUrls: ['./exibirwhisky.component.scss', './exibirwhisky2.component.scss']
  })
export class ExibirWhiskyComponent implements OnInit {

  whiskys: ListaWhisky = {};
  base64String: any;
  imagemUrl: any;

  usuarioLogado: Usuario = {};
  id_usuarios: number = 0;

  loaderFavoritar: boolean = false;
  loaderAdega: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private listaWhiskyService: ListaWhiskyService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
      this.route.queryParams.subscribe(params => {
          this.whiskys = JSON.parse(params['whiskySelecionado']);
      });

      const img = new Image();

      this.base64String = this.whiskys.imagem;
      img.src = this.base64String;
      this.imagemUrl = img.src;

      this.usuarioLogado = this.usuarioService.getGlobalVariable();
      this.id_usuarios = this.usuarioLogado.id_usuarios ? this.usuarioLogado.id_usuarios : 0;
  }

    //MOTIFICAÇÃO 
  notificacao(tipo:any, msg:any){
    
    if(tipo == "sucesso"){
      this.toastr.success(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+ msg +'</span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: "toast-" + "top" + "-" + "center"
        }
      );
    }

    if(tipo == "danger"){
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+ msg +'</span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + "top" + "-" + "center"
          }
        );
    }

    if(tipo == "info"){
      this.toastr.info(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+ msg +'</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: "toast-" + "top" + "-" + "center"
          }
        );
    }
  }

  favoritar(idwhisky: number){  

    this.loaderFavoritar = true;

      if(this.id_usuarios == 0 || idwhisky == 0){
        this.notificacao("danger", "Erro ao curtit Whiskiy");
        this.loaderFavoritar = false;
      }else{
        
        this.listaWhiskyService.favoritar(this.id_usuarios ,idwhisky).subscribe(result => {
          
          let favoritos = result.result;

          if(favoritos.ok){
            this.notificacao("sucess", "Whiskiy curtido");
            this.whiskys.idfavoritos = favoritos.idfavoritos;
            this.loaderFavoritar = false;
          }else{
            this.notificacao("danger", "Erro ao curtit Whiskiy");
            this.loaderFavoritar = false;
          }
        }, error => {
            console.log(error); 
            this.notificacao("danger", "Erro de acesso a API");
            this.loaderFavoritar = false;
        });
      }    
  }
  
  desFavoritar(idwhisky: number){
    this.loaderFavoritar = true;

    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao descurtit Whiskiy");
      this.loaderFavoritar = false;
    }else{

      this.listaWhiskyService.desFavoritar(this.id_usuarios ,idwhisky).subscribe(result => {

        let favoritos = result;

        if(favoritos.ok){
          this.notificacao("sucess", "Whiskiy descurtido");
          this.whiskys.idfavoritos = undefined;
          this.loaderFavoritar = false;
        }else{
          this.notificacao("danger", "Erro ao descurtit Whiskiy");
          this.loaderFavoritar = false;
        }
      }, error => {
          console.log(error); 
          this.notificacao("danger", "Erro de acesso a API");
          this.loaderFavoritar = false;
      });
    }    
  }

  colocarNaMinhaAdega(idwhisky: number){
    this.loaderAdega = true;

    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao incluido whiskiy na minha adega");
      this.loaderAdega = false;
    }else{
      this.listaWhiskyService.colocarNaMinhaAdega(this.id_usuarios ,idwhisky).subscribe(result => {

        let minhaadega = result.result;

        console.log(result);
  
        if(minhaadega){
          this.notificacao("sucess", "Whiskiy incluido na minha adega");
          this.whiskys.idminhaadega = minhaadega.idminhaadega;
          this.loaderAdega = false;
        }else{
          this.notificacao("danger", "Erro ao incluido whiskiy na minha adega");
          this.loaderAdega = false;
        }
      }, error => {
          console.log(error); 
          this.notificacao("danger", "Erro de acesso a API");
          this.loaderAdega = false;
      });
    }    
  }
  
  tirarNaMinhaAdega(idwhisky: number){
    this.loaderAdega = true;
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao retirar Whiskiy da minha adega");
      this.loaderAdega = false;
    }else{
      this.listaWhiskyService.tirarNaMinhaAdega(this.id_usuarios ,idwhisky).subscribe(result => {

        let ok = result;
  
        if(ok){
          this.notificacao("sucess", "Whiskiy retirado da minha adega");
          this.whiskys.idminhaadega = undefined;
          this.loaderAdega = false;
        }else{
          this.notificacao("danger", "Erro ao retirar Whiskiy da minha adega");
          this.loaderAdega = false;
        }
      }, error => {
          console.log(error); 
          this.notificacao("danger", "Erro de acesso a API");
          this.loaderAdega = false;
      });
    }    
  }
}
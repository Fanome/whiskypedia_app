import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { ListaWhiskyPaginado } from "../../model/listawhiskyPaginado.model";
import { ListaWhisky } from "../../model/listawhisky.model";
import { ListaWhiskyService } from 'src/app/service/listawhisky/listawhisky.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { Usuario } from '../../model/usuario.model';

import { ModelOrdenacaoComponent } from '../../pages/modalOrdenacao/modalordenacao.component';
import { ModelFiltroComponent } from '../../pages/modalFiltro/modalfiltro.component';
import { MatDialog } from '@angular/material/dialog';
 
@Component({
  selector: 'app-home',
  templateUrl: './clientewhisky.component.html',
  styleUrls: ['./clientewhisky.component.scss', './clientewhisky-2.component.scss']
})
export class ClienteWhiskyComponent implements OnInit {

  whiskysPaginado: ListaWhiskyPaginado = {};
  whiskys: ListaWhisky[] = []; 

  ordenacaoAtiva: string = '';
  pesquisarTexto: string = '';

  controlePagina: string = '';
  controlePesquisa: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  data: any[] = [];
  usuarioLogado: Usuario = {};
  id_usuarios: number = 0;

  loaderListar = false;

  constructor(
      private router: Router,
      private listaWhiskyService: ListaWhiskyService,
      private usuarioService: UsuarioService,
      private toastr: ToastrService,
      public dialog: MatDialog
      ) { }
  
  ngOnInit() {
    this.currentPage= 1;
    this.pageSize = 10;
    this.totalPages = 0;
    this.usuarioLogado = this.usuarioService.getGlobalVariable();
    this.id_usuarios = this.usuarioLogado.id_usuarios ? this.usuarioLogado.id_usuarios : 0;
    this.listarWhiskyALL(this.currentPage);
  }

  ionViewDidEnter() { // metodo para atualizar a pagina
    this.usuarioLogado = this.usuarioService.getGlobalVariable();
    this.id_usuarios = this.usuarioLogado.id_usuarios ? this.usuarioLogado.id_usuarios : 0;
    //this.escolheGrid();

    if(this.pesquisarTexto != ''){
     this.listarWhiskyPesquisaPaginado(this.currentPage, this.pesquisarTexto);
    }else{
      if(this.ordenacaoAtiva != ''){
        this.listarWhiskyOrdenadoPaginado(this.currentPage, this.ordenacaoAtiva);
      }else{
        this.listarWhiskyALL(this.currentPage);
      }
    }
  }

  listarWhiskyALL (pageNumber: number) {
    this.loaderListar = true;

    this.ordenacaoAtiva = '';

    //this.controlePaginaMetodo('A');
    if(this.controlePagina != 'A'){
      this.controlePagina = 'A';
      this.currentPage= 1;
      pageNumber = 1;
    }

    this.listaWhiskyService.listarALLPaginado(this.id_usuarios, pageNumber, this.pageSize).subscribe(result => {

      this.whiskysPaginado = result;

      this.whiskys = this.whiskysPaginado.data ? this.whiskysPaginado.data : [];
      this.totalPages = this.whiskysPaginado.totalPage ? this.whiskysPaginado.totalPage : 0
      this.currentPage = this.whiskysPaginado.page ? this.whiskysPaginado.page : 0;

      this.loaderListar = false;
    }, error => {
        console.log(error); 
        this.notificacao("danger", "Erro de acesso a API");
        this.loaderListar = false;
    });
    
    this.converteImagem(); 
  }

  converteImagem(){
    const img2:any = new Image();
    img2.src = "";
    var i = 1;
    for (const value of this.whiskys) {
      img2.src = value.imagem;
      value.imagem = img2.src;

      this.whiskys[i].imagem = value.imagem;
      i = i+1;
    }
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

  selecionarWhisky(whiskySelecionado:any){
    //console.log("foi");
    //console.log("whiskySelecionado");
    this.router.navigate(['/exibirwhisky'], { queryParams: { whiskySelecionado: JSON.stringify(whiskySelecionado) } });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      if(this.pesquisarTexto != ''){
       this.listarWhiskyPesquisaPaginado(this.currentPage + 1, this.pesquisarTexto);
      }else{
        if(this.ordenacaoAtiva != ''){
          this.listarWhiskyOrdenadoPaginado(this.currentPage + 1, this.ordenacaoAtiva);
        }else{
          this.listarWhiskyALL(this.currentPage + 1);
        }
      }
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      if(this.pesquisarTexto != ''){
       this.listarWhiskyPesquisaPaginado(this.currentPage - 1, this.pesquisarTexto);
      }else{
        if(this.ordenacaoAtiva != ''){
          this.listarWhiskyOrdenadoPaginado(this.currentPage - 1, this.ordenacaoAtiva);
        }else{
          this.listarWhiskyALL(this.currentPage - 1);
        }
      }
    }
  }

  nextPagePrimeiro(){
    if(this.pesquisarTexto != ''){
     this.listarWhiskyPesquisaPaginado(1, this.pesquisarTexto);
    }else{
      if(this.ordenacaoAtiva != ''){
        this.listarWhiskyOrdenadoPaginado(1, this.ordenacaoAtiva);
      }else{
        this.listarWhiskyALL(1);
      }
    }
  }

  nextPageUltimo(){
    if(this.pesquisarTexto != ''){
     this.listarWhiskyPesquisaPaginado(this.totalPages, this.pesquisarTexto);
    }else{
      if(this.ordenacaoAtiva != ''){
        this.listarWhiskyOrdenadoPaginado(this.totalPages, this.ordenacaoAtiva);
      }else{
        this.listarWhiskyALL(this.totalPages);
      }
    }
  }

  favoritar(idwhisky: number){  
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao curtit Whiskiy");
    }else{
      this.listaWhiskyService.favoritar(this.id_usuarios ,idwhisky).subscribe(result => {

        let ok = result;
  
        if(ok){
          this.notificacao("sucess", "Whiskiy curtido");
          if(this.pesquisarTexto != ''){
            this.listarWhiskyPesquisaPaginado(this.currentPage, this.pesquisarTexto);
          }else{
            if(this.ordenacaoAtiva != ''){
              this.listarWhiskyOrdenadoPaginado(this.currentPage, this.ordenacaoAtiva);
            }else{
              this.listarWhiskyALL(this.currentPage);
            }
          }
        }else{
          this.notificacao("danger", "Erro ao curtit Whiskiy");
        }
        
        //this.loaderListar = false;
      }, error => {
          console.log(error); 
          this.notificacao("danger", "Erro de acesso a API");
          //this.loaderListar = false;
      });
    }    
  }

  desFavoritar(idwhisky: number){
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao descurtit Whiskiy");
    }else{
      this.listaWhiskyService.desFavoritar(this.id_usuarios ,idwhisky).subscribe(result => {

        let ok = result;
  
        if(ok){
          this.notificacao("sucess", "Whiskiy descurtido");
          if(this.pesquisarTexto != ''){
            this.listarWhiskyPesquisaPaginado(this.currentPage, this.pesquisarTexto);
          }else{
            if(this.ordenacaoAtiva != ''){
              this.listarWhiskyOrdenadoPaginado(this.currentPage, this.ordenacaoAtiva);
            }else{
              this.listarWhiskyALL(this.currentPage);
            }
          }
        }else{
          this.notificacao("danger", "Erro ao descurtit Whiskiy");
        }
        
        //this.loaderListar = false;
      }, error => {
          console.log(error); 
          this.notificacao("danger", "Erro de acesso a API");
          //this.loaderListar = false;
      });
    }    
  }

  colocarNaMinhaAdega(idwhisky: number){
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao incluido whiskiy na minha adega");
    }else{
      this.listaWhiskyService.colocarNaMinhaAdega(this.id_usuarios ,idwhisky).subscribe(result => {

        let ok = result;
  
        if(ok){
          this.notificacao("sucess", "Whiskiy incluido na minha adega");
          if(this.pesquisarTexto != ''){
            this.listarWhiskyPesquisaPaginado(this.currentPage, this.pesquisarTexto);
          }else{
            if(this.ordenacaoAtiva != ''){
              this.listarWhiskyOrdenadoPaginado(this.currentPage, this.ordenacaoAtiva);
            }else{
              this.listarWhiskyALL(this.currentPage);
            }
          }
        }else{
          this.notificacao("danger", "Erro ao incluido whiskiy na minha adega");
        }
        
        //this.loaderListar = false;
      }, error => {
          console.log(error); 
          this.notificacao("danger", "Erro de acesso a API");
          //this.loaderListar = false;
      });
    }    
  }

  tirarNaMinhaAdega(idwhisky: number){
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao retirar Whiskiy da minha adega");
    }else{
      this.listaWhiskyService.tirarNaMinhaAdega(this.id_usuarios ,idwhisky).subscribe(result => {

        let ok = result;
  
        if(ok){
          this.notificacao("sucess", "Whiskiy retirado da minha adega");
          if(this.pesquisarTexto != ''){
            this.listarWhiskyPesquisaPaginado(this.currentPage, this.pesquisarTexto);
          }else{
            if(this.ordenacaoAtiva != ''){
              this.listarWhiskyOrdenadoPaginado(this.currentPage, this.ordenacaoAtiva);
            }else{
              this.listarWhiskyALL(this.currentPage);
            }
          }
        }else{
          this.notificacao("danger", "Erro ao retirar Whiskiy da minha adega");
        }
        
        //this.loaderListar = false;
      }, error => {
          console.log(error); 
          this.notificacao("danger", "Erro de acesso a API");
          //this.loaderListar = false;
      });
    }    
  }

  pesquisar() {
    this.ordenacaoAtiva = '';

    if(this.pesquisarTexto != ''){
      this.listarWhiskyPesquisaPaginado(this.currentPage, this.pesquisarTexto);
    }else{
      this.listarWhiskyALL(this.currentPage);
    }
  }

  listarWhiskyPesquisaPaginado (pageNumber: number, pesquisa: string) {
    this.loaderListar = true;

    if(this.controlePagina != 'B'){
      this.controlePagina = 'B';
      this.currentPage= 1;
      pageNumber = 1;
    }

    if(this.controlePesquisa == ''){
      this.controlePagina = 'B';
      this.currentPage= 1;
      this.controlePesquisa = this.pesquisarTexto
      pageNumber = 1;
    }else{
      if(this.controlePesquisa != this.pesquisarTexto)
      {
        this.controlePagina = 'B';
        this.currentPage= 1;
        this.controlePesquisa = this.pesquisarTexto
        pageNumber = 1;
      }
    }

    this.listaWhiskyService.listarWhiskyPesquisaPaginado(this.id_usuarios, pageNumber, this.pageSize, pesquisa).subscribe(result => {

      this.whiskysPaginado = result;
      this.whiskys = this.whiskysPaginado.data ? this.whiskysPaginado.data : [];
      this.totalPages = this.whiskysPaginado.totalPage ? this.whiskysPaginado.totalPage : 0
      this.currentPage = this.whiskysPaginado.page ? this.whiskysPaginado.page : 0;

      this.loaderListar = false;
    }, error => {
        console.log(error); 
        this.notificacao("danger", "Erro de acesso a API");
        this.loaderListar = false;
    });
    
    this.converteImagem(); 
  }

  ordenacao(){
    const dialogRef = this.dialog.open(ModelOrdenacaoComponent, {
      width: '100%',
      height: '35%',
      data: { item: 'Ordenação' },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ordenacaoAtiva = result;

      if(this.ordenacaoAtiva != ''){

        this.currentPage= 1;
        this.pageSize = 10;
        this.totalPages = 0;
        this.pesquisarTexto = '';

        this.listarWhiskyOrdenadoPaginado(this.currentPage, this.ordenacaoAtiva);
      }else{
        this.listarWhiskyALL(this.currentPage);
      }
    });
  }

  listarWhiskyOrdenadoPaginado(pageNumber: number, ordenacaoAtiva: string){
    this.loaderListar = true;

    this.listaWhiskyService.listarWhiskyOrdernarPaginado(this.id_usuarios, pageNumber, this.pageSize, ordenacaoAtiva).subscribe(result => {
      
      this.whiskysPaginado = result;
      this.whiskys = this.whiskysPaginado.data ? this.whiskysPaginado.data : [];
      this.totalPages = this.whiskysPaginado.totalPage ? this.whiskysPaginado.totalPage : 0
      this.currentPage = this.whiskysPaginado.page ? this.whiskysPaginado.page : 0;

      console.log(this.currentPage); 

      this.loaderListar = false;
    }, error => {
        console.log(error); 
        this.notificacao("danger", "Erro de acesso a API");
        this.loaderListar = false;
    });
    
    this.converteImagem(); 

  }

  filtro(){
    const dialogRef = this.dialog.open(ModelFiltroComponent, {
      width: '100%',
      height: '35%',
      data: { item: 'Filtro' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
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
import { ConfigService } from 'src/app/service/config/config-service';
import { ListarWhiskyDataBase } from 'src/app/service_db/listarwhisky_db/listarwhisky_db.service';
 
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
      public dialog: MatDialog,
      private configService: ConfigService,
      private ListarWhiskyDataBase: ListarWhiskyDataBase,
      
      ) { }
  
  ngOnInit() {
    this.currentPage= 1;
    this.pageSize = 10;
    this.totalPages = 0;
    this.usuarioLogado = this.usuarioService.getGlobalVariable();
    this.id_usuarios = this.usuarioLogado.id_usuarios ? this.usuarioLogado.id_usuarios : 0;
  }

  ionViewDidEnter() { // metodo para atualizar a pagina
    this.usuarioLogado = this.usuarioService.getGlobalVariable();
    this.id_usuarios = this.usuarioLogado.id_usuarios ? this.usuarioLogado.id_usuarios : 0;

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

  async listarWhiskyALL (pageNumber: number) {
    this.loaderListar = true;

    this.ordenacaoAtiva = '';

    if(this.controlePagina != 'A'){
      this.controlePagina = 'A';
      this.currentPage= 1;
      pageNumber = 1;
    }

    if(this.configService.bancoDados() == "sqllite"){
      await this.listarWhiskyALLLocal(this.id_usuarios, pageNumber, this.pageSize);
    }else{
      await this.listarWhiskyALLNuvem(this.id_usuarios, pageNumber, this.pageSize);
    }
      
  }

  async listarWhiskyALLLocal(id_usuarios: number, pageNumber: number, pageSize: number){
    this.whiskysPaginado = await this.ListarWhiskyDataBase.buscarTodosPaginadoLocal(id_usuarios, pageNumber, pageSize);

    this.whiskys = this.whiskysPaginado.data ? this.whiskysPaginado.data : [];
    this.totalPages = this.whiskysPaginado.totalPage ? this.whiskysPaginado.totalPage : 0
    this.currentPage = this.whiskysPaginado.page ? this.whiskysPaginado.page : 0;

    this.loaderListar = false;

    this.converteImagem(); 

  }

  async listarWhiskyALLNuvem(id_usuarios: number, pageNumber: number, pageSize: number){

    this.listaWhiskyService.listarALLPaginado(id_usuarios, pageNumber, pageSize).subscribe(result => {

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

  async listarWhiskyPesquisaPaginado (pageNumber: number, pesquisa: string) {
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

    if(this.configService.bancoDados() == "sqllite"){
      await this.listarWhiskyALLPesquisaLocal(this.id_usuarios, pageNumber, this.pageSize, pesquisa);
    }else{
      await this.listarWhiskyALLPesquisaNuvem(this.id_usuarios, pageNumber, this.pageSize, pesquisa);
    }
  }

  async listarWhiskyALLPesquisaLocal(id_usuarios: number, pageNumber: number, pageSize: number, pesquisa: string){
    this.whiskysPaginado = await this.ListarWhiskyDataBase.buscarTodosPesquisaPaginadoLocal(id_usuarios, pageNumber, pageSize, pesquisa);

    this.whiskys = this.whiskysPaginado.data ? this.whiskysPaginado.data : [];
    this.totalPages = this.whiskysPaginado.totalPage ? this.whiskysPaginado.totalPage : 0
    this.currentPage = this.whiskysPaginado.page ? this.whiskysPaginado.page : 0;

    this.loaderListar = false;

    this.converteImagem(); 

  }

  async listarWhiskyALLPesquisaNuvem(id_usuarios: number, pageNumber: number, pageSize: number, pesquisa: string){

    this.listaWhiskyService.listarWhiskyPesquisaPaginado(id_usuarios, pageNumber, pageSize, pesquisa).subscribe(result => {

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

  async listarWhiskyOrdenadoPaginado(pageNumber: number, ordenacaoAtiva: string){
    this.loaderListar = true;

    if(this.configService.bancoDados() == "sqllite"){
      await this.listarWhiskyOrdernarPaginadoLocal(this.id_usuarios, pageNumber, this.pageSize, ordenacaoAtiva);
    }else{
      await this.listarWhiskyOrdernarPaginadoNuvem(this.id_usuarios, pageNumber, this.pageSize, ordenacaoAtiva);
    }
  }

  async listarWhiskyOrdernarPaginadoLocal(id_usuarios: number, pageNumber: number, pageSize: number, ordenacaoAtiva: string){
    this.whiskysPaginado = await this.ListarWhiskyDataBase.buscarTodosOrdernarPaginadoLocal(id_usuarios, pageNumber, pageSize, ordenacaoAtiva);

    this.whiskys = this.whiskysPaginado.data ? this.whiskysPaginado.data : [];
    this.totalPages = this.whiskysPaginado.totalPage ? this.whiskysPaginado.totalPage : 0
    this.currentPage = this.whiskysPaginado.page ? this.whiskysPaginado.page : 0;

    this.loaderListar = false;
  }

  async listarWhiskyOrdernarPaginadoNuvem(id_usuarios: number, pageNumber: number, pageSize: number, ordenacaoAtiva: string){
    this.listaWhiskyService.listarWhiskyOrdernarPaginado(id_usuarios, pageNumber, pageSize, ordenacaoAtiva).subscribe(result => {
      
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
    var i = 0;
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

  async favoritar(idwhisky: number){  
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao curtit Whiskiy");
    }else{
      
      if(this.configService.bancoDados() == "sqllite"){
        await this.favoritarLocal(this.id_usuarios ,idwhisky);
      }else{
        await this.favoritarNuvem(this.id_usuarios ,idwhisky);
      }
    }    

    this.loaderListar = false;
  }

  async favoritarLocal(id_usuarios: number ,idwhisky: number){
    let ok = await this.ListarWhiskyDataBase.favoritarLocal(id_usuarios ,idwhisky);

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
  }

  async favoritarNuvem(id_usuarios: number ,idwhisky: number){
    this.listaWhiskyService.favoritar(id_usuarios ,idwhisky).subscribe(result => {

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

  async desFavoritar(idwhisky: number){
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao descurtit Whiskiy");
    }else{
      if(this.configService.bancoDados() == "sqllite"){
        await this.desfavoritarLocal(this.id_usuarios ,idwhisky);
      }else{
        await this.desfavoritarNuvem(this.id_usuarios ,idwhisky);
      }
    }    

    this.loaderListar = false;
  }

  async desfavoritarLocal(id_usuarios: number ,idwhisky: number){
    let ok = await this.ListarWhiskyDataBase.desfavoritarLocal(id_usuarios ,idwhisky);

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
      this.notificacao("danger", "Erro ao descurtido Whiskiy");
    }
  }

  async desfavoritarNuvem(id_usuarios: number ,idwhisky: number){
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




  async colocarNaMinhaAdega(idwhisky: number){
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao incluido whiskiy na minha adega");
    }else{
      if(this.configService.bancoDados() == "sqllite"){
        await this.colocarNaMinhaAdegaLocal(this.id_usuarios ,idwhisky);
      }else{
        await this.colocarNaMinhaAdegaNuvem(this.id_usuarios ,idwhisky);
      }
    }    

    this.loaderListar = false;
  }
  
  async colocarNaMinhaAdegaLocal(id_usuarios: number ,idwhisky: number){
    let ok = await this.ListarWhiskyDataBase.colocarNaMinhaAdega(id_usuarios ,idwhisky);

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
   
  }

  async colocarNaMinhaAdegaNuvem(id_usuarios: number ,idwhisky: number){
    this.listaWhiskyService.colocarNaMinhaAdega(id_usuarios ,idwhisky).subscribe(result => {

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
      
    }, error => {
        console.log(error); 
        this.notificacao("danger", "Erro de acesso a API");
    });
  }




  async tirarNaMinhaAdega(idwhisky: number){
    if(this.id_usuarios == 0 || idwhisky == 0){
      this.notificacao("danger", "Erro ao retirar Whiskiy da minha adega");
    }else{
      if(this.configService.bancoDados() == "sqllite"){
        await this.tirarNaMinhaAdegaLocal(this.id_usuarios ,idwhisky);
      }else{
        await this.tirarNaMinhaAdegaNuvem(this.id_usuarios ,idwhisky);
      }
    }    
  }

  async tirarNaMinhaAdegaLocal(id_usuarios: number ,idwhisky: number){
    let ok = await this.ListarWhiskyDataBase.tirarNaMinhaAdega(id_usuarios ,idwhisky);

    if(ok){
      this.notificacao("sucess", "Whiskiy retirado na minha adega");
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
      this.notificacao("danger", "Erro ao retirar whiskiy da minha adega");
    }
   
  }

  async tirarNaMinhaAdegaNuvem(id_usuarios: number ,idwhisky: number){
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




  pesquisar() {
    this.ordenacaoAtiva = '';

    if(this.pesquisarTexto != ''){
      this.listarWhiskyPesquisaPaginado(this.currentPage, this.pesquisarTexto);
    }else{
      this.listarWhiskyALL(this.currentPage);
    }
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
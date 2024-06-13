import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { ListaWhiskyPaginado } from "../../model/listawhiskyPaginado.model";
import { ListaWhisky } from "../../model/listawhisky.model";
import { FavoritoService } from 'src/app/service/favorito/favorito.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { ListaWhiskyService } from 'src/app/service/listawhisky/listawhisky.service';
import { Usuario } from '../../model/usuario.model';
import { ConfigService } from 'src/app/service/config/config-service';
import { ListarWhiskyDataBase } from 'src/app/service_db/listarwhisky_db/listarwhisky_db.service';
import { FavoritoDataBase } from 'src/app/service_db/favorito_db/favorito_db.service';

@Component({
  selector: 'app-home',
  templateUrl: './meusfavoritos.component.html',
  styleUrls: ['./meusfavoritos.component.scss']
})
export class MeusFavoritosComponent implements OnInit {

  whiskysPaginado: ListaWhiskyPaginado = {};
  whiskys: ListaWhisky[] = []; 

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  data: any[] = [];
  usuarioLogado: Usuario = {};
  id_usuarios: number = 0;

  loaderListar = false;

  constructor(
    private router: Router,
    private favoritoService: FavoritoService,
    private usuarioService: UsuarioService,
    private listaWhiskyService: ListaWhiskyService,
    private toastr: ToastrService,
    private configService: ConfigService,
    private listarWhiskyDataBase: ListarWhiskyDataBase,
    private favoritoDataBase: FavoritoDataBase
  ) { }
  
  ngOnInit() {
    this.currentPage= 1;
    this.pageSize = 5;
    this.totalPages = 0;
    this.usuarioLogado = this.usuarioService.getGlobalVariable();
    this.id_usuarios = this.usuarioLogado.id_usuarios ? this.usuarioLogado.id_usuarios : 0;
    //this.listarWhiskyALL(this.currentPage);
  }
    
  ionViewDidEnter() { // metodo para atualizar a pagina
    this.usuarioLogado = this.usuarioService.getGlobalVariable();
    this.id_usuarios = this.usuarioLogado.id_usuarios ? this.usuarioLogado.id_usuarios : 0;

    this.listarWhiskyALL(this.currentPage);
  }

  async listarWhiskyALL (pageNumber: number) {
    this.loaderListar = true;

    if(this.configService.bancoDados() == "sqllite"){
      await this.listarWhiskyALLLocal(this.id_usuarios, pageNumber, this.pageSize);
    }else{
      await this.listarWhiskyALLNuvem(this.id_usuarios, pageNumber, this.pageSize);
    }
      
  }

  async listarWhiskyALLLocal(id_usuarios: number, pageNumber: number, pageSize: number){
    this.whiskysPaginado = await this.favoritoDataBase.buscarTodosPaginadoLocal(id_usuarios, pageNumber, pageSize);

    this.whiskys = this.whiskysPaginado.data ? this.whiskysPaginado.data : [];
    this.totalPages = this.whiskysPaginado.totalPage ? this.whiskysPaginado.totalPage : 0
    this.currentPage = this.whiskysPaginado.page ? this.whiskysPaginado.page : 0;

    this.loaderListar = false;

    this.converteImagem(); 

  }

  async listarWhiskyALLNuvem(id_usuarios: number, pageNumber: number, pageSize: number){

    this.favoritoService.listarALLPaginado(this.id_usuarios, pageNumber, this.pageSize).subscribe(result => {

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
    console.log("foi");
    //console.log("whiskySelecionado");
    //this.router.navigate(['/whisky/editarwhisky'], { queryParams: { whiskySelecionado: JSON.stringify(whiskySelecionado) } });
  }
    
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.listarWhiskyALL(this.currentPage + 1);
    }
  }
    
  prevPage() {
    if (this.currentPage > 1) {
      this.listarWhiskyALL(this.currentPage - 1);
    }
  }
    
  nextPagePrimeiro(){
    this.listarWhiskyALL(1);
  }
    
  nextPageUltimo(){
    this.listarWhiskyALL(this.totalPages);
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
    let ok = await this.listarWhiskyDataBase.favoritarLocal(id_usuarios ,idwhisky);

    if(ok){
      this.notificacao("sucess", "Whiskiy curtido");
      this.listarWhiskyALL(this.currentPage);
    }
    else{
      this.notificacao("danger", "Erro ao curtit Whiskiy");
    }
  }

  async favoritarNuvem(id_usuarios: number ,idwhisky: number){
    this.listaWhiskyService.favoritar(id_usuarios ,idwhisky).subscribe(result => {

      let ok = result;

      if(ok){
        this.notificacao("sucess", "Whiskiy curtido");
        
        this.listarWhiskyALL(this.currentPage);
      }else{
        this.notificacao("danger", "Erro ao curtit Whiskiy");
      }
    }, error => {
        console.log(error); 
        this.notificacao("danger", "Erro de acesso a API");
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
    let ok = await this.listarWhiskyDataBase.desfavoritarLocal(id_usuarios ,idwhisky);

    if(ok){
      this.notificacao("sucess", "Whiskiy descurtido");
      this.listarWhiskyALL(this.currentPage);
    }else{
      this.notificacao("danger", "Erro ao descurtido Whiskiy");
    }
  }

  async desfavoritarNuvem(id_usuarios: number ,idwhisky: number){
    this.listaWhiskyService.desFavoritar(this.id_usuarios ,idwhisky).subscribe(result => {

      let ok = result;

      if(ok){
        this.notificacao("sucess", "Whiskiy descurtido");
        this.listarWhiskyALL(this.currentPage);
      }else{
        this.notificacao("danger", "Erro ao descurtit Whiskiy");
      }
    }, error => {
        console.log(error); 
        this.notificacao("danger", "Erro de acesso a API");

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
    let ok = await this.listarWhiskyDataBase.colocarNaMinhaAdega(id_usuarios ,idwhisky);

    if(ok){
      this.notificacao("sucess", "Whiskiy incluido na minha adega");
      this.listarWhiskyALL(this.currentPage);
    }else{
      this.notificacao("danger", "Erro ao incluido whiskiy na minha adega");
    }
  }

  async colocarNaMinhaAdegaNuvem(id_usuarios: number ,idwhisky: number){
    this.listaWhiskyService.colocarNaMinhaAdega(id_usuarios ,idwhisky).subscribe(result => {

      let ok = result;

      if(ok){
        this.notificacao("sucess", "Whiskiy incluido na minha adega");
        this.listarWhiskyALL(this.currentPage);
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
    let ok = await this.listarWhiskyDataBase.tirarNaMinhaAdega(id_usuarios ,idwhisky);

    if(ok){
      this.notificacao("sucess", "Whiskiy retirado na minha adega");
      this.listarWhiskyALL(this.currentPage);
    }else{
      this.notificacao("danger", "Erro ao retirar whiskiy da minha adega");
    }
  }

  async tirarNaMinhaAdegaNuvem(id_usuarios: number ,idwhisky: number){
    this.listaWhiskyService.tirarNaMinhaAdega(this.id_usuarios ,idwhisky).subscribe(result => {

      let ok = result;

      if(ok){
        this.notificacao("sucess", "Whiskiy retirado da minha adega");
        this.listarWhiskyALL(this.currentPage);
      }else{
        this.notificacao("danger", "Erro ao retirar Whiskiy da minha adega");
      }

    }, error => {
        console.log(error); 
        this.notificacao("danger", "Erro de acesso a API");
    });
  }

}
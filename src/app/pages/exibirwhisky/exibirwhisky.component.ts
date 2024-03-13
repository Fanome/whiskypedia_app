import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
// import { ToastrService } from "ngx-toastr";
// import { ListaWhiskyPaginado } from "../../model/listawhiskyPaginado.model";
import { ListaWhisky } from "../../model/listawhisky.model";
// import { ListaWhiskyService } from 'src/app/service/listawhisky/listawhisky.service';
// import { UsuarioService } from 'src/app/service/usuario/usuario.service';
// import { Usuario } from '../../model/usuario.model';


@Component({
    selector: 'app-exibir-whisky',
    templateUrl: './exibirwhisky.component.html',
    styleUrls: ['./exibirwhisky.component.scss', './exibirwhisky2.component.scss']
  })
export class ExibirWhiskyComponent implements OnInit {

    whiskys: ListaWhisky = {};
    base64String: any;
    imagemUrl: any;

    constructor(private route: ActivatedRoute,) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.whiskys = JSON.parse(params['whiskySelecionado']);
        });

        const img = new Image();

        this.base64String = this.whiskys.imagem;
        img.src = this.base64String;
        this.imagemUrl = img.src;

        //alert(this.whiskys.nomeWhisky);
    }

    favoritar(idwhisky: number){  

        console.log('foi');

        // if(this.id_usuarios == 0 || idwhisky == 0){
        //   this.notificacao("danger", "Erro ao curtit Whiskiy");
        // }else{
        //   this.listaWhiskyService.favoritar(this.id_usuarios ,idwhisky).subscribe(result => {
    
        //     let ok = result;
      
        //     if(ok){
        //       this.notificacao("sucess", "Whiskiy curtido");
        //       this.listarWhiskyALL(this.currentPage);
        //     }else{
        //       this.notificacao("danger", "Erro ao curtit Whiskiy");
        //     }
            
        //     //this.loaderListar = false;
        //   }, error => {
        //       console.log(error); 
        //       this.notificacao("danger", "Erro de acesso a API");
        //       //this.loaderListar = false;
        //   });
        // }    
      }
    
      desFavoritar(idwhisky: number){

        console.log('foi');

        // if(this.id_usuarios == 0 || idwhisky == 0){
        //   this.notificacao("danger", "Erro ao descurtit Whiskiy");
        // }else{
        //   this.listaWhiskyService.desFavoritar(this.id_usuarios ,idwhisky).subscribe(result => {
    
        //     let ok = result;
      
        //     if(ok){
        //       this.notificacao("sucess", "Whiskiy descurtido");
        //       this.listarWhiskyALL(this.currentPage);
        //     }else{
        //       this.notificacao("danger", "Erro ao descurtit Whiskiy");
        //     }
            
        //     //this.loaderListar = false;
        //   }, error => {
        //       console.log(error); 
        //       this.notificacao("danger", "Erro de acesso a API");
        //       //this.loaderListar = false;
        //   });
        // }    
      }

      colocarNaMinhaAdega(idwhisky: number){

        console.log('foi');

        // if(this.id_usuarios == 0 || idwhisky == 0){
        //   this.notificacao("danger", "Erro ao incluido whiskiy na minha adega");
        // }else{
        //   this.listaWhiskyService.colocarNaMinhaAdega(this.id_usuarios ,idwhisky).subscribe(result => {
    
        //     let ok = result;
      
        //     if(ok){
        //       this.notificacao("sucess", "Whiskiy incluido na minha adega");
        //       this.listarWhiskyALL(this.currentPage);
        //     }else{
        //       this.notificacao("danger", "Erro ao incluido whiskiy na minha adega");
        //     }
            
        //     //this.loaderListar = false;
        //   }, error => {
        //       console.log(error); 
        //       this.notificacao("danger", "Erro de acesso a API");
        //       //this.loaderListar = false;
        //   });
        // }    
      }
    
      tirarNaMinhaAdega(idwhisky: number){

        console.log('foi');
        
        // if(this.id_usuarios == 0 || idwhisky == 0){
        //   this.notificacao("danger", "Erro ao retirar Whiskiy da minha adega");
        // }else{
        //   this.listaWhiskyService.tirarNaMinhaAdega(this.id_usuarios ,idwhisky).subscribe(result => {
    
        //     let ok = result;
      
        //     if(ok){
        //       this.notificacao("sucess", "Whiskiy retirado da minha adega");
        //       this.listarWhiskyALL(this.currentPage);
        //     }else{
        //       this.notificacao("danger", "Erro ao retirar Whiskiy da minha adega");
        //     }
            
        //     //this.loaderListar = false;
        //   }, error => {
        //       console.log(error); 
        //       this.notificacao("danger", "Erro de acesso a API");
        //       //this.loaderListar = false;
        //   });
        // }    
      }
}
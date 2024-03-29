import { Component, OnInit } from '@angular/core';
import { TipowhiskyService } from 'src/app/service/tipowhisky/tipowhisky.service';
import { TipoWhisky } from 'src/app/model/tipowhisky.model';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-excluir-tipowhisky',
  templateUrl: './excluir-tipowhisky.component.html',
  styleUrls: ['./excluir-tipowhisky.component.scss']
})
export class ExcluirTipowhiskyComponent implements OnInit {

  tipoWhisky: TipoWhisky = {};

  loaderExcluir = false;

  constructor(
    private tipowhiskyService: TipowhiskyService, 
    private router: Router, 
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.tipoWhisky.idTipoWhisky = this.route.snapshot.params['idTipoWhisky'];
    this.tipoWhisky.nomeTipoWhisky = this.route.snapshot.params['nomeTipoWhisky'];
  }

  excluirTipoWhisky(tipowhiskyExcluido: any){
    this.loaderExcluir = true;
    this.tipowhiskyService.excluirtipowhiskyPost(tipowhiskyExcluido).subscribe(result => {
      if(result){
        this.notificacao("sucesso", "Tipo Whisky excluirdo com sucesso");
        this.loaderExcluir = false;
        this.router.navigate(["/tipowhisky"]);
      }else{
        this.notificacao("danger", "Erro ao excluir Tipo Whisky");
        this.loaderExcluir = false;
      }
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
        this.loaderExcluir = false;
    });
  }

   //MOTIFICAÇÃO 
   notificacao(tipo: any, msg: any){
    
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

}

import { Component, OnInit } from '@angular/core';
import { TipowhiskyService } from 'src/app/service/tipowhisky/tipowhisky.service';
import { TipoWhisky } from 'src/app/model/tipowhisky.model';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-editar-tipowhisky',
  templateUrl: './editar-tipowhisky.component.html',
  styleUrls: ['./editar-tipowhisky.component.scss']
})
export class EditarTipowhiskyComponent implements OnInit {

  tipoWhiskys: TipoWhisky = {};

  constructor(
    private tipowhiskyService: TipowhiskyService, 
    private router: Router, 
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.tipoWhiskys.idTipoWhisky = this.route.snapshot.params['idTipoWhisky'];
    this.tipoWhiskys.nomeTipoWhisky = this.route.snapshot.params['nomeTipoWhisky'];
  }

  editarTipoWhisky(tipoWhiskyEditado: any){
    this.tipowhiskyService.editartipowhiskyPut(tipoWhiskyEditado).subscribe(result => {
      if(result){
        this.notificacao("sucesso", "Tipo Whisky alterado com sucesso");
        this.router.navigate(["/tipowhisky"]);
      }else{
        this.notificacao("danger", "Erro ao alterar Tipo Whisky");
      }
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
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

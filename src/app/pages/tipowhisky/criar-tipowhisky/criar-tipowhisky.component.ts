import { Component, OnInit } from '@angular/core';
import { TipowhiskyService } from 'src/app/service/tipowhisky/tipowhisky.service';
import { TipoWhisky } from 'src/app/model/tipowhisky.model';
import { Router } from '@angular/router'; 
import { ToastrService } from "ngx-toastr";
import { ConfigService } from 'src/app/service/config/config-service';
import { TipoWhiskyDataBase } from 'src/app/service_db/tipowhisky_db/tipowhisky_db.service';

@Component({
  selector: 'app-criar-tipowhisky',
  templateUrl: './criar-tipowhisky.component.html',
  styleUrls: ['./criar-tipowhisky.component.scss']
})
export class CriarTipowhiskyComponent implements OnInit {

  tipoWhiskys: TipoWhisky = {};

  loaderCriar = false;

  constructor(
    private tipowhiskyService: TipowhiskyService, 
    private router: Router,
    private toastr: ToastrService,
    private configService: ConfigService,
    private tipoWhiskyDataBase: TipoWhiskyDataBase
  ) { }

  ngOnInit() {
  }

  async criarTipoWhisky(): Promise<void>{
    this.loaderCriar = true;

    if(this.configService.bancoDados() == "sqllite"){
      await this.criarTipoWhiskyLocal();
      this.loaderCriar = false;
    }
    else{
      await this.criarTipoWhiskyNuvem();
    }   
  }

  async criarTipoWhiskyLocal(): Promise<void>{
    const nome = this.tipoWhiskys.nomeTipoWhisky == undefined? "" : this.tipoWhiskys.nomeTipoWhisky
    const result = await this.tipoWhiskyDataBase.criarTipoWhisky(nome);
    if(result){
      this.notificacao("sucesso", "Tipo Whisky criado com sucesso");
      this.tipoWhiskys = {};
      this.loaderCriar = false;
      this.router.navigate(["/tipowhisky"]);
    }else{
      this.notificacao("danger", "Erro ao criar Tipo Whisky");
      this.loaderCriar = false;
    }
  }

  async criarTipoWhiskyNuvem(): Promise<void>{
    this.tipowhiskyService.criartipowhiskyPost(this.tipoWhiskys).subscribe(result => {
      if(result){
        this.notificacao("sucesso", "Tipo Whisky criado com sucesso");
        this.loaderCriar = false;
        this.router.navigate(["/tipowhisky"]);
      }else{
        this.notificacao("danger", "Erro ao criar Tipo Whisky");
        this.loaderCriar = false;
      }
    }, error => {
        console.log(error);
        this.notificacao("danger", "Erro de acesso a API");
        this.loaderCriar = false;
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

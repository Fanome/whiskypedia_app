import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config-service';

@Injectable({
  providedIn: 'root'
})
export class MigracaoLocalNuvemService {

    constructor(private http: HttpClient,  private configService: ConfigService) {}

    public ambiente: string = "";
    public criarfabricantePostAllURL = '/api/fabricante/incluir';
    public criartipowhiskyPostAllURL = '/api/tipowhisky/incluir';
    public criarwhiskyPostAllURL = '/api/whisky/incluir';

    criarFabricanteMigracaoLocalParaNuvemPost(data: any) {
        this.ambiente = this.configService.buscarAmbiente()
        const url = this.ambiente + this.criarfabricantePostAllURL;
        return  this.http.post(url, data);
    }

    criartipowhiskyMigracaoLocalParaNuvemPost(data: any) {
        this.ambiente = this.configService.buscarAmbiente()
        const url = this.ambiente + this.criartipowhiskyPostAllURL;
        return  this.http.post(url, data);
    }

    criarWhiskyMigracaoLocalParaNuvemPos(data: any) {
        this.ambiente = this.configService.buscarAmbiente()
        const url = this.ambiente + this.criarwhiskyPostAllURL;
        return  this.http.post(url, data);
    }

}
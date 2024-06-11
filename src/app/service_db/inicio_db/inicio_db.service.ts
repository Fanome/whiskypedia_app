import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { UsuarioDataBase } from '../usuario_db/usuario_db.service';
import { FabricanteDataBase } from '../fabricante_db/fabricante_db.service';
import { TipoWhiskyDataBase } from '../tipowhisky_db/tipowhisky_db.service';

@Injectable({
  providedIn: 'root'
})

export class InicioDataBase {
    db:SQLiteObject;

    constructor(
        private sqlite: SQLite,
        private usuarioDataBase: UsuarioDataBase,
        private fabricanteDataBase: FabricanteDataBase,
        private tipoWhiskyDataBase: TipoWhiskyDataBase
    ) {}

    async createOpenDatabase(){
      try{
        await this.sqlite.create({
          name: 'whiskypedia.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
        this.db=db;
            //alert('database created/opened whiskypedia');
        })
        .catch(e => alert(JSON.stringify(e)));

        await this.usuarioDataBase.createTable_Usuario(this.db);
        await this.fabricanteDataBase.createTable_Fabricante(this.db);
        await this.tipoWhiskyDataBase.createTable_TipoWhisky(this.db);
        

      }
      catch(err:any){
        alert(err);
      }
    }
}
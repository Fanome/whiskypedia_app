import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { UsuarioDataBase } from '../usuario_db/usuario_db.service';
import { FabricanteDataBase } from '../fabricante_db/fabricante_db.service';
import { TipoWhiskyDataBase } from '../tipowhisky_db/tipowhisky_db.service';
import { WhiskyDataBase } from '../whisky_db/whisky_db.service';
import { ListarWhiskyDataBase } from '../listarwhisky_db/listarwhisky_db.service';
import { FavoritoDataBase } from '../favorito_db/favorito_db.service';
import { MinhaAdegaDataBase } from '../minhaadega_db/minhaadega_db.service';

@Injectable({
  providedIn: 'root'
})

export class InicioDataBase {
    db:SQLiteObject;

    constructor(
        private sqlite: SQLite,
        private usuarioDataBase: UsuarioDataBase,
        private fabricanteDataBase: FabricanteDataBase,
        private tipoWhiskyDataBase: TipoWhiskyDataBase,
        private whiskyDataBase: WhiskyDataBase,
        private listarWhiskyDataBase: ListarWhiskyDataBase,
        private favoritoDataBase: FavoritoDataBase,
        private minhaAdegaDataBase: MinhaAdegaDataBase
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

        // criar tabelas
        await this.usuarioDataBase.createTable_Usuario(this.db);
        await this.fabricanteDataBase.createTable_Fabricante(this.db);
        await this.tipoWhiskyDataBase.createTable_TipoWhisky(this.db);
        await this.whiskyDataBase.createTable_Whisky(this.db);
        await this.favoritoDataBase.createTable_Favorito(this.db);
        await this.minhaAdegaDataBase.createTable_MinhaAdega(this.db);

        // iniciar somente o banco
        await this.listarWhiskyDataBase.iniciar_Banco(this.db);
              
      }
      catch(err:any){
        alert(err);
      }
    }
}
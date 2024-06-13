import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ListaWhisky } from 'src/app/model/listawhisky.model';
import { WhiskyPaginado } from 'src/app/model/whiskyPaginado.model';


@Injectable({
  providedIn: 'root'
})

export class FavoritoDataBase {
    db:SQLiteObject;
    whiskys: ListaWhisky[] = []; 
    whiskyPaginado: WhiskyPaginado;
    totalPaginado: number;

    constructor(private sqlite: SQLite) {}

    async createTable_Favorito(db:SQLiteObject): Promise<void>{
        this.db=db;
        //alert('vai criada table favoritos');
        this.db.executeSql(`CREATE TABLE IF NOT EXISTS favoritos (
                idfavoritos INTEGER PRIMARY KEY AUTOINCREMENT, 
                id_usuarios INTEGER NOT NULL,
                idWhisky INTEGER NOT NULL
            )`, [])
        .then((result) => {
            //alert('table favoritos criada');
        } )
        .catch(e => alert(JSON.stringify(e))); 
        
    }

    async buscarTodosPaginadoLocal(id: number, pageNumber: number, pageSize: number): Promise<any>{

        let idusuario = id;
        let page = pageNumber;
        let registros = pageSize;
  
        this.whiskyPaginado = {};
  
        const offset = (page - 1) * registros;
  
        this.whiskyPaginado.data = await this.buscarTodosPaginadoData(idusuario, registros, offset);
  
        const totalPageData = await this.buscarTodosPaginadoTotal();
  
        const totalPage = Math.ceil(+totalPageData / registros);
  
        this.whiskyPaginado.page = +page;
        this.whiskyPaginado.registros = +registros;
        this.whiskyPaginado.totalPage = totalPage
  
        return this.whiskyPaginado;
    }

    async buscarTodosPaginadoData(idusuario: number, registros: number, offset: number): Promise<ListaWhisky[]>{
        this.whiskys=[];
        await this.db.executeSql('SELECT  w.*, f.nomeFabricante, t.nomeTipoWhisky, fa.idfavoritos, a.idminhaadega  FROM whisky w ' +
                                ' inner join fabricante f on f.idFabricante = w.idFabricante ' + 
                                ' inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky ' +
                                ' inner join favoritos fa on fa.idwhisky = w.idwhisky ' + 
                                ' left join minhaadega a on a.idwhisky = w.idwhisky and a.id_usuarios = ? ' +
                                ' where fa.id_usuarios = ? limit ? offset ? ',
            [idusuario, idusuario, +registros, +offset])
            .then((result) => {
                for(let i=0; i<result.rows.length;i++)
                {
                  this.whiskys.push({idWhisky:result.rows.item(i).idWhisky,
                                    "nomeWhisky":result.rows.item(i).nomeWhisky,
                                    "idade":result.rows.item(i).idade,
                                    "dataCadastro":result.rows.item(i).dataCadastro,
                                    "teroAlcolico":result.rows.item(i).teroAlcolico,
                                    "descricao_olfato":result.rows.item(i).descricao_olfato,
                                    "descricao_paladar":result.rows.item(i).descricao_paladar,
                                    "descricao_finalizacao":result.rows.item(i).descricao_finalizacao,
                                    "idTipoWhisky":result.rows.item(i).idTipoWhisky,
                                    "idFabricante":result.rows.item(i).idFabricante,
                                    "descricao_historica":result.rows.item(i).descricao_historica,
                                    "nacionalidade":result.rows.item(i).nacionalidade,
                                    "imagem":result.rows.item(i).imagem,
                                    "descricao_barril":result.rows.item(i).descricao_barril,
                                    "nomeFabricante":result.rows.item(i).nomeFabricante,
                                    "nomeTipoWhisky":result.rows.item(i).nomeTipoWhisky,
                                    "idfavoritos":result.rows.item(i).idfavoritos,
                                    "idminhaadega":result.rows.item(i).idminhaadega,
                  });
                }
              })
              .catch(e => alert(JSON.stringify(e)));
    
        return this.whiskys;
    }
    
    async buscarTodosPaginadoTotal(): Promise<any>{
    this.totalPaginado = 0;
    await this.db.executeSql('SELECT count(*) as count  FROM whisky w ' +
                    ' inner join fabricante f on f.idFabricante = w.idFabricante ' + 
                    ' inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky ' +
                    ' inner join favoritos fa on fa.idwhisky = w.idwhisky ' + 
                    ' where fa.id_usuarios = ? ',[])
    .then((result) => {
        for(let i=0; i<result.rows.length;i++)
        {
            this.totalPaginado = result.rows.item(i).count;                
        }
        }).catch(e => alert(JSON.stringify(e)));

    return this.totalPaginado ;
    }
}
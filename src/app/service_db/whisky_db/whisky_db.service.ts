import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Whisky } from 'src/app/model/whisky.model';
import { WhiskyPaginado } from 'src/app/model/whiskyPaginado.model';

@Injectable({
  providedIn: 'root'
})

export class WhiskyDataBase {
    db:SQLiteObject;
    whiskys: Whisky[];
    whiskyPaginado: WhiskyPaginado;
    whiskyPesquisaPaginado: WhiskyPaginado;
    cofirmaDeletar: boolean;
    cofirmaAlterar: boolean;
    cofirmaCriar: boolean;
    totalPaginado: number;
    totalPesquisaPaginado: number;

    constructor(private sqlite: SQLite) {}

    async createTable_Whisky(db:SQLiteObject): Promise<void>{
        this.db=db;
        //alert('vai criada table whisky');
        this.db.executeSql(`CREATE TABLE IF NOT EXISTS whisky (
                idWhisky INTEGER PRIMARY KEY AUTOINCREMENT, 
                nomeWhisky VARCHAR(300) NOT NULL, 
                idade VARCHAR(3),
                dataCadastro Date,
                teroAlcolico VARCHAR(45),
                descricao_olfato VARCHAR(1000),
                descricao_paladar VARCHAR(1000),
                descricao_finalizacao VARCHAR(1000),
                idTipoWhisky INTEGER,
                idFabricante INTEGER,
                descricao_historica VARCHAR(1000),
                nacionalidade VARCHAR(100),
                imagem LONGTEXT,
                descricao_barril VARCHAR(1000)
            )`, [])
        .then((result) => {
            //alert('table whisky criada');
        } )
        .catch(e => alert(JSON.stringify(e))); 
        
    }

    async listarWhisky(): Promise<Whisky[]>{
        this.whiskys=[];
        await this.db.executeSql('SELECT *, f.nomeFabricante, t.nomeTipoWhisky FROM whisky w inner join fabricante f on f.idFabricante = w.idFabricante inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky ',[])
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
            });
          }
        })
        .catch(e => alert(JSON.stringify(e)));
    
        return this.whiskys;
    }

    async criarWhisky(whisky: Whisky): Promise<boolean>{
        this.cofirmaCriar = false;
        let query:string=`insert into whisky(
                            nomeWhisky , idade, dataCadastro, teroAlcolico, descricao_olfato, descricao_paladar, descricao_finalizacao, idTipoWhisky, idFabricante, descricao_historica, nacionalidade , imagem , descricao_barril ) 
                            values(?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        await this.db.executeSql(query,[whisky.nomeWhisky , whisky.idade, whisky.dataCadastro, whisky.teroAlcolico, whisky.descricao_olfato, 
                                        whisky.descricao_paladar, whisky.descricao_finalizacao, whisky.idTipoWhisky, whisky.idFabricante, 
                                        whisky.descricao_historica, whisky.nacionalidade , whisky.imagem , whisky.descricao_barril])
        .then(() => {
            //alert('whisky criado')
            this.cofirmaCriar = true;
        })
        .catch(e => {
            alert(JSON.stringify(e));
            this.cofirmaCriar = false;
        });

        return this.cofirmaCriar;
    }

    async alterarWhisky(whisky: Whisky): Promise<boolean>{
        this.cofirmaAlterar = false;

        await this.db.executeSql(`update whisky 
            set nomeWhisky = ? , idade = ? , dataCadastro = ? , teroAlcolico = ? , descricao_olfato = ? 
            , descricao_paladar = ? , descricao_finalizacao = ? , idTipoWhisky = ? , idFabricante = ? 
            , descricao_historica = ? , nacionalidade = ? , imagem = ? , descricao_barril = ?
            where idWhisky = ?`
            ,[whisky.nomeWhisky , whisky.idade, whisky.dataCadastro, whisky.teroAlcolico, whisky.descricao_olfato, 
              whisky.descricao_paladar, whisky.descricao_finalizacao, whisky.idTipoWhisky, whisky.idFabricante, 
              whisky.descricao_historica, whisky.nacionalidade , whisky.imagem , whisky.descricao_barril, whisky.idWhisky])
        .then((result) => {
            //alert('whisky alterado');
            this.cofirmaAlterar = true;
        })
        .catch(e => {
            alert(JSON.stringify(e));
            this.cofirmaAlterar = false;
        });

        return this.cofirmaAlterar;
    }
    
    async deletarWhisky(idWhisky: number ): Promise<boolean>{
        this.cofirmaDeletar = false;

        await this.db.executeSql('delete from whisky where idWhisky = ?',[idWhisky])
            .then((result) => {
                //alert('whisky deletado');
                this.cofirmaDeletar = true;
            })
            .catch(e => {
                alert(JSON.stringify(e));
                this.cofirmaDeletar = false;
            });

        return this.cofirmaDeletar;
    }

    async buscarTodosPaginadoLocal(pageNumber: number, pageSize: number): Promise<any>{
        let page = pageNumber;
        let registros = pageSize;

        this.whiskyPaginado = {};

        const offset = (page - 1) * registros;

        this.whiskyPaginado.data = await this.buscarTodosPaginadoData(registros, offset);

        const totalPageData = await this.buscarTodosPaginadoTotal();

        const totalPage = Math.ceil(+totalPageData / registros);

        this.whiskyPaginado.page = +page;
        this.whiskyPaginado.registros = +registros;
        this.whiskyPaginado.totalPage = totalPage

        return this.whiskyPaginado;
    }

    async buscarTodosPaginadoData(registros: number, offset: number): Promise<Whisky[]>{
        this.whiskys=[];
        await this.db.executeSql('SELECT *, f.nomeFabricante, t.nomeTipoWhisky FROM whisky w inner join fabricante f on f.idFabricante = w.idFabricante inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky limit ? offset ? ',
            [+registros, +offset])
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
                  });
                }
              })
              .catch(e => alert(JSON.stringify(e)));
    
        return this.whiskys;
    }

    async buscarTodosPaginadoTotal(): Promise<any>{
        this.totalPaginado = 0;
        await this.db.executeSql('select count(*) as count from whisky w inner join fabricante f on f.idFabricante = w.idFabricante inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky ',[])
        .then((result) => {
            for(let i=0; i<result.rows.length;i++)
            {
                this.totalPaginado = result.rows.item(i).count;                
            }
            }).catch(e => alert(JSON.stringify(e)));

        return this.totalPaginado ;
    }

    async buscarTodosPesquisaPaginadoLocal(pageNumber: number, pageSize: number, pesquisa: string): Promise<any>{
        let page = pageNumber;
        let registros = pageSize;
        let pesquisar = '%' + pesquisa + '%';

        this.whiskyPesquisaPaginado = {};

        const offset = (page - 1) * registros;

        this.whiskyPesquisaPaginado.data = await this.buscarTodosPesquisaPaginadoData(pesquisar, registros, offset);

        const totalPageData = await this.buscarTodosPesquisaPaginadoTotal(pesquisa);

        const totalPage = Math.ceil(+totalPageData / registros);

        this.whiskyPesquisaPaginado.page = +page;
        this.whiskyPesquisaPaginado.registros = +registros;
        this.whiskyPesquisaPaginado.totalPage = totalPage

        return this.whiskyPesquisaPaginado;
    }

    async buscarTodosPesquisaPaginadoData(pesquisa: string, registros: number, offset: number): Promise<Whisky[]>{
        this.whiskys=[];
        await this.db.executeSql('SELECT *, f.nomeFabricante, t.nomeTipoWhisky FROM whisky w inner join fabricante f on f.idFabricante = w.idFabricante inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky where nomeWhisky like ? limit ? offset ? ',
            [pesquisa, +registros, +offset])
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
                  });
                }
              })
              .catch(e => alert(JSON.stringify(e)));
    
        return this.whiskys;
    }

    async buscarTodosPesquisaPaginadoTotal(pesquisa: string): Promise<any>{
        this.totalPesquisaPaginado = 0;
        await this.db.executeSql('select count(*) as count from whisky w inner join fabricante f on f.idFabricante = w.idFabricante inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky  where nomeWhisky like ? ',[pesquisa])
        .then((result) => {
            for(let i=0; i<result.rows.length;i++)
            {
                this.totalPesquisaPaginado = result.rows.item(i).count;                
            }
            }).catch(e => alert(JSON.stringify(e)));

        return this.totalPesquisaPaginado ;
    }
}
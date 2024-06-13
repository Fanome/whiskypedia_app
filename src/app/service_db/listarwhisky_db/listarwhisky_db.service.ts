import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ListaWhisky } from 'src/app/model/listawhisky.model';
import { Whisky } from 'src/app/model/whisky.model';
import { WhiskyPaginado } from 'src/app/model/whiskyPaginado.model';


@Injectable({
  providedIn: 'root'
})

export class ListarWhiskyDataBase {
    db:SQLiteObject;
    whiskys: ListaWhisky[] = []; 
    whiskyPaginado: WhiskyPaginado;
    whiskyPesquisaPaginado: WhiskyPaginado;
    whiskyOrdenadoPaginado: WhiskyPaginado;
    totalPaginado: number;
    totalPesquisaPaginado: number;
    totalOrdernarPaginado: number;

    cofirma: boolean;

    IdFavorito: number;
    idminhaadega: number;

    constructor(private sqlite: SQLite) {}

    //Não tem tabela. So iniciar o Banco.
    async iniciar_Banco(db:SQLiteObject): Promise<void>{
        this.db=db;   
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
    await this.db.executeSql('SELECT w.*, f.nomeFabricante, t.nomeTipoWhisky, fa.idfavoritos, a.idminhaadega  FROM whisky w ' + 
                        ' inner join fabricante f on f.idFabricante = w.idFabricante ' + 
                        ' inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky ' +
                        ' left join favoritos fa on fa.idwhisky = w.idwhisky and fa.id_usuarios = ? ' + 
                        ' left join minhaadega a on a.idwhisky = w.idwhisky and a.id_usuarios = ? limit ? offset ? ',
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
    await this.db.executeSql('select count(*) as count from whisky w inner join fabricante f on f.idFabricante = w.idFabricante inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky ',[])
    .then((result) => {
        for(let i=0; i<result.rows.length;i++)
        {
            this.totalPaginado = result.rows.item(i).count;                
        }
        }).catch(e => alert(JSON.stringify(e)));

    return this.totalPaginado ;
  }

  async buscarTodosPesquisaPaginadoLocal(id: number, pageNumber: number, pageSize: number, pesquisa: string): Promise<any>{
    let idusuario = id;
    let page = pageNumber;
    let registros = pageSize;
    let pesquisar = '%' + pesquisa + '%';

    this.whiskyPesquisaPaginado = {};

    const offset = (page - 1) * registros;

    this.whiskyPesquisaPaginado.data = await this.buscarTodosPesquisaPaginadoData(idusuario, pesquisar, registros, offset);

    const totalPageData = await this.buscarTodosPesquisaPaginadoTotal(pesquisa);

    const totalPage = Math.ceil(+totalPageData / registros);

    this.whiskyPesquisaPaginado.page = +page;
    this.whiskyPesquisaPaginado.registros = +registros;
    this.whiskyPesquisaPaginado.totalPage = totalPage

    return this.whiskyPesquisaPaginado;
  }

  async buscarTodosPesquisaPaginadoData(idusuario: number, pesquisa: string, registros: number, offset: number): Promise<any>{
    this.whiskys=[];
    await this.db.executeSql('SELECT w.*, f.nomeFabricante, t.nomeTipoWhisky, fa.idfavoritos, a.idminhaadega  FROM whisky w ' + 
                         ' inner join fabricante f on f.idFabricante = w.idFabricante ' + 
                         ' inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky ' +
                         ' left join favoritos fa on fa.idwhisky = w.idwhisky and fa.id_usuarios = ? ' + 
                         ' left join minhaadega a on a.idwhisky = w.idwhisky and a.id_usuarios = ? ' + 
                         ' where nomeWhisky like ? ' +
                         ' limit ? offset ? ',
        [idusuario, idusuario, pesquisa, +registros, +offset])
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

  async buscarTodosPesquisaPaginadoTotal(pesquisa: string): Promise<any>{
    this.totalPesquisaPaginado = 0;
    await this.db.executeSql('select count(*) as count from whisky w inner join fabricante f on f.idFabricante = w.idFabricante inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky  where nomeWhisky like ? ',[pesquisa])
    .then((result) => {
        for(let i=0; i<result.rows.length;i++)
        {
            this.totalPesquisaPaginado = result.rows.item(i).count;                
        }
        }).catch(e => alert(JSON.stringify(e)));

    return this.totalPesquisaPaginado;
  }

  async buscarTodosOrdernarPaginadoLocal(id_usuarios: number, pageNumber: number, pageSize: number, ordenacaoAtiva: string): Promise<any> {
    let id = id_usuarios;
    let page = pageNumber;
    let registros = pageSize;
    let ordenar = ordenacaoAtiva;

    const offset = (page - 1) * registros;

    this.whiskyOrdenadoPaginado = {};

    this.whiskyOrdenadoPaginado.data = await this.buscarOrdenadoPaginado(id, ordenar, registros, offset);

    const totalPageData = await this.buscarOrdenadoPaginadoTotal(ordenar);

    const totalPage = Math.ceil(+totalPageData / registros);

    this.whiskyOrdenadoPaginado.page = +page;
    this.whiskyOrdenadoPaginado.registros = +registros;
    this.whiskyOrdenadoPaginado.totalPage = totalPage

    return this.whiskyOrdenadoPaginado;
  }

  async buscarOrdenadoPaginado(idusuario: number, ordenar: string, registros: number, offset: number): Promise<any>{
    this.whiskys=[];
    let query:string = "";

    if(ordenar == 'Fabricante'){
      query =` SELECT w.*, f.nomeFabricante, t.nomeTipoWhisky, fa.idfavoritos, a.idminhaadega FROM whisky w 
              inner join fabricante f on f.idFabricante = w.idFabricante 
              inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky 
              left join favoritos fa on fa.idwhisky = w.idwhisky and fa.id_usuarios = ?  
              left join minhaadega a on a.idwhisky = w.idwhisky and a.id_usuarios = ? 
              ORDER BY f.nomeFabricante ASC  
              LIMIT ? OFFSET ? `;                      
    }

    if(ordenar == 'Nome A - Z'){

      query =` SELECT w.*, f.nomeFabricante, t.nomeTipoWhisky, fa.idfavoritos, a.idminhaadega FROM whisky w 
                              inner join fabricante f on f.idFabricante = w.idFabricante 
                              inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky 
                              left join favoritos fa on fa.idwhisky = w.idwhisky and fa.id_usuarios = ? 
                              left join minhaadega a on a.idwhisky = w.idwhisky and a.id_usuarios = ? 
                              ORDER BY w.nomeWhisky ASC 
                              limit ? offset ? `;

    }

    if(ordenar == 'Nome Z - A'){

      query =' SELECT w.*, f.nomeFabricante, t.nomeTipoWhisky, fa.idfavoritos, a.idminhaadega  FROM whisky w ' + 
                             ' inner join fabricante f on f.idFabricante = w.idFabricante ' + 
                             ' inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky ' +
                             ' left join favoritos fa on fa.idwhisky = w.idwhisky and fa.id_usuarios = ? ' + 
                             ' left join minhaadega a on a.idwhisky = w.idwhisky and a.id_usuarios = ? ' + 
                             ' ORDER BY w.nomeWhisky DESC ' +
                             ' limit ? offset ? ';
    }

    if(ordenar == 'Data Cadastro'){

      query =' SELECT w.*, f.nomeFabricante, t.nomeTipoWhisky, fa.idfavoritos, a.idminhaadega  FROM whisky w ' + 
                             ' inner join fabricante f on f.idFabricante = w.idFabricante ' + 
                             ' inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky ' +
                             ' left join favoritos fa on fa.idwhisky = w.idwhisky and fa.id_usuarios = ? ' + 
                             ' left join minhaadega a on a.idwhisky = w.idwhisky and a.id_usuarios = ? ' + 
                             ' ORDER BY w.dataCadastro ASC ' +
                             ' limit ? offset ? ';
    }

    await this.db.executeSql(query, [idusuario, idusuario, +registros, +offset])
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
                        "idminhaadega":result.rows.item(i).idminhaadega
          });
        }
      })
      .catch(e => alert(JSON.stringify(e)));
 
    return this.whiskys;
  }

  async buscarOrdenadoPaginadoTotal(ordenar: string): Promise<any>{
    this.totalOrdernarPaginado = 0;
    await this.db.executeSql('select count(*) as count from whisky w inner join fabricante f on f.idFabricante = w.idFabricante inner join tipowhisky t on t.idTipoWhisky = w.idTipoWhisky ',[])
    .then((result) => {
        for(let i=0; i<result.rows.length;i++)
        {
            this.totalOrdernarPaginado = result.rows.item(i).count;                
        }
        }).catch(e => alert(JSON.stringify(e)));

    return this.totalOrdernarPaginado;
  }

  async favoritarLocal(idusuario: number, idwhisky: number): Promise<boolean>{
    this.cofirma = false;
    let query:string=`INSERT INTO favoritos (id_usuarios, idWhisky) VALUES (?,?)`;

    await this.db.executeSql(query,[idusuario, idwhisky])
    .then(() => {
        //alert('whisky favoritado')
        this.cofirma = true;
    })
    .catch(e => {
        alert(JSON.stringify(e));
        this.cofirma = false;
    });

    return this.cofirma;
  }

  async desfavoritarLocal(idusuario: number, idwhisky: number): Promise<boolean>{
    this.cofirma = false;
    let query:string=`DELETE FROM favoritos WHERE id_usuarios = ? and idWhisky = ?`;

    await this.db.executeSql(query,[idusuario, idwhisky])
    .then(() => {
        //alert('whisky desfavoritado')
        this.cofirma = true;
    })
    .catch(e => {
        alert(JSON.stringify(e));
        this.cofirma = false;
    });

    return this.cofirma;
  }

  async buscarfavorito(idusuario: number, idwhisky: number): Promise<any>{
    this.IdFavorito = 0;
    await this.db.executeSql('SELECT idfavoritos FROM favoritos WHERE id_usuarios = ? and idwhisky = ? ',[idusuario, idwhisky])
    .then((result) => {
        for(let i=0; i<result.rows.length;i++)
        {
            this.IdFavorito = result.rows.item(i).idfavoritos;                
        }
        }).catch(e => alert(JSON.stringify(e)));

    return this.IdFavorito;
  }

  async colocarNaMinhaAdega(idusuario: number, idwhisky: number): Promise<boolean>{
    this.cofirma = false;
    let query:string=`INSERT INTO minhaadega (id_usuarios, idwhisky) VALUES (?,?)`;

    await this.db.executeSql(query,[idusuario, idwhisky])
    .then(() => {
        //alert('whisky dentro da adega')
        this.cofirma = true;
    })
    .catch(e => {
        alert(JSON.stringify(e));
        this.cofirma = false;
    });

    return this.cofirma;
  }

  async tirarNaMinhaAdega(idusuario: number, idwhisky: number): Promise<boolean>{
    this.cofirma = false;
    let query:string=`DELETE FROM minhaadega WHERE id_usuarios = ? and idwhisky = ?`;

    await this.db.executeSql(query,[idusuario, idwhisky])
    .then(() => {
        //alert('whisky fora da adega')
        this.cofirma = true;
    })
    .catch(e => {
        alert(JSON.stringify(e));
        this.cofirma = false;
    });

    return this.cofirma;
  }

  async buscarMinhaAdega(idusuario: number, idwhisky: number): Promise<any>{
    this.idminhaadega = 0;
    await this.db.executeSql('SELECT idminhaadega FROM minhaadega WHERE id_usuarios = ? and idwhisky = ? ',[idusuario, idwhisky])
    .then((result) => {
        for(let i=0; i<result.rows.length;i++)
        {
            this.idminhaadega = result.rows.item(i).idminhaadega;                
        }
        }).catch(e => alert(JSON.stringify(e)));

    return this.idminhaadega;
  }
}
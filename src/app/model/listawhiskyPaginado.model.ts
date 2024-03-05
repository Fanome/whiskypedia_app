import { ListaWhisky } from './listawhisky.model';

export interface ListaWhiskyPaginado {
    page?: number,
    registros?: number,
    totalPage?: number,
    data?: ListaWhisky[]
  }
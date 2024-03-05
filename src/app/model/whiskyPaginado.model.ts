import { Whisky } from '../model/whisky.model';

export interface WhiskyPaginado {
    page?: number,
    registros?: number,
    totalPage?: number,
    data?: Whisky[]
  }
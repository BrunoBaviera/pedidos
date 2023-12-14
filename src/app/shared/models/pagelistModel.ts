export interface PageListModel<T> {
  success: boolean;
  data : {
    paginaAtual: number;
    tamanhoPagina: number;
    totalRegistros: number;
    itens: T[];
  }
}

import { Injectable } from "@angular/core";
import { BaseService, PaginationQuery } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Produto } from "../models/produto";
import { Observable, Subject, catchError, map } from "rxjs";
import { PageListModel } from "../models/pagelistModel";
import { Pedido } from "../models/pedido";

@Injectable()
export class ProdutoService extends BaseService {

  private eventCart = new Subject<Pedido>();

  constructor(private http: HttpClient) { super({ endpoint: 'Produto'}) }

  public getProdutos(paginationQuery: PaginationQuery): Observable<PageListModel<Produto>> {
    return this.http.get<PageListModel<Produto>>(
      this.UrlServiceV1 +
      '?NumeroPagina=' + paginationQuery.numeroPagina +
      '&TamanhoPagina=' + paginationQuery.tamanhoPagina
  )}

  public addProduto(produto: Produto): Observable<Produto> {
    return this.http
        .post(this.UrlServiceV1, produto, super.ObterHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }

  public atualizarProduto(produto: Produto): Observable<Produto> {
    return this.http
        .put(this.UrlServiceV1 + "/" + produto.id, produto, super.ObterHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }

  public removeProduto(id: string): Observable<void> {
    return this.http
        .delete(this.UrlServiceV1 + '/' + id, super.ObterHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }

  public setCart(pedido: Pedido) {
    this.eventCart.next(pedido);
  }

  public getCart() {
    return this.eventCart.asObservable();
  }

}

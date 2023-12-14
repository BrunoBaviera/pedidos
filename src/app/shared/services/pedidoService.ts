import { Injectable } from "@angular/core";
import { BaseService, PaginationQuery } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, map } from "rxjs";
import { Pedido } from "../models/pedido";
import { PageListModel } from "../models/pagelistModel";

@Injectable()
export class PedidoService extends BaseService {

  constructor(private http: HttpClient) { super({ endpoint: 'Pedido'}) }

  public getPedidos(paginationQuery: PaginationQuery): Observable<PageListModel<Pedido>> {
    return this.http.get<PageListModel<Pedido>>(
      this.UrlServiceV1 +
      '?NumeroPagina=' + paginationQuery.numeroPagina +
      '&TamanhoPagina=' + paginationQuery.tamanhoPagina
  )}

  public getPedidoById(id: string): Observable<Pedido> {
    return this.http
        .get<Pedido>(this.UrlServiceV1 + "/" + id, super.ObterHeaderJson())
        .pipe(catchError(super.serviceError));
  }

  public addPedido(pedido: Pedido): Observable<Pedido> {
    return this.http
        .post(this.UrlServiceV1, pedido, super.ObterHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }

  public atualizarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http
        .put(this.UrlServiceV1 + "/" + pedido.id, pedido, super.ObterHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }

  public removePedido(id: string): Observable<void> {
    return this.http
        .delete(this.UrlServiceV1 + '/' + id, super.ObterHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
  }

}

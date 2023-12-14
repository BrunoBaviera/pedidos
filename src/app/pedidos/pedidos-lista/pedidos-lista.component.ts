import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ItensPedido } from 'src/app/shared/models/itensPedido';
import { Pedido } from 'src/app/shared/models/pedido';
import { PedidoService } from 'src/app/shared/services/pedidoService';
import { PedidosEdicaoComponent } from '../pedidos-edicao/pedidos-edicao.component';

@Component({
  selector: 'app-pedidos-lista',
  templateUrl: './pedidos-lista.component.html',
  styleUrls: ['./pedidos-lista.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PedidosListaComponent implements OnInit{

  protected dataSource = new MatTableDataSource<Pedido>();
  protected columnsToDisplay = ['nomeCliente', 'emailCliente', 'pago', 'valorTotal', 'acao'];
  protected columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  protected expandedElement: ItensPedido | null;

  protected paginaAtual: number = 0;
  protected tamanhoPagina: number = 12;
  protected totalRegistros: number = 0;
  protected pedidos: Pedido[] = [];

  constructor(
    private pedidoService: PedidoService,
    public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.getPedidos();
  }

  private getPedidos() {
    this.pedidoService.getPedidos({numeroPagina: this.paginaAtual, tamanhoPagina: this.tamanhoPagina})
    .subscribe(
      {
        next: (response) => {
          this.tamanhoPagina = response.data.tamanhoPagina;
          this.totalRegistros = response.data.totalRegistros;
          this.dataSource.data = response.data.itens;
        },
        error: (error) => { console.error(error)}
      }
    );
  }

  protected handlePageEvent(e: PageEvent) {
    this.paginaAtual = e.pageIndex;

    this.getPedidos();
  }

  protected openDialogEdicao(event: Event, pedido: Pedido) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PedidosEdicaoComponent, {
      minWidth: '500px',
      maxWidth: '1024px',
      data: pedido
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPedidos();
    });
  }

  protected remover(event: Event, pedido: Pedido) {
    event.stopPropagation();

    this.pedidoService.removePedido(pedido.id!)
    .subscribe(
      {
        next: () => {
          this.getPedidos();
        },
        error: (error) => { console.error(error)}
      }
    );
  }
}


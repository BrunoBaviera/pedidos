import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Produto } from 'src/app/shared/models/produto';
import { ProdutoService } from 'src/app/shared/services/produtoService';
import { ProdutosNovoComponent } from '../produtos-novo/produtos-novo.component';
import { ProdutosEdicaoComponent } from '../produtos-edicao/produtos-edicao.component';

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.scss']
})
export class ProdutosListaComponent implements OnInit{

  protected dataSource = new MatTableDataSource<Produto>();
  protected displayedColumns: string[] = ['nome', 'valor', 'acao'];

  protected paginaAtual: number = 0;
  protected tamanhoPagina: number = 12;
  protected totalRegistros: number = 0;
  protected pedidos: Produto[] = [];
  protected errors: any[] = [];

  constructor(
    private produtoService: ProdutoService,
    public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.getProdutos();
  }

  private getProdutos() {
    this.produtoService.getProdutos({numeroPagina: this.paginaAtual, tamanhoPagina: this.tamanhoPagina})
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

    this.getProdutos();
  }

  protected openDialog() {
    const dialogRef = this.dialog.open(ProdutosNovoComponent, {
      minWidth: '500px',
      maxWidth: '1024px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProdutos();
    });
  }

  protected openDialogEdicao(produto: Produto) {
    const dialogRef = this.dialog.open(ProdutosEdicaoComponent, {
      minWidth: '500px',
      maxWidth: '1024px',
      data: produto
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProdutos();
    });
  }

  protected remover(produto: Produto) {

    this.produtoService.removeProduto(produto.id!)
    .subscribe(
      {
        next: () => {
          this.errors = [];
          this.getProdutos();
        },
        error: (error) => { this.processarFalha(error)}
      }
    );
  }

  private processarFalha(fail: any) {
    this.errors = fail.error.errors;
  }

}

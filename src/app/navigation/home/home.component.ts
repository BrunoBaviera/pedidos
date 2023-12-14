import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/shared/services/produtoService';
import { Produto } from 'src/app/shared/models/produto';
import { PageEvent } from '@angular/material/paginator';
import { Pedido } from 'src/app/shared/models/pedido';
import { ItensPedido } from 'src/app/shared/models/itensPedido';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  protected paginaAtual: number = 0;
  protected tamanhoPagina: number = 12;
  protected totalRegistros: number = 0;
  protected produtos: Produto[] = [];
  protected pedido: Pedido;

  protected listProdutosAdd: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  public ngOnInit(): void {
    this.pedido = {
      nomeCliente: "Bruno",
      emailCliente: "bruno10_1997@hotmail.com",
      pago: false,
      itensPedido: []
    }

    this.getProdutos();
  }

  private getProdutos() {
      this.produtoService.getProdutos({numeroPagina: this.paginaAtual, tamanhoPagina: this.tamanhoPagina})
      .subscribe(
        {
          next: (response) => {
            this.tamanhoPagina = response.data.tamanhoPagina;
            this.totalRegistros = response.data.totalRegistros;
            this.produtos = response.data.itens;
          },
          error: (error) => { console.error(error)}
        }
      );
  }

  protected handlePageEvent(e: PageEvent) {
    this.paginaAtual = e.pageIndex;
    this.getProdutos();
  }

  protected addCart(produto: Produto){

    this.addItems(produto);

    this.listProdutosAdd.push(produto)
    this.produtoService.setCart(this.pedido);
  }

  private addItems(produto: Produto){

    const lProduto = this.pedido?.itensPedido?.find(x => x.idProduto == produto.id);

    if (lProduto) {
      lProduto.quantidade += 1;
    }
    else {
      const itemPedido: ItensPedido = {
        quantidade: 1,
        idProduto: produto.id!,
        produto: produto
      };

      this.pedido.itensPedido.push(itemPedido);
    }

  }

}

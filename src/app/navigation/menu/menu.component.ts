import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from 'src/app/shared/services/produtoService';
import { CartComponent } from '../cart/cart.component';
import { Pedido } from 'src/app/shared/models/pedido';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  protected isCollapsed: boolean;
  protected qtdeProdutos: number = 0;
  protected pedido: Pedido;

  constructor(
    private produtoService: ProdutoService,
    public dialog: MatDialog) {
    this.isCollapsed = true;
  }

  public ngOnInit() {
    this.produtoService.getCart().subscribe((pedido: Pedido) => {
      this.pedido = pedido;
      this.qtdeProdutos = pedido.itensPedido.reduce((accumulator, { quantidade }) => accumulator + quantidade, 0);
    });
  }

  protected openDialog() {
    const dialogRef = this.dialog.open(CartComponent, {
      minWidth: '500px',
      maxWidth: '1024px',
      data: this.pedido,
    });
  }
}

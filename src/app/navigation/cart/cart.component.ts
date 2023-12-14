import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ItensPedido } from 'src/app/shared/models/itensPedido';
import { Pedido } from 'src/app/shared/models/pedido';
import { PedidoService } from 'src/app/shared/services/pedidoService';
import { ProdutoService } from 'src/app/shared/services/produtoService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(
    private produtoService: ProdutoService,
    private pedidoService: PedidoService,
    private router: Router,
    public dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public pedido: Pedido | null) {}


  protected removeCart(itemPedido: ItensPedido){
    if (itemPedido.quantidade > 1){
      this.pedido!.itensPedido.filter(x => x.idProduto == itemPedido.idProduto).map(y => y.quantidade -= 1);
    }
    else {
      const index = this.pedido!.itensPedido.findIndex(x => x.idProduto == itemPedido.idProduto);
      this.pedido!.itensPedido.splice(index, 1);
    }

    this.produtoService.setCart(this.pedido!);
  }

  protected addCart(itemPedido: ItensPedido){
    this.pedido!.itensPedido.filter(x => x.idProduto == itemPedido.idProduto).map(y => y.quantidade += 1);
    this.produtoService.setCart(this.pedido!);
  }

  protected send(){
    this.pedidoService.addPedido(this.pedido!)
    .subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/pedidos/listar-todos']);
       },
      error: (error) => { console.error(error) }
    });
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';

const pedidosRouterConfig: Routes = [
  { path: 'listar-todos', component: PedidosListaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(pedidosRouterConfig)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';

const produtosRouterConfig: Routes = [
  { path: 'listar-todos', component: ProdutosListaComponent },
  //{ path: 'editar/:id', component: PedidosEdicaoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(produtosRouterConfig)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }

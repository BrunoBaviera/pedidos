import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navigation/home/home.component';
import { CartComponent } from './navigation/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module')
      .then(m => m.PedidosModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./produtos/produtos.module')
      .then(m => m.ProdutosModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

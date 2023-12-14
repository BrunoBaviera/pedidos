import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { PedidosEdicaoComponent } from './pedidos-edicao/pedidos-edicao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PedidosListaComponent,
    PedidosEdicaoComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PedidosModule { }

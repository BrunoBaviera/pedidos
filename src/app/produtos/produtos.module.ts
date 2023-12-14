import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProdutosNovoComponent } from './produtos-novo/produtos-novo.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { ProdutosEdicaoComponent } from './produtos-edicao/produtos-edicao.component';


@NgModule({
  declarations: [
    ProdutosListaComponent,
    ProdutosNovoComponent,
    ProdutosEdicaoComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule
  ]
})
export class ProdutosModule { }

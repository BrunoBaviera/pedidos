import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { ProdutoService } from './services/produtoService';
import { PedidoService } from './services/pedidoService';
import { HttpClientModule } from '@angular/common/http';
import { FormatNumberDirective } from './directives/formatNumberDirective';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';


@NgModule({
  declarations: [
    ContainerComponent,
    FieldErrorDisplayComponent,
    FormatNumberDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerComponent,
    FieldErrorDisplayComponent,
    HttpClientModule,
    FormatNumberDirective
  ],
  providers: [
    ProdutoService,
    PedidoService
  ]
})
export class SharedModule { }

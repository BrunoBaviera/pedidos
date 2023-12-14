import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pedido } from 'src/app/shared/models/pedido';
import { PedidoService } from 'src/app/shared/services/pedidoService';

@Component({
  selector: 'app-pedidos-edicao',
  templateUrl: './pedidos-edicao.component.html',
  styleUrls: ['./pedidos-edicao.component.scss']
})
export class PedidosEdicaoComponent implements OnInit {

  protected formPedido: FormGroup;
  protected errors: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private changeDetector: ChangeDetectorRef,
    public dialogRef: MatDialogRef<PedidosEdicaoComponent>,
    @Inject(MAT_DIALOG_DATA) public pedido: Pedido | null
  ) { }

  public ngOnInit(): void {
    this.buildForm();
    this.setForm();
  }

  public ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  private buildForm() {
    this.formPedido = this.formBuilder.group({
      nomeCliente: [''],
      emailCliente: [''],
      pago: [],
    });
  }

  private setForm() {
    this.formPedido.patchValue({
      nomeCliente: this.pedido.nomeCliente,
      emailCliente: this.pedido.emailCliente,
      pago: this.pedido.pago,
    });
  }

  protected editarPedido(){
    if (this.formPedido.dirty && this.formPedido.valid) {
      this.pedido = Object.assign({}, this.pedido, this.formPedido.value);

      this.pedidoService.atualizarPedido(this.pedido)
      .subscribe({
        next: () => {
          this.fecharDialog();
        },
        error: (error) => { this.processarFalha(error) }
      });

    }
  }

  private processarFalha(fail: any) {
    this.errors = fail.error.errors;
  }

  protected fecharDialog(){
    this.dialogRef.close();
  }

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { Produto } from 'src/app/shared/models/produto';
import { ProdutoService } from 'src/app/shared/services/produtoService';
import { CurrencyUtils } from 'src/app/shared/utils.ts/currency-utils';

@Component({
  selector: 'app-produtos-novo',
  templateUrl: './produtos-novo.component.html',
  styleUrls: ['./produtos-novo.component.scss']
})
export class ProdutosNovoComponent extends FormBaseComponent implements OnInit {

  protected formProduto: FormGroup;
  protected produto: Produto;
  protected errors: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private changeDetector: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ProdutosNovoComponent>
  ) {

    super();

    this.validationMessages = {
      nomeProduto: {
        required: 'O nome é obrigatório',
        minlength: 'Mínimo de 3 caracteres',
        maxlength: 'Máximo de 20 caracteres'
      },
      valor: {
        required: 'O valor é obrigatório',
        min: 'O valor deve ser maior que 0,00',
        maxlength: 'O valor é muito alto'
       },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  private buildForm() {
    this.formProduto = this.formBuilder.group({
      nomeProduto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      valor: ['', [Validators.required, Validators.min(1), Validators.maxLength(12)]],
    });
  }

  protected addProduto() {
    if (this.formProduto.dirty && this.formProduto.valid) {
      this.produto = Object.assign({}, this.produto, this.formProduto.value);
      this.produto.valor = CurrencyUtils.StringParaDecimal(this.produto.valor);

      this.produtoService.addProduto(this.produto)
      .subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: (error) => { this.processarFalha(error) }
      });

    }
  }

  private processarFalha(fail: any) {
    this.errors = fail.error.errors;
  }
}

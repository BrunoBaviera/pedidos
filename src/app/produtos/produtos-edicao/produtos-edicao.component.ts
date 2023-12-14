import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { Produto } from 'src/app/shared/models/produto';
import { ProdutoService } from 'src/app/shared/services/produtoService';
import { CurrencyUtils } from 'src/app/shared/utils.ts/currency-utils';

@Component({
  selector: 'app-produtos-edicao',
  templateUrl: './produtos-edicao.component.html',
  styleUrls: ['./produtos-edicao.component.scss']
})
export class ProdutosEdicaoComponent extends FormBaseComponent implements OnInit {

  protected formProduto: FormGroup;
  protected errors: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private changeDetector: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ProdutosEdicaoComponent>,
    @Inject(MAT_DIALOG_DATA) public produto: Produto | null
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
    this.setForm();
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

  private setForm() {
    this.formProduto.patchValue({
      nomeProduto: this.produto.nomeProduto,
      valor: CurrencyUtils.DecimalParaString(this.produto.valor)
    });
  }

  protected editarProduto(){
    if (this.formProduto.dirty && this.formProduto.valid) {
      this.produto = Object.assign({}, this.produto, this.formProduto.value);
      this.produto.valor = CurrencyUtils.StringParaDecimal(this.produto.valor);

      this.produtoService.atualizarProduto(this.produto)
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

import { FormGroup } from '@angular/forms';

import { DisplayMessage, GenericValidator, ValidationMessages } from '../shared/utils.ts/generic-form-validation';

export abstract class FormBaseComponent  {

    displayMessage: DisplayMessage = {};
    genericValidator: GenericValidator;
    validationMessages: ValidationMessages;

    protected configurarMensagensValidacaoBase(validationMessages: ValidationMessages) {
        this.genericValidator = new GenericValidator(validationMessages);
    }

    public isFieldValid(field: string, formGroup: FormGroup) {
      this.validarFormulario(formGroup)
      return (!formGroup.get(field)?.valid && formGroup.get(field)?.touched) ||
    (formGroup.get(field)?.untouched);
    }

    protected validarFormulario(formGroup: FormGroup) {
      this.displayMessage = this.genericValidator.processarMensagens(formGroup);
    }

}

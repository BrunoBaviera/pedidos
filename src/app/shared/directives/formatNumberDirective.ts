import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appFormatNumber]'
})
export class FormatNumberDirective {

  @Input() decimalLimit: number = 2; // Limite padrão de casas decimais

  @Input() addZeros: boolean = true; // Se true, adiciona zeros à parte decimal

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove vírgula inicial, se presente
    if (value.startsWith(',')) {
      value = value.substring(1);
    }

    // Remove zeros à esquerda, exceto se for um número decimal entre 0 e 1
    value = value.replace(/^0+(?!\.|$)/, '');

    // Remove tudo, exceto dígitos, vírgulas e o primeiro ponto (para permitir decimais)
    value = value.replace(/[^\d,]|^\.|(?<=\.\d*)\./g, '');

    // Se houver mais de uma vírgula, mantém somente a primeira
    if (value.indexOf(',') !== value.lastIndexOf(',')) {
      value = value.slice(0, value.lastIndexOf(',')) + value.slice(value.lastIndexOf(',') + 1);
    }

    // Limita o número de casas decimais
    const parts = value.split(',');
    if (parts[1] && parts[1].length > this.decimalLimit) {
      parts[1] = parts[1].slice(0, this.decimalLimit);
    }

    // Formatação para usar ponto como separador de milhares e vírgula como separador decimal
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    value = parts.join(',');

    if (input.value !== value) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Verifica se há números antes da vírgula decimal
    const beforeDecimal = value.split(',')[0];
    if (beforeDecimal !== '') {

      // Adiciona ",00" se houver número antes da vírgula decimal
      if (!value.includes(',')) {
        if (this.addZeros) {
          value += ',00';
        }
      } else {
        const decimalPart = value.split(',')[1];
        if (!decimalPart || decimalPart.length === 0) {
          if (this.addZeros) {
            value += '00';
          }
        } else if (decimalPart.length === 1) {
          if (this.addZeros) {
            value += '0';
          }
        }
      }
    }

    input.value = value;
  }
}

import { ModelBase } from "./modelBase";

export interface Produto extends ModelBase {
  nomeProduto: string;
  valor: number;
}

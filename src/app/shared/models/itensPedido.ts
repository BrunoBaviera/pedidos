import { ModelBase } from "./modelBase";
import { Produto } from "./produto";

export interface ItensPedido extends ModelBase {
  idPedido?: string;
  idProduto: string;
  quantidade: number;
  nomeProduto?: string;
  valorUnitario?: number;
  produto: Produto;
}

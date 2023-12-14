import { ItensPedido } from "./itensPedido";
import { ModelBase } from "./modelBase";

export interface Pedido extends ModelBase {
  nomeCliente: string;
  emailCliente: string;
  dataCriacao?: Date;
  pago: boolean;
  valorTotal?: number;
  itensPedido: ItensPedido[];
}

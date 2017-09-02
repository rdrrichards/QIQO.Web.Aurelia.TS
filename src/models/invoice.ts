import { IAccount } from './account';
import { IProduct } from './product';
import { IAddress } from './address';

export interface IInvoice {
  invoiceKey: number;
  invoiceNumber: string;
  invoiceEntryDate: Date;
  invoiceStatusDate: Date;
  invoiceStatus: string;
  invoiceCompleteDate?: Date;
  invoiceShipDate?: Date;
  invoiceDeliverByDate?: Date;
  invoiceItemCount: number;
  invoiceValueSum: number;
  account: IAccount;
  invoiceItems?: IInvoiceItem[];
  salesRepName: string;
  accountRepName: string;
  accountContactName: string;
  accountCode: string;
}

export interface IInvoiceItem {
  invoiceItemKey: number;
  invoiceKey: number;
  invoiceItemSeq: number;
  productKey: number;
  productCode: string;
  productName: string;
  productDesc: string;
  product: IProduct;
  quantity: number;
  invoiceItemPrice: number;
  invoiceLineTotal: number;
  invoiceItemShipAddress: IAddress;
  invoiceItemBillAddress: IAddress;
  invoiceItemStatus: string;
  salesRepName: string;
  accountRepName: string;
}

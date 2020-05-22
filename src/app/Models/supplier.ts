export class supplierClass{
    supplierName:string;
    supplierAddress:string;
    supplierMobNum1:string;
    supplierEmail:string;
    supplierMobNum2:string;
}
export interface mySupplierResult{
    success:boolean;
    data:supplierClass[];
}
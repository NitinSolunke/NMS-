export class AssetClass{
    id: number;
    companyName: string;
    supplierName: string;
    tagNumber: string;
    model: string;
    purchaseCost: string;
    warranty: number;
    assetType: string;
    serialNumber: string;
    configuration:string;
    description:any;
    assetStatus:string;
    assetTypeName:string;
    companyId:number;
    supplierId:number;
    assetTypeId:number;
    userId:number;
    assetCondition:string;
    assetDescription:string;
}
export interface MyAssetResult{
    success:boolean;
    data:AssetClass[];
}
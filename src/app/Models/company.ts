export class companyClass{
    companyName:string;
    companyLocation:string;
}
export interface myCompanyResult{
    success:boolean;
    data:companyClass[];
}
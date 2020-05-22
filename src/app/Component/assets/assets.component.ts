import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetClass, MyAssetResult } from 'src/app/Models/asset';
import { companyClass, myCompanyResult } from 'src/app/Models/company';
import { supplierClass, mySupplierResult } from 'src/app/Models/supplier';

import { timer } from 'rxjs';
import { ApiCallServiceService } from 'src/app/Services/api-call-service.service';
import { ApiUrlsServiceService } from 'src/app/Services/api-urls-service.service';
import { ThrowStmt } from '@angular/compiler';
import { ifError } from 'assert';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {
  showPopUpValue: boolean;
  showupdateButton: boolean;
  showAssignButton: boolean;
  AssetClass: AssetClass = new AssetClass();
  MyAssetResult: MyAssetResult;
  companyClass: companyClass = new companyClass();
  myCompanyResult: myCompanyResult;
  supplierClass:supplierClass=new supplierClass();
  mySupplierResult:mySupplierResult;
  allContents: any = [];
  company: any = [];
  assetType: any = [];
  suppliers: any = [];
  users: any = [];
  ViewContentById: any = [];
  updateId: any;
  disableField: boolean;
  showSaveButton: boolean;
  showPopUpView: boolean;
  p: number = 1;
  itemsPerPage = 6;
  searchText: any;
  assignId: any;
  showCompanyPopUpValue: boolean;
  showSupplierPopUpValue:boolean;
  showMessage: boolean;
  showSupplierMessage: boolean;
  constructor(private ngxService: NgxUiLoaderService, private toastr: ToastrService, private http: HttpClient, private api: ApiCallServiceService, private apiUrl: ApiUrlsServiceService) { }

  async ngOnInit() {
    this.ngxService.start()
    this.api.get(await this.apiUrl.getUrl('asset')).subscribe((res: any) => {
      if (res.status == 200) {
        this.ngxService.stop()
        this.allContents = res.response;
      }
      else {
        this.ngxService.stop()

      }
    });
   this.getCompanyAndSupplier()
    this.api.get(await this.apiUrl.getUrl('assetType')).subscribe((res: any) => {
      this.assetType = res.response
    });  
    this.api.get(await this.apiUrl.getUrl('users')).subscribe((res: any) => {
      this.users = res.response;
    });
  }
 async getCompanyAndSupplier(){
    this.api.get(await this.apiUrl.getUrl('company')).subscribe((res: any) => {
      this.company = res.response
    });

    this.api.get(await this.apiUrl.getUrl('supplier')).subscribe((res: any) => {
      this.suppliers = res.response
    });
  }
  showPopUp() {
    this.showPopUpValue = true;
    this.disableField = false;
    this.showSaveButton = true;
    this.showupdateButton = false;
    this.showAssignButton = false;
    this.cleanObject();
  }
  companyPopUp() {
    this.showCompanyPopUpValue = true;
    this.showMessage=false;
  }
  supplierPopUp(){
    this.showSupplierPopUpValue = true;
    this.showSupplierMessage=false;

  }
  closeCompanyPopUp() {
    this.showCompanyPopUpValue = false;

  }
  closeSupplierPopUp(){
    this.showSupplierPopUpValue = false;

  }
  closePopUp() {
    this.showPopUpValue = false;
    this.showPopUpView = false;
    this.cleanObject();

  }
  async saveContent() {
    console.log(this.AssetClass);
    this.api.post<MyAssetResult>(await this.apiUrl.getUrl('assetContent'), this.AssetClass).subscribe((res: any) => {
      if (res.status == 200) {
        this.toastr.success(res.Message)
        this.ngOnInit();
        this.showPopUpValue = false;
        this.cleanObject();
      }
      else {
        this.toastr.error('Something went wrong')
        this.showPopUpValue = false
        this.cleanObject();
      }
    })

  }
  async getContentById(id) {
    this.updateId = id
    this.showPopUpValue = true;
    this.disableField = false;
    this.showupdateButton = true;
    this.showSaveButton = false;
    this.showAssignButton = false;
    this.api.get(await this.apiUrl.getUrl('asset') + '/' + id).subscribe((res: any) => {
      this.AssetClass = res.response[0];
    })
  }
  updateContent() {
    // this.http.put(this.baseUrl + '' + this.updateId, this.AssetClass).subscribe((res: any) => {
    //   this.ngOnInit();
    //   this.showPopUpValue = false
    // })
  }
  async deleteContent(id) {
    let value = confirm("Do you really want to delete this record ?")
    if (value) {
      this.api.delete(await this.apiUrl.getUrl('DeleteAssetById') + '/' + id).subscribe((res: any) => {
        if(res.status==200){
          this.ngOnInit();
          this.toastr.error(res.Message);
        }
        else if(res.status==400){
          this.toastr.error(" This asset is already assigned to user","Cannot delete this record")
        }
      });
    }
  }

  async viewGetById(id) {
    this.showPopUpView = true;
    this.api.get(await this.apiUrl.getUrl('asset') + '/' + id).subscribe((res: any) => {
      this.ViewContentById = res.response[0];
      console.log(res);

    })
  }

  async assignAsset(id, status) {
    this.assignId = id
    if (status == 'pending') {
      this.showAssignButton = true;
      this.showupdateButton = false;
      this.showSaveButton = false;
      this.disableField = true;
      this.showPopUpValue = true;
      this.api.get(await this.apiUrl.getUrl('asset') + '/' + id).subscribe((res: any) => {
        this.AssetClass = res.response[0];
      });
    }
    else {
      this.toastr.error("This asset already assigned to the user", "Sorry!")
    }

  }
  async SaveAssignAsset() {
    console.log(this.AssetClass);
    this.api.post<MyAssetResult>(await this.apiUrl.getUrl('userAsset'), this.AssetClass).subscribe(async (res: any) => {

      if (res.status == 200) {
        this.toastr.success(res.Message);
        this.showPopUpValue = false;
        this.api.get(await this.apiUrl.getUrl('changeStatus') + '/' + this.assignId).subscribe((res: any) => {
          this.ngOnInit();

        })


      }
      this.cleanObject();
    })
  }
  cleanObject() {
    this.AssetClass.id = null;
    this.AssetClass.companyName = '';
    this.AssetClass.supplierName = '';
    this.AssetClass.tagNumber = '';
    this.AssetClass.model = '';
    this.AssetClass.purchaseCost = '';
    this.AssetClass.warranty = null;
    this.AssetClass.assetTypeName = '';
    this.AssetClass.serialNumber = '';
    this.AssetClass.configuration = '';
    this.AssetClass.assetCondition = '';
    this.AssetClass.assetDescription = '';
    this.AssetClass.companyId = null;
    this.AssetClass.supplierId = null;
    this.AssetClass.assetTypeId = null;
    this.companyClass.companyName = '';
     this.companyClass.companyLocation='';
     this.supplierClass.supplierAddress='';
     this.supplierClass.supplierEmail='';
     this.supplierClass.supplierMobNum1='';
     this.supplierClass.supplierName='';

  }

  sortConfig = {
    orderBy: -1,
    columnName: 'id',
    columnType: 'num',
    customLogic: undefined
  }
  sortData(columnName, columnType) {
    this.sortConfig.orderBy = this.sortConfig.orderBy * -1;
    this.sortConfig.columnName = columnName;
    this.sortConfig.columnType = columnType;
    // let orderBy = this.orderBy;
    //alert("I am in sortData " + columnName);


    //if (columnName == 'id') {
    //  this.userList.sort(function (e1, e2) {
    //    return e1.id > e2.id ? 1 * orderBy : -1 * orderBy;
    //  })
    //}
    //else if(columnName =='firstName') {
    //  this.userList.sort(function (e1, e2) {
    //    return e1.firstName > e2.firstName ? 1 * orderBy : -1 * orderBy;
    //  })
    //}
    //else if (columnName == 'lastName') {
    //  this.userList.sort(function (e1, e2) {
    //    return e1.lastName > e2.lastName ? 1 * orderBy : -1 * orderBy;
    //  })
    //}
  }

  async filterValue(value) {
    console.log("value", value);
    let x: any = [];
    if (value == "pending") {
      console.log("IF", value);
      x = this.allContents.filter(s => s.assetStatus == 'pending');
      this.allContents = x;
    }
    else if (value == "deployed") {
      console.log("else IF", value);
      x = this.allContents.filter(t => t.assetStatus == 'deployed');
      this.allContents = x;
    }
    else {
      this.ngOnInit();
    }
  }

  /*----------------------------company And Supplier Part------------------------------------*/

 async save() {   
    this.api.post<myCompanyResult>(await this.apiUrl.getUrl('companyContent'), this.companyClass).subscribe((res: any) => {
      if (res.status == 200) {
        this.showMessage=true;
        this.cleanObject();
        this.getCompanyAndSupplier();
      }
      else {
        this.toastr.error('Something went wrong')
        this.showCompanyPopUpValue = false
        this.cleanObject();
      }
    })

  }
 async saveSupplier(){
    this.api.post<myCompanyResult>(await this.apiUrl.getUrl('supplierContent'), this.supplierClass).subscribe((res: any) => {
      if (res.status == 200) {
        this.showSupplierMessage=true;
        this.cleanObject();
        this.getCompanyAndSupplier();
      }
      else {
        this.toastr.error('Something went wrong')
        this.cleanObject();
      }
    })
  }


}

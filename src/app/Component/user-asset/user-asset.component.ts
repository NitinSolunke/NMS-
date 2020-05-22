import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usersClass, MyUserResult } from 'src/app/Models/users';
import { timer } from 'rxjs';
import { ApiCallServiceService } from 'src/app/Services/api-call-service.service';
import { ApiUrlsServiceService } from 'src/app/Services/api-urls-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-asset',
  templateUrl: './user-asset.component.html',
  styleUrls: ['./user-asset.component.css']
})
export class UserAssetComponent implements OnInit {
  searchText: any;
  allContents: any = [];
  p: number = 1;
  itemsPerPage = 6;
  showPopUpValue: boolean;
  showupdateButton: boolean;
  showAssignButton: boolean;
  company: any = [];
  assetType: any = [];
  suppliers: any = [];
  users:any=[];
  ViewContentById: any = [];
  updateId: any;
  disableField: boolean;
  showSaveButton: boolean;
  showPopUpView: boolean;
  assetId: any;
  constructor(private toastr: ToastrService,private http: HttpClient, private api: ApiCallServiceService, private apiUrl: ApiUrlsServiceService) { }

 async ngOnInit() {
      this.api.get(await this.apiUrl.getUrl('getUserAsset')).subscribe((res:any)=>{
      console.log("getUserAsset",res);      
     this.allContents=res.response;

    })
  }
  showPopUp() {
    this.showPopUpValue = true;
    this.disableField = false;
    this.showSaveButton = true;
    this.showupdateButton = false;
    this.showAssignButton = false;
  }
  closePopUp() {
    this.showPopUpValue = false;
    this.showPopUpView = false;

  }
  // async viewGetById(id) {
  //   this.showPopUpView = true;
  //   this.api.get(await this.apiUrl.getUrl('userAsset') + '/' + id).subscribe((res: any) => {
  //     this.ViewContentById = res.response[0];
  //     console.log(res);
      
  //   })
  // }
  async deleteContent(id,assetId) {
    this.assetId=assetId
    let value = confirm("Do you really want to delete this record ?")
    if (value) {
      this.api.delete(await this.apiUrl.getUrl('DeleteUserAssetById') + '/' + id).subscribe(async (res: any) => {
   if(res.status==200){
     this.toastr.error(res.Message);
     this.ngOnInit();
     this.showPopUpValue = false;
     this.api.get(await this.apiUrl.getUrl('AssetUpdate')+ '/' +this.assetId).subscribe((res:any)=>{
    
})
}
else{
  this.toastr.error("Something went wrong!");
  this.ngOnInit();
}
      });
    }
  }
}

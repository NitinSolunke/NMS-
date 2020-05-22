import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usersClass, MyUserResult } from 'src/app/Models/users';
import { timer } from 'rxjs';
import { ApiCallServiceService } from 'src/app/Services/api-call-service.service';
import { ApiUrlsServiceService } from 'src/app/Services/api-urls-service.service';
import { ThrowStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {


  showPopUpValue: boolean;
  showupdateButton: boolean;
  showAssignButton: boolean;
  usersClass: usersClass = new usersClass();
  MyUserResult: MyUserResult;
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
  pass: any;
  empCode: boolean;
  fname: boolean;
  emp: boolean;
  lname: boolean;
  ddmmyy: boolean;
  constructor(private ngxService: NgxUiLoaderService, private toastr: ToastrService, private api: ApiCallServiceService, private apiUrl: ApiUrlsServiceService) { }

  async ngOnInit() {
    this.ngxService.start();
    this.api.get<MyUserResult>(await this.apiUrl.getUrl('users')).subscribe((res: any) => {
      if (res.status == 200) {
        this.ngxService.stop();
        console.log("res", res);
        this.allContents = res.response;
      }
      else {
        this.ngxService.stop();
      }

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
  closePopUp() {
    this.showPopUpValue = false;
    this.showPopUpView = false;
    this.cleanObject();

  }
  async saveContent() {
    this.ngxService.start();
    this.api.post<MyUserResult>(await this.apiUrl.getUrl('userContent'), this.usersClass).subscribe((res: any) => {
      console.log(res);
      if (res.status == 200) {
        this.showPopUpValue = false
        this.cleanObject();
        this.ngxService.start();
        this.ngOnInit();
        this.toastr.success(res.Message)
      }
      else {
        this.toastr.success("Something went wrong")

      }
      this.showPopUpValue = false
      this.cleanObject();
      this.ngxService.stop();

    })

  }
  async getContentById(id) {
    this.updateId = id
    this.showPopUpValue = true;
    this.disableField = false;
    this.showupdateButton = true;
    this.showSaveButton = false;
    this.showAssignButton = false;
    this.api.get(await this.apiUrl.getUrl('user') + '/' + id).subscribe((res: any) => {
      this.usersClass = res.response[0];
    })
  }
  async updateContent() {
    console.log(this.usersClass);
    this.api.put<MyUserResult>(await this.apiUrl.getUrl('userUpdate'), this.usersClass).subscribe((res: any) => {
      this.ngOnInit();
      this.showPopUpValue = false
    })
  }
  async deleteContent(id) {
    let value = confirm("Do you really want to delete this record ?")
    if (value) {
      this.api.delete(await this.apiUrl.getUrl('DeleteUserById') + '/' + id).subscribe((res: any) => {
        if (res.status == 200) {
          this.ngOnInit();
          this.toastr.error(res.Message);
        }
        else if (res.status == 400) {
          this.toastr.error(" Asset is assigned to this user", "Cannot delete this record")
        }
      });
    }
  }

  async viewGetById(id) {
    this.showPopUpView = true;
    this.api.get(await this.apiUrl.getUrl('user') + '/' + id).subscribe((res: any) => {
      this.ViewContentById = res.response[0];
      console.log(res);

    })
  }


  cleanObject() {
    this.usersClass.dateOfBirth = null;
    this.usersClass.designation = '';
    this.usersClass.email = '';
    this.usersClass.empCode = '';
    this.usersClass.empPassword = '';
    this.usersClass.firstName = '';
    this.usersClass.lastName = null;
    this.usersClass.gender = '';
    this.usersClass.maritalStatus = '';
    this.usersClass.mobileNumber = '';
    this.usersClass.pancardNumber = '';
    this.usersClass.adharcardNumber = '';
    this.usersClass.address = null;
    this.usersClass.userId = null;
    this.usersClass.dapartment = null;

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

  generatePassword() {
    let x = Math.random();
    this.pass = Math.floor((Math.random() * 100000000) + 1);
    console.log(this.pass);
    this.usersClass.empPassword = this.pass;

  }
  getempCode(value, field) {
    if (value && field == 'empCode')
      this.emp = false;
    else
      this.emp = true;
  }
  getfName(value,field){
    if (value && field == 'fname')
    this.fname = false;
  else
    this.fname = true;
}
getlName(value,field){
  if (value && field == 'lname')
  this.lname = false;
else
  this.lname = true;
}

 async createPdf() {
  // Create a new PDFDocument
  const pdfDoc =  PDFDocument.create()

  // Embed the Times Roman font
  const timesRomanFont =  (await pdfDoc).embedFont(StandardFonts.TimesRoman)

  // Add a blank page to the document
  const page = (await pdfDoc).addPage()

  // Get the width and height of the page
  const { width, height } = page.getSize()

  // Draw a string of text toward the top of the page
  const fontSize = 13


  page.drawText('                                                        '+'Sales Order From'+'                                           '+'\n\n'+
    
    'FullName:                              '+this.allContents[0].firstName+' '+this.allContents[0].lastName+'\n'+
    'Address:                               '+this.allContents[0].address+'\n'+
    'Email:                                 '+this.allContents[0].email, {
    x: 10,
    y: height - 2 * fontSize,
    size: fontSize,
    color: rgb(0,0,0),
  })

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await (await pdfDoc).save()

  // Trigger the browser to download the PDF document
  download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
}
}

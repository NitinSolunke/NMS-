import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from './Component/userlist/userlist.component';
import { AssetsComponent } from './Component/assets/assets.component';
import { UserAssetComponent } from './Component/user-asset/user-asset.component';
import { SoftwareComponent } from './Component/software/software.component';
import { LicenceComponent } from './Component/licence/licence.component';
import { ConsumableComponent } from './Component/consumable/consumable.component';
import { LoginComponent } from './Component/login/login.component';
import { ValidationFormComponent } from './Component/validation-form/validation-form.component';


const routes: Routes = [
  {path:'user',component:UserlistComponent},
  {path:'asset',component:AssetsComponent},
  {path:'',component:UserlistComponent},
  {path:'userAsset',component:UserAssetComponent},
  {path :'softwares',component:SoftwareComponent},
  {path :'licence',component:LicenceComponent},
  {path :'consumable',component:ConsumableComponent},
 {path:'val',component:ValidationFormComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

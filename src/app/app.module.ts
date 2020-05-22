import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/header/header.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { UserlistComponent } from './Component/userlist/userlist.component';
import { AssetsComponent } from './Component/assets/assets.component';
import { SortPipePipe } from './Pipes/sort-pipe.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserAssetComponent } from './Component/user-asset/user-asset.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import {  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION } from 'ngx-ui-loader';
import { SoftwareComponent } from './Component/software/software.component';
import { LicenceComponent } from './Component/licence/licence.component';
import { ConsumableComponent } from './Component/consumable/consumable.component';
import { LoginComponent } from './Component/login/login.component';
import { ValidationFormComponent } from './Component/validation-form/validation-form.component';

  const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    // bgsPosition: POSITION.bottomCenter,
    fgsSize: 35,
    bgsType: SPINNER.rectangleBounce, // background spinner type
  };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    UserlistComponent,
    AssetsComponent,
    SortPipePipe,
    UserAssetComponent,
    SoftwareComponent,
    LicenceComponent,
    ConsumableComponent,
    LoginComponent,
    ValidationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,BrowserAnimationsModule,NgSelectModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

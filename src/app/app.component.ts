import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IT-AssetManagementSystem';
x:boolean;

getSidebar(){
  this.x=true;
  
}
}

import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  logoPath!:string;

  constructor(private authService:MsalService){}

  ngOnInit(){
    this.logoPath='../cementBuild/assets/logo.png';
  }


  logOut(){
    this.authService.logoutPopup({
      mainWindowRedirectUri:"/login"
    });
    localStorage.clear();
    sessionStorage.clear();
  }
}

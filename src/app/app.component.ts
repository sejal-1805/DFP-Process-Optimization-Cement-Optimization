import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'klein-dshboard';
@ViewChild('navbartoggler') btnToggler!:ElementRef ;
@ViewChild('navbarsearch') inputSearch!:ElementRef ;
@ViewChild('iconsearch') iconSearch!:ElementRef ;
@ViewChild('navbar') navbar!:ElementRef ;
  btnTogglerSelector: any;
  inputSearchSelector: any;
  iconSearchSelector: any;
  navbarSelector: any;
  sidebarExpanded = true;

 



constructor(){
  
}

ngAfterViewInit(): void {
  // console.log(this.btnToggler,this.inputSearch, this.iconSearch, this.navbar);
  this.btnTogglerSelector = this.btnToggler?.nativeElement.querySelector(".navbar-toggler"); 
  this.inputSearchSelector = this.inputSearch?.nativeElement.querySelector(".navbar-search"); 
  this.iconSearchSelector = this.iconSearch?.nativeElement.querySelector("#icon-search");
  this.navbarSelector = this.navbar?.nativeElement.querySelector(".navbar");
  this.btnToggler?.nativeElement.addEventListener('click', () => {
    this.navbar.nativeElement.classList.toggle('active'); 
});

this.inputSearch?.nativeElement.addEventListener('click', () => {
    if(!this.navbarSelector.classList.contains("active")) {
      this.navbar.nativeElement.classList.add('active'); 
    }
  });
}


//events




// iconSearch.addEventListener('click', () => {
//     if(!navbar.classList.contains("active")) {
//         navbar.classList.add('active'); 
//     }
// });

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
  mobileOpen: boolean = true;   // ← was false, change to true
  sidebrCollapsed: boolean = false;
}

import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
  selector: 'app-sidebr',
  templateUrl: './sidebr.component.html',
  styleUrls: ['./sidebr.component.scss']
})
export class SidebrComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
  isLoggedIn:any;
  sidebarExpanded = true;

  ngOnInit(){
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn=localStorage.getItem('isLoggedIn')
    // console.log(this.isLoggedIn);
    
  }
}

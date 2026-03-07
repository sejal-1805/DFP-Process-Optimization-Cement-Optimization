import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.css']
})
export class AlertPopupComponent implements OnInit{
  @Input() modalRef: any;
  max=new Date()

  form=new FormGroup({
    alertdate: new FormControl([[]])
  })

  ngOnInit(): void {

    
    // const date2=
    
    
  }
  downloadalertData($event:any){
    const date1=$event.value[0].toISOString();
    const date2=$event.value[1].toISOString();
    this.form.patchValue({
      alertdate:[date1,date2]
    })
    console.log(this.form.value.alertdate);
    
  }
}

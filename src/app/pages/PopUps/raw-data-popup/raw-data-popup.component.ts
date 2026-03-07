import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-raw-data-popup',
  templateUrl: './raw-data-popup.component.html',
  styleUrls: ['./raw-data-popup.component.css']
})
export class RawDataPopupComponent implements OnInit {
  @Input() modalRef: any;
  max=new Date()

  form=new FormGroup({
    rawdDatedate: new FormControl([[]])
  })

  ngOnChanges(){
  
  }

  ngOnInit():void{
    console.log(this.form.value);
    this.form.patchValue({
      // rawdDatedate:this.max
    })
  }

  downloadRawdata($event:any){
    console.log($event);
    const date1=$event.value[0].toISOString();
    const date2=$event.value[1].toISOString();
    console.log(date1,date2);
    this.form.patchValue({
      rawdDatedate:[date1,date2]
    })
    console.log(this.form.value.rawdDatedate);
    
    
    

  }
  
}

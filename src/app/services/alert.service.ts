import { Injectable } from '@angular/core';
import {dashboardData} from '../../app/pages/dashboard/dashboard.model'
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  private sharedData!:dashboardData;
  private shareDate:any

  sendData(data:any){
    // console.log("in alert service",data);
    this.sharedData=data
    // console.log("API data in alert",this.sharedData);
    
  }

  getData(){
    return this.sharedData;
  }

  
  // sendpayload()
}

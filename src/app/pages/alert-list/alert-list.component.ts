import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import {CementMillModel} from '../system-anlysis/systemAnlysis.model';
import * as moment from 'moment';
// import {alertModel} from './alert.model'
import {MatTableDataSource,MatTableModule} from '@angular/material/table';
// import { alertModel } from './alert.modal';
@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent {
  RecommendationsListUrlType={
    'getRecommedationDataDateRange': environment.baseUrl+ 'getRecommedationDataDateRange',
  }

  AlertUrl={
    'addLog': 'https://i4.utclconnect.com/uat/addLog'
  }
  showNoData:boolean=true;
  sidebarExpanded = true;
  flags={
    showLoader:false
  }
  @ViewChild('paginator') paginator!: MatPaginator;

  payload = {

    "Plant_Code": 'null',

    "Mill":'null',

    "Grade": 'null',

    "Model_No": 0,

    "startDate": 'null',

    "endDate":'null',

    "tagId": "" 
  }

  recommendationDataSource: any=[];
  alertDataSource: any=[];
  filterDataSource!: { Plant_Code: any; Mill: any; Grade: any; dateTime: any; };
  dataSource: any;
  displayedColumn!: string[];
  keysList!: string[];
  alertparameterDropDownData: any;
  alertSortedData:any
  selectedOption: string='All'; 
  urlLink:any

  constructor(private cementMillModel:CementMillModel){

  }
  ngOnInit(){

    let filter=JSON.parse(localStorage.getItem('cementFiltersState') || '{}')
    console.log(filter);

    
      this.payload = {

        "Plant_Code": 'null',
    
        "Mill":'null',
    
        "Grade": 'null',
    
        "Model_No": 0,
    
        "startDate": 'null',
    
        "endDate":'null',
    
        "tagId": "" 
      }
    
    
    console.log("Recommmand paylaod",this.payload);
    
    // this.getRecommendationData();
  }

  public downloadAlertData(){
    
    let payload={
      "Plant_Code": this.payload.Plant_Code, 
      "Mill": this.payload.Mill,
      "tagId":this.payload.tagId==="All"? "" :this.payload.tagId,
      "startDate": this.payload.startDate,
      "endDate": this.payload.endDate
    }
    // console.log("In ALert",payload);
    
    // this.cementMillModel.postCall(this.RecommendationsListUrlType.exportAlertDataDateRange,payload).subscribe(
    //   (result:any)=>{
    //     window.open(result.result.url)
        
    //   },
    //   (error:any)=>{
    //     console.log(error);
        
    //   }
    // )
  
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    // console.log(a,b);
    
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getRecommendationData(){
    console.log(typeof this.payload.startDate);
    if(this.payload.startDate!=='null'){
      console.log("ok")
    }else{
      console.log("no");
      
    }

    let payload={
      Plant_Code:this.payload.Plant_Code,
      Mill:this.payload.Mill,
      Grade:this.payload.Grade,
      Model_No:this.payload.Model_No,
      tagId:"",
      startDate:this.payload.startDate!=='null'?moment(this.payload.startDate).format("YYYY-MM-DD HH:mm"):null,
      endDate:this.payload.endDate!=='null'?moment(this.payload.endDate).format("YYYY-MM-DD HH:mm"):null
    }
    console.log(payload);
    
    
    this.flags.showLoader=true
    this.showNoData=false
    this.cementMillModel.postCall(this.RecommendationsListUrlType.getRecommedationDataDateRange, payload).subscribe(
      (result:any)=>{
        if(result.result[0].result=='No Record Found'){
          this.showNoData=true;
          this.flags.showLoader=false;
          this.recommendationDataSource=[];
        }
        else{
          this.showNoData=false;
          this.flags.showLoader=false;
          this.recommendationDataSource=result.result;
          this.recommendationDataSource.map((item:any)=>{
            item.initialValue=item.initialValue.toFixed(2);
            item.timestamp= new Date(item.timestamp).toUTCString().split('GMT')[0]
          })
          this.keysList=['parameterName','initialValue','recommendedValue','isAcknowledged','actionTaken','is_snoozed','timestamp','comments']
          this.displayedColumn=['Parameter Name','Initial Value','Recommended Value',' Acknowledged','Action Taken','Snoozed','Date & Time','Comments']
          this.dataSource = new MatTableDataSource(this.recommendationDataSource);
          this.dataSource.paginator = this.paginator;
          this.filterDataSource= this.cementMillModel.parseFilterData(this.payload);
          
        }
        
      },
      (error:any)=>{
        console.log(error);
        this.recommendationDataSource=[];
        this.showNoData=true;
        this.flags.showLoader=false;
        
      }
    )
  }

  onChangeFilter(event:any){
    console.log(event.dateRange);
    console.log("jkkk",event);
    
    // this.flags.showLoader=true;
    this.payload = {
      "Plant_Code": event.Plant_Code,
      "Mill":event.Mill,
      "Grade": event.Grade,
      "Model_No": 0,
      "startDate": event.dateRange[0]?event.dateRange[0]: moment().toDate,
      "endDate": event.dateRange[1]?event.dateRange[1]: moment().toDate,
      "tagId": "" 
    }
    localStorage.setItem('cementFiltersState', JSON.stringify(this.payload));
    this.getRecommendationData()
    // this.addLog(this.payload)
    
  }

  // addLog(data:any){
  //   let option={
  //     "Plant":data.Plant_Code,
  //     "Mill":data.Mill
  //   }
  //   let email=localStorage.getItem("cement_userEmail") 
  //   let ip=localStorage.getItem("cement_Ip_+Address")
  //   let plantName=localStorage.getItem("cementPlant")
  //   let payload={
  //     "userId":email,
  //     "ip":ip,
  //     "module":"opt",
  //     "plant":plantName,
  //     "url":this.urlLink,
  //     "options":JSON.stringify(option),
  //     "plant_or_section":"Kiln"
  //   }

  //   console.log(payload)
    

  //   this.cementMillModel.postCall(this.AlertUrl.addLog,payload).subscribe({
  //     next:(res:any)=>{
  //       console.log(res);
        
  //     }
  //   })
  // }

  // getAlertParameterDropDown(){

  // }

  // getAlertParameterDropDown(event:any){
  //   this.payload.tagId=event.target.value;
  //   console.log(this.payload.tagId);
    
  //   this.getAlertsData()
  // }

  // getAlertsData(){
  //   let payload={
  //     "Plant_Code": this.payload.Plant_Code, 
  //     "Mill": this.payload.Mill,
  //     "tagId": this.payload.tagId==="All"? "" :this.payload.tagId,
  //     "startDate": moment(this.payload.startDate).format("YYYY-MM-DD HH:mm"),
  //     "endDate": moment(this.payload.endDate).format("YYYY-MM-DD HH:mm")
  //   }
  //   this.flags.showLoader=true;
  //   this.showNoData=false;

  //   this.cementMillModel.postCall(this.RecommendationsListUrlType.getRecommedationDataDateRange, payload).subscribe(
  //     (result:any)=>{
  //       if(result.result[0].result=='No Record Found'){
  //         console.log("Alert if");
          
  //         this.alertparameterDropDownData=[]
  //         this.showNoData=true;
  //         this.flags.showLoader=false;
  //         this.alertDataSource=[];
  //         this.getParameter()
  //       }
  //       else{
  //         this.showNoData=false;
  //         this.flags.showLoader=false;
  //         let parsedAlertsData=this.alertModel.parseAlertData(result);
  //         this.alertDataSource=parsedAlertsData.recommendationDataSource;
  //         this.keysList=parsedAlertsData.keysList;
  //         this.displayedColumn=parsedAlertsData.displayedColumn;
  //         this.dataSource = parsedAlertsData.dataSource;
  //         this.dataSource.paginator = this.paginator;
  //         this.filterDataSource= this.cementMillModel.parseFilterData(this.payload);

  //         console.log(this.alertDataSource);
          
          
  //       }
        
  //     },
  //     (error:any)=>{
  //       this.alertDataSource=[];
  //       this.showNoData=true;
  //       this.flags.showLoader=false;
        
  //     }
  //   )
  // }

  getParameter(){
    let payload={
      "Plant_Code": "RC", 

    "Mill": "U4KILN",   

    "ParameterType":0
    }
      
  //   this.cementMillModel.postCall(this.RecommendationsListUrlType.getFilterParameters,payload).subscribe((res:any)=>{
  //     this.alertparameterDropDownData=res["result"];
  //     console.log(this.alertparameterDropDownData);
      

  //  })
  }
}

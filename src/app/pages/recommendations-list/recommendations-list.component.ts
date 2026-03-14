import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CementMillModel} from '../system-anlysis/systemAnlysis.model';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import {Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource,MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-recommendations-list',
  templateUrl: './recommendations-list.component.html',
  // styleUrls: ['./recommendations-list.component.scss']
})
export class RecommendationsListComponent {
  RecommendationsListUrlType={
    'getRecommedationDataDateRange': environment.baseUrl+ 'getRecommedationDataDateRange',
    'exportRecommedationDataDateRange':environment.baseUrl+'exportRecommedationDataDateRange'
  }
  RecommendUrl={
    "addLog":'https://i4.utclconnect.com/uat/addLog'
  }

  showNoData:boolean=true;
  sidebarExpanded = true;
  sortedData: any;
  flags={
    showLoader:false
  }
  @ViewChild('paginator') paginator!: MatPaginator;
  // payload = {

  //   "Plant_Code": "VC01",

  //   "Mill": "U1CMML3",

  //   "Grade": "OPC53",

  //   "Model_No": 0,

  //   "startDate": "2023-03-29T18:30:00.000Z",

  //   "endDate": "2023-05-29T18:30:00.000Z",

  //   "tagId": "" 
  // }

  payload = {

    "Plant_Code": 'null',

    "Mill":'null',

    "Grade": 'null',

    "Model_No": 0,

    "startDate": 'null',

    "endDate":'null',

    "dateRange": [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],

    "tagId": "" 
  }

  recommendationDataSource: any=[];
  filterDataSource!: { Plant_Code: any; Mill: any; Grade: any; dateTime: any; };
  dataSource: any;
  displayedColumn!: string[];
  keysList!: string[];
  urlLink:any

  constructor(private cementMillModel:CementMillModel){

  }

  // public downloadRecommendationData() {

  //   let payload = {
  //     "Plant_Code": this.payload.Plant_Code,
  //     "Mill": this.payload.Mill,
  //     "tagId":this.payload.tagId==="All"? "" :this.payload.tagId,
  //     "startDate": moment(this.payload.startDate).format("YYYY-MM-DD HH:mm"),
  //     "endDate": moment(this.payload.endDate).format("YYYY-MM-DD HH:mm")
  //   }
  //   // console.log("In ALert", payload);

  //   this.cementMillModel.postCall(this.RecommendationsListUrlType.exportRecommedationDataDateRange, payload).subscribe(
  //     (result: any) => {
  //       window.open(result.result.url)

  //     },
  //     (error: any) => {
  //       console.log(error);

  //     }
  //   )
  // }

  ngOnInit(){

    let filter=JSON.parse(localStorage.getItem('cementFiltersState') || '{}')
    // console.log(filter);

    this.urlLink=window.location.href;

    
    // console.log("Recommmand paylaod",this.payload);
    
    // this.getRecommendationData();
  }

  downloadRecommendationData(){
    let payload = {
      "Plant_Code": this.payload.Plant_Code,
      "Mill": this.payload.Mill,
      "Grade":this.payload.Grade,
      "Model_No":this.payload.Model_No,
      // "tagId":this.payload.tagId==="All"? "" :this.payload.tagId,
      "tagId":"",
      "startDate": moment(this.payload.startDate).format("YYYY-MM-DD HH:mm"),
      "endDate": moment(this.payload.endDate).format("YYYY-MM-DD HH:mm")
    }
    this.cementMillModel.postCall(this.RecommendationsListUrlType.exportRecommedationDataDateRange,payload).subscribe(
      (result:any)=>{
        window.open(result.result.url)
      },
      (error:any)=>{
        console.log(error);
        
      }
    )
    
  }

  getRecommendationData(){
    // console.log(typeof this.payload.startDate);
    if(this.payload.startDate!=='null'){
      // console.log("ok")
    }else{
      console.log("no");
      
    }

    let payload={
      Plant_Code:this.payload.Plant_Code,
      Mill:this.payload.Mill,
      Grade:this.payload.Grade,
      Model_No:this.payload.Model_No,
      tagId:"",
      startDate:moment(this.payload.startDate).format("YYYY-MM-DD HH:mm"),
      endDate:moment(this.payload.endDate).format("YYYY-MM-DD HH:mm")
    }
    // console.log(payload);
    
    
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

          this.recommendationDataSource.sort((val1:any,val2:any)=>{
            const date1=new Date(val1.timestamp);
            const date2=new Date(val2.timestamp)

            if(date1>date2) return -1
            if(date1<date2) return 1

            return 0;
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
  compare(a: number | string, b: number | string, isAsc: boolean) {
    // console.log(a,b);
    
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.recommendationDataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a:any, b:any) => {
      // console.log(a,b);
      
      const isAsc = sort.direction === 'desc';
      switch (sort.active) {
        case 'parameterName':
          return this.compare(a.parameterName, b.parameterName, isAsc);
        case 'initialValue':
          return this.compare(a.initialValue, b.initialValue, isAsc);
        case 'recommendedValue':
          return this.compare(a.recommendedValue, b.recommendedValue, isAsc);
        case 'timestamp':
          return this.compare(a.timestamp, b.timestamp, isAsc);
        case 'isAcknowledged':
          return this.compare(a.isAcknowledged, b.isAcknowledged, isAsc);
        case 'actionTaken':
          return this.compare(a.actionTaken, b.actionTaken, isAsc);
        case 'is_snoozed':
          return this.compare(a.is_snoozed, b.is_snoozed, isAsc);
        case 'comments':
          return this.compare(a.comments, b.comments, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.sortedData);

  }

  onChangeFilter(event:any){
    // console.log(event.dateRange);
    // console.log("jkkk",event);
    
    // this.flags.showLoader=true;
    this.payload = {
      "Plant_Code": event.Plant_Code,
      "Mill":event.Mill,
      "Grade": event.Grade,
      "Model_No": 0,
      "startDate": event.dateRange[0]?event.dateRange[0]: moment().toDate,
      "endDate": event.dateRange[1]?event.dateRange[1]: moment().toDate,
      "dateRange": event.dateRange || [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
      "tagId": "" 
    }
    localStorage.setItem('cementFiltersState', JSON.stringify(event));
    this.addLog(this.payload)
    this.getRecommendationData()
    // this.getParameter()
    
  }

  addLog(data:any){
    let option={
      "Plant":data.Plant_Code,
      "Mill":data.Mill,
      "Grade":data.Grade
    }
    let plantName=localStorage.getItem("cementPlant")
    let email=localStorage.getItem("cement_userEmail") 
    let ip=localStorage.getItem("cement_Ip_Address")
    let payload={
      "userId":email,
      "ip":ip,
      "module":"opt",
      "plant":plantName,
      "url":this.urlLink,
      "options":JSON.stringify(option),
      "plant_or_section":"Cement"
    }

    // console.log(payload)
    // console.log(this.dashboardLink.addLog);
    
    

    this.cementMillModel.postCall(this.RecommendUrl.addLog,payload).subscribe({
      next:(res:any)=>{
        console.log(res);
        
      }
    })
  }

  getParameter() {
    let payload = {
      "Plant_Code": this.payload.Plant_Code,
      "Mill": this.payload.Mill,
      "ParameterType": 1

    }
    // this.cementMillModel.postCall(this.RecommendationsListUrlType.getFilterParameters,payload).subscribe((res:any)=>{
    //   console.log(res["result"]);
    //   this.parameterDropDownData=res["result"]
      
    // })
  }

  
}

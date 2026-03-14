import { Component ,OnInit,ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CementMillModel } from '../system-anlysis/systemAnlysis.model';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { AlertService } from 'src/app/services/alert.service';
import {Sort, MatSortModule} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent {
  EquipmentListUrlType = {
    'getEquipmentFailureDataDateRange': environment.baseUrl + 'getEquipmentFailureDataDateRange',
    // 'addLog':environment.baseUrl+'addLog'
    // 'exportRecommedationDataDateRange': environment.baseUrl + 'exportRecommedationDataDateRange',
    // 'getFilterParameters': environment.baseUrl + 'getFilterParameters'
  }
  RecommendationsListUrlType={
    'getRecommedationDataDateRange': environment.baseUrl+ 'getRecommedationDataDateRange',
  }
  EquipmentUrl={
    'addLog': 'https://i4.utclconnect.com/uat/addLog'
  }

  showNoData: boolean = false;
  sidebarExpanded = true;
  flags = {
    showLoader: false
  }

  @ViewChild('paginator') paginator!: MatPaginator;
  payload = {

    "Plant_Code": 'null',

    "Mill": 'null',

    "Grade": 'null',

    "Model_No": 0,

    "startDate": null,

    "endDate": null,

    "dateRange": [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],

    "tagId":''
  }

  equipmentDataSource: any = [];
  recommendationDataSource: any=[];
  filterDataSource!: { Plant_Code: any; Mill: any; Grade: any; dateTime: any; };
  dataSource: any;
  displayedColumn!: string[];
  keysList!: string[];
  parameterDropDownDatas: any;
  parameterDropDownData: any;
  newDate:any
  min:any
  max:any
  sortedData: any;
  selectedOption: string ='All'; 
  urlLink:any

  constructor(private cementMillModel: CementMillModel,private http:HttpClient) {

  }
  ngOnInit(): void {
    this.urlLink=window.location.href
  }

  // getEquipment() {
  //   // console.log("kjdhfkdhfodhvodhvo",this.payload);
    
  //   let payload = {
  //     "Plant_Code": this.payload.Plant_Code,
  //     "Mill": this.payload.Mill,
  //     "startDate": moment(this.payload.startDate).format("YYYY-MM-DD HH:mm"),
  //     "endDate": moment(this.payload.endDate).format("YYYY-MM-DD HH:mm")
  //   }
  //   // console.log(payload);
    
  //   this.flags.showLoader = true;
  //   this.showNoData = false;
  //   this.cementMillModel.postCall(this.EquipmentListUrlType.getEquipmentFailureDataDateRange, payload).subscribe(
  //     (result: any) => {
  //       // console.log(result);
        
  //       if (result.result[0].result == 'No Record Found') {
  //         this.parameterDropDownData = [];
  //         this.showNoData = true;
  //         this.flags.showLoader = false;
  //         this.equipmentDataSource = [];
  //         // this.getParameter()
  //       }
  //       else {
  //         this.showNoData = false;
  //         this.flags.showLoader = false;
  //         this.equipmentDataSource = result.result;
  //         this.equipmentDataSource.map((item: any) => {
  //           // this.parameterDropDownData.push({ 'value': item.tag_id, 'viewValue': item.Display_Name })
  //           item.lower_bound = item.lower_bound?.toFixed(2);
  //           item.upper_bound = item.upper_bound?.toFixed(2);
  //           item.spot_value = item.spot_value?.toFixed(2);
  //           // item.recommendedValue = item.recommendedValue.toFixed(2);
  //           item.timestamp = new Date(item.timestamp).toUTCString().split('GMT')[0];

  //         })
  //         this.equipmentDataSource.sort((val1:any,val2:any)=>{
  //           const date1=new Date(val1.timestamp);
  //           const date2=new Date(val2.timestamp)

  //           if(date1>date2) return -1
  //           if(date1<date2) return 1

  //           return 0;
  //         })
  //         // console.log(this.recommendationDataSource);
          
  //         this.sortedData = this.equipmentDataSource.slice();


  //         console.log(this.parameterDropDownData);

  //         let jsonObj=this.parameterDropDownData.map(JSON.stringify);
  //          let uniqueSet=new Set(jsonObj)
  //          this.parameterDropDownDatas=Array.from(uniqueSet).map(JSON.parse)
  //         console.log(this.parameterDropDownDatas);

  //         console.log("this is paramter dropdown", this.parameterDropDownData);

  //         this.keysList = ['Equipment_Name', 'lower_bound', 'upper_bound', 'spot_value', 'timestamp']
  //         this.displayedColumn = ['Equipment Name', 'Lower Bound', 'Upper Bound', ' Spot Value', 'Date & Time']
  //         this.dataSource = new MatTableDataSource(this.equipmentDataSource);
  //         this.dataSource.paginator = this.paginator;
  //         this.filterDataSource = this.cementMillModel.parseFilterData(this.payload);

  //       }

  //     },
  //     (error: any) => {
  //       console.log(error);
  //       this.equipmentDataSource = [];
  //       this.showNoData = true;
  //       this.flags.showLoader = false;

  //     }
  //   )
  // }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    // console.log(a,b);
    
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  sortData(sort: Sort) {
    // const data = this.equipmentDataSource.slice();
    // if (!sort.active || sort.direction === '') {
    //   this.sortedData = data;
    //   return;
    // }

    // this.sortedData = data.sort((a:any, b:any) => {
    //   const isAsc = sort.direction === 'desc';
    //   switch (sort.active) {
    //     case 'Equipment_Name':
    //       return this.compare(a.Equipment_Name, b.Equipment_Name, isAsc);
    //     case 'lower_bound':
    //       return this.compare(a.lower_bound, b.lower_bound, isAsc);
    //     case 'upper_bound':
    //       return this.compare(a.upper_bound, b.upper_bound, isAsc);
    //     case 'spot_value':
    //       return this.compare(a.spot_value, b.spot_value, isAsc);
    //     case 'timestamp':
    //       return this.compare(a.timestamp, b.timestamp, isAsc);
    //     default:
    //       return 0;
    //   }
    // });
    // this.dataSource = new MatTableDataSource(this.sortedData);

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

  onChangeFilter(event: any) {
    // alert(event.dateRange);
    // console.log(event.dateRange);
    
    this.flags.showLoader = true;
    this.payload = {
      "Plant_Code": event.Plant_Code,
      "Mill": event.Mill,
      "Grade": event.Grade,
      "Model_No": 0,
      "startDate": event.dateRange[0] ? event.dateRange[0] : moment().toDate,
      "endDate": event.dateRange[1] ? event.dateRange[1] : moment().toDate,
      "dateRange": event.dateRange || [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
      "tagId": ""
    }
    // console.log(event);
    

    // console.log(this.payload);
    localStorage.setItem('cementFiltersState',JSON.stringify(event))
    
    // this.addLog(this.payload)
    // this.getEquipment()
    // this.getParameter()
    this.getRecommendationData()

  }

  // addLog(data:any){
  //   let option={
  //     "Plant":data.Plant_Code,
  //     "Mill":data.Mill
  //   }
  //   let email=localStorage.getItem("cement_userEmail") 
  //   let ip=localStorage.getItem("cement_Ip_Address")
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
    

  //   this.cementMillModel.postCall(this.EquipmentUrl.addLog,payload).subscribe({
  //     next:(res:any)=>{
  //       console.log(res);
        
  //     }
  //   })
  // }
}

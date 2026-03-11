import { Component, OnInit,SimpleChanges, TemplateRef,Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { controlGauge } from './controlGauge.model';
import {environment} from '../../../environments/environment';
import { RemovebracketsPipe } from 'src/app/pipes/removebrackets.pipe';
@Component({
  selector: 'app-control-gauge',
  templateUrl: './control-gauge.component.html',
  // styleUrls: ['./control-gauge.component.scss']
})
export class ControlGaugeComponent implements OnInit {
  @Input() type!:string;
  @Input() datasorce:any;
  @Input() timestamp:any; 
  @Input() payload:any
  trendDataSource:any
  dateTimeData:any=[]
  seriesdata:any=[]
  chartResult:boolean=false
  urlType={
    'getChartTrendsData': environment.baseUrl + 'getChartTrendsData'
  }
  gaugemap: any = {};
  indexArray:Number[]|any;
  public gaugeType = "semi";
  gaugeValue = 28.3;
  maxValue:number=2000;
  modalRef?: BsModalRef;
  max: any = moment().toDate();
  min: any = moment().subtract(1, 'hour').toDate();
  selectRange:any
  loadchart:boolean=true
  tagID:any
  display_name:any
  unit_measure:any

  constructor(private modalService:BsModalService,private _api:controlGauge){}

  ngOnChanges(changes: SimpleChanges): void{
    if(this.datasorce){
      this.datasorce.forEach((item:any)=>{
        if(item.actualValue<=item.minValue){
          item.foregroundColor='green'
        }
        if(item.actualValue>item.minValue && item.actualValue<=item.maxValue){
          item.foregroundColor='yellow'
        }
        if(item.actualValue>item.maxValue){
          item.foregroundColor='red'
        }
      })
    }
   
  }

  ngOnInit(): void {
    // console.log(this.payload);
    this.selectRange=[this.min,this.max]
    // this.datasorce.forEach((item:any)=>{
    //   console.log(item.parameterName, item.unitofmeasurement)   
    //   let uomIndex=item.parameterName.toLowerCase().indexOf(item.unitofmeasurement.toLowerCase());
    //   if(uomIndex!=-1){
    //     item.parameterName= item.parameterName.slice(0,uomIndex)
    //   }
    // })
    // console.log(this.selectRange);
    
    
  }
  public openModal(template: TemplateRef<any>,item:any,name:any,unit:any) {
    this.modalRef = this.modalService.show(template);
    console.log(item,unit);
    this.display_name=name
    this.unit_measure=unit
    this.tagID=item
    let payload={
      "Plant_Code":this.payload.Plant_Code,
      "Mill":this.payload.Mill,
      "Grade":this.payload.Grade,
      "Model_No":this.payload.Model_No,
      "tagId":this.tagID,
      "startDate":moment(this.min).format("YYYY-MM-DD HH:mm"),
      "endDate":moment(this.max).format("YYYY-MM-DD HH:mm")
    }
    // console.log(payload);
    this.dateTimeData=[];
    this.seriesdata=[]
    this.getTrendLineChart(payload,this.display_name,this.unit_measure)
    
    
  }
  getTrendLineChart(payload:any,name:any,unit:any){
    
    this._api.postCall(this.urlType.getChartTrendsData,payload).subscribe({
      next:(res:any)=>{
        console.log(res);
        
        if(res.result[0].result==='No Record Found'){
          this.trendDataSource=[]
          this.dateTimeData=[]
          this.seriesdata=[]
          this.chartResult=true
          this.loadchart=false
        }else{
          this.trendDataSource=res.result;
          this.trendDataSource.sort((a:any,b:any)=>{
            const date1=new Date(a.Timestamp)
            const date2=new Date(b.Timestamp)
  
            if(date1<date2) return -1;
            if(date1>date2) return 1;
  
            return 0
          })
          
          this.chartResult=true
          this.loadchart=false
          this.trendDataSource.map((item:any)=>{
            console.log(item);
            this.dateTimeData.push(moment(item.Timestamp).format("YYYY-MM-DD HH:mm"))
            this.seriesdata.push(item.Value)
          })
          // console.log("in parent",this.dateTimeData,this.seriesdata);
        }
        
      },
      error:(error:any)=>{
        this.chartResult=true
        this.loadchart=false
      }
    })
  }
  onselectDateTimeRange(event:any){
    // console.log(event.value);
    let payload={
      "Plant_Code":this.payload.Plant_Code,
      "Mill":this.payload.Mill,
      "Grade":this.payload.Grade,
      "Model_No":this.payload.Model_No,
      "tagId":this.tagID,
      "startDate":moment(event.value[0]).format("YYYY-MM-DD HH:mm"),
      "endDate":moment(event.value[1]).format("YYYY-MM-DD HH:mm")
    }
    this.trendDataSource=[]
    this.dateTimeData=[]
    this.seriesdata=[]
    this.chartResult=false
    this.loadchart=true
    this.getTrendLineChart(payload,this.display_name,this.unit_measure)
    // this._api.postCall(this.urlType.getChartTrendsData,payload).subscribe({
    //   next:(res:any)=>{
    //     this.trendDataSource=res.result;
    //     this.trendDataSource.sort((a:any,b:any)=>{
    //       const date1=new Date(a.date_time)
    //       const date2=new Date(b.date_time)

    //       if(date1<date2) return -1;
    //       if(date1>date2) return 1;

    //       return 0
    //     })
        
    //     this.chartResult=true
    //     this.trendDataSource.map((item:any)=>{
    //       // console.log(item);
    //       this.dateTimeData.push(moment.utc(item.date_time).format("YYYY-MM-DD HH:mm"))
    //       this.seriesdata.push(item.Value)
    //     })
    //     console.log("in parent",this.dateTimeData,this.seriesdata);
    //   }
    // })
    
  }

  closeModal(){
    this.trendDataSource=[]
    this.dateTimeData=[]
    this.seriesdata=[]
    this.chartResult=false
    this.loadchart=true
  }
  ngOnDestroy(){
    this.modalRef?.hide()
  }
}

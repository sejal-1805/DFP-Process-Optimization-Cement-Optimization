import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {environment} from '../../../environments/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Chart } from 'angular-highcharts';
import { DashboardModel } from './dashboard.modal';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  // styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  modalRef?: BsModalRef;
  modalRef1?: BsModalRef;
  modalRef2?: BsModalRef;
  throughputFlags={
    'showThroughPutLoader':true,
    'showThroughPutData':false,
    'throughPutNoData':false
  }

  wklyAlmCountFlags={
    'showWklyAlmCountLoader':true,
    'showWklyAlmCountData':false,
    'WklyAlmCountNoData':false
  }

  monthlyAvgThroughputFlags={
    'showMonthlyAvgThroughputLoader':true,
    'showMonthlyAvgThroughputData':false,
    'monthlyAvgThroughputNoData':false
  }

  // linechart:any
  cardData={
    'Total_Recommendation':0
  };
  flags!: { showLoader: boolean; };
  throughputValues={
    "minValue":0,
    "maxValue":0,
    "avgValue":''  }
    minValue!:number
  maxValue!:number
  avgValue!:number
  sum:any
  sidebarExpanded = true;
  data: any = [];
  data2: any = [];
  throughput: any;
  chart: any={};
  chart1: any={};
  chart2: any={};
  payload!: { Plant_Code: any; Mill: any; Grade: any; Model_No: number; dateTime: any };
  recommendationDate: any=new Date();
  datapie:any=[]
  datamonth:any=[]
  dataActualThroughPut:any=[]
  cardflag:boolean=true
  linechart:boolean=true
  barcharflag:boolean=true;
  pieChartflag:boolean=true
  visibleWeekCount:boolean = true;
  visibleAvg:boolean=true
  visibleThroughput:boolean=true
  visibleCard:boolean=true
  urlLink:any
  
  dashboardUrls:any={
    'getDashboardCardData': environment.baseUrl+'getDashboardCardData',
    'getCementThroughputData':environment.baseUrl+'getCementThroughputData',
    'getCementThroughputDataAvgMonthly':environment.baseUrl+'getCementThroughputDataAvgMonthly',
    'getDashboardWeeklyCounts':environment.baseUrl+'getDashboardWeeklyCounts',
    // 'addLog':environment.baseUrl+'addLog'
  }
  dashboardLink:any={
    'addLog': 'https://i4.utclconnect.com/uat/addLog'
  }

  constructor(private _route:Router,private dashboardModal:DashboardModel){
    
  }

  ngOnInit(): void {
    this.flags={
      'showLoader':false
    }
    this.urlLink=window.location.href;
    // this.lineChart()
    // this.getPieChart()
    // this.barchart()
  }



  onClickCard(route:any){
    this._route.navigate([route])
  }

  

  getCardData(){
    this.visibleCard=true
    let payload={
      "Plant_Code":this.payload.Plant_Code,
      "Mill":this.payload.Mill,
      "Grade":this.payload.Grade,
      "Model_No":this.payload.Model_No,
      "date":moment(this.payload.dateTime).format('YYYY-MM-DD')
    }
    console.log(payload);
    this.dashboardModal.postCall(this.dashboardUrls.getDashboardCardData,payload).subscribe(
      (result:any)=>{
        // this.cardflag=false
        // this.flags.showLoader=true
        // console.log(result.result[0].Total_Recommendation);
        if(result && result.result && result.result.length>0){
          this.cardflag=false
          this.visibleCard=false
          this.cardData['Total_Recommendation']=result.result[0].Total_Recommendation;
          // console.log(this.cardData);
          
        }
        
      },
      (error:any)=>{
        this.cardflag=true
        this.flags.showLoader=false;
        this.visibleCard=false
        console.log(error);
        
      }
    )


    
  }

  public setThroughPutFlag(state:String){
    if(state=='initial'){
      this.throughputFlags.showThroughPutLoader=true;
      this.throughputFlags.showThroughPutData=false;
      this.throughputFlags.throughPutNoData=false;
    }
    if(state=='nodata'){
      this.throughputFlags.showThroughPutLoader=false;
      this.throughputFlags.showThroughPutData=false;
      this.throughputFlags.throughPutNoData=true;
    }
    if(state=='data'){
      this.throughputFlags.showThroughPutLoader=false;
      this.throughputFlags.showThroughPutData=true;
      this.throughputFlags.throughPutNoData=false;
    }
  }


  public setMonthlyAvgThroughputFlag(state:String){
    if(state=='initial'){
      this.monthlyAvgThroughputFlags.showMonthlyAvgThroughputLoader=true;
      this.monthlyAvgThroughputFlags.showMonthlyAvgThroughputData=false;
      this.monthlyAvgThroughputFlags.monthlyAvgThroughputNoData=false;
    }
    if(state=='nodata'){
      this.monthlyAvgThroughputFlags.showMonthlyAvgThroughputLoader=false;
      this.monthlyAvgThroughputFlags.showMonthlyAvgThroughputData=false;
      this.monthlyAvgThroughputFlags.monthlyAvgThroughputNoData=true;
    }
    if(state=='data'){
      this.monthlyAvgThroughputFlags.showMonthlyAvgThroughputLoader=false;
      this.monthlyAvgThroughputFlags.showMonthlyAvgThroughputData=true;
      this.monthlyAvgThroughputFlags.monthlyAvgThroughputNoData=false;
    }
  }


  public setWeeklyAlarmCountFlag(state:String){
    if(state=='initial'){
      this.wklyAlmCountFlags.showWklyAlmCountLoader=true;
      this.wklyAlmCountFlags.showWklyAlmCountData=false;
      this.wklyAlmCountFlags.WklyAlmCountNoData=false;
    }
    if(state=='nodata'){
      this.wklyAlmCountFlags.showWklyAlmCountLoader=false;
      this.wklyAlmCountFlags.showWklyAlmCountData=false;
      this.wklyAlmCountFlags.WklyAlmCountNoData=true;
    }
    if(state=='data'){
      this.wklyAlmCountFlags.showWklyAlmCountLoader=false;
      this.wklyAlmCountFlags.showWklyAlmCountData=true;
      this.wklyAlmCountFlags.WklyAlmCountNoData=false;
    }
  }

  getThroughput(){
    this.setThroughPutFlag('initial');
    this.visibleThroughput=true;
    let payload={
      "Plant_Code": this.payload.Plant_Code, 
      "Mill": this.payload.Mill,
      "Grade":this.payload.Grade,
      "Model_No":this.payload.Model_No,
      "date":moment(this.payload.dateTime).format('YYYY-MM-DD')
      // "date":this.payload.dateTime.split(" ")[0]
    }
    this.data=[];
    this.data2=[];

    this.dashboardModal.postCall(this.dashboardUrls.getCementThroughputData,payload).subscribe(
      (result:any)=>{
        if(result.result.result==='No Record Found'){
          this.setThroughPutFlag('nodata')
          this.linechart=true;
          this.flags.showLoader=false;
          this.visibleThroughput=false;
        }else{
          this.setThroughPutFlag('data')
          this.linechart=false;
          this.visibleThroughput=false
          let values=result.result.map((item:any)=>{
            return item.actualValue;
          })
          this.throughputValues.minValue=Math.min(...values);
          this.throughputValues.maxValue=Math.max(...values);

          const sum=values.reduce((acc:any,value:any)=> acc+value,0)
          this.throughputValues.avgValue=(sum/values.length).toFixed(2);

          result.result.map((item:any,index:any)=>{
            this.throughput=item.actualValue;
            const inputDate=item.timestamp?.split('T')[0];
            const input=item.timestamp?.split('T')[1].slice(0,5);

            this.data.push(this.throughput);
            this.data2.push(`${inputDate} ${input}`)
          })
          this.flags.showLoader=false;
          this.chart = new Chart({
            chart: {
              type: 'line',
              zooming: {
                type: 'x',
              },
              backgroundColor: '#104957',
              // width: 1300,
              height: 520,
              // scrollablePlotArea:{
              //   minWidth:768,
              //   scrollPositionX:-1
              // }
            },
  
            title: {
              text: 'Daily Throughput Trend',
              style:{
                color:'#fff'
              }
            },
  
            credits: {
              enabled: false,
            },
            xAxis: {
              // type: "category",
              categories: this.data2,
              gridLineWidth: 1,
              // lineColor: 'green',
              tickWidth: 1,
              gridLineColor: 'black',
              gridLineDashStyle: 'ShortDash',
              tickInterval: 6, // Set the interval between ticks
              tickPixelInterval: 100,
              labels: {
                rotation: -45,
                style:{
                  color:'#fff'
                }
              },
            },
            yAxis: {
              title: {
                text: 'Throughput (TPH)',
                style: {
                  fontSize: '15px',
                  color:'#fff'
                },
              },
              labels: {
                style:{
                  color:'#fff'
                }
              },
              gridLineColor: 'black',
              gridLineDashStyle: 'ShortDash',
              tickWidth: 1,
              tickPixelInterval: 100,
            },
            plotOptions: {
              series: {
                // color: 'blue',
                // point:{
                //   events:{
                //     click:(event)=>{
                //       this.onDataPointClick(event);
                //     }
                //   }
                // },
                label: {
                  connectorAllowed: true,
                },
              },
              line: {
                lineWidth: 3,
              },
            },
            legend:{
              itemStyle:{
                color:'#fff'
              }
            },
            series: [
              {
                name: 'Actual ThroughPut',
                data: this.data,
                marker: {
                  enabled: true,
                  symbol: 'circle',
                  radius: 5,
                },
                color: '#1f91e6',
              } as any,
            ],
            responsive: {
              rules: [
                {
                  condition: {
                    maxWidth: 768,
                  },
                  chartOptions: {
                    legend: {
                      align: 'center',
                    },
                    // scrollbar: {
                    //   enabled: true,
                    // },
                  },
                },
                // {
                //   condition: {
                //     minWidth: 769,
                //   },
                //   chartOptions: {
                //     scrollbar: {
                //       enabled: false,
                //     },
                //   },
                // },
              ],
            },
          });
        }
        
      },
      (error:any)=>{
        this.linechart=true
        this.flags.showLoader=false
        this.visibleThroughput=false
      }
    )

  }

  getAverageData(){
    this.setMonthlyAvgThroughputFlag('initial');
    this.visibleAvg=true;
    let payload={
      "Plant_Code": this.payload.Plant_Code, 
      "Mill": this.payload.Mill,
      "Grade":this.payload.Grade,
      "Model_No":this.payload.Model_No,
      "date":moment(this.payload.dateTime).format('YYYY-MM-DD')
      // "date":this.payload.dateTime.split(" ")[0]
    }
    let monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.datamonth=[]
    this.dataActualThroughPut=[]

    this.dashboardModal.postCall(this.dashboardUrls.getCementThroughputDataAvgMonthly,payload).subscribe(
      (result:any)=>{
        if(result.result[0].result==='No Record Found'){
          this.setMonthlyAvgThroughputFlag('nodata')
          this.barcharflag=true
          this.flags.showLoader=false;
          this.visibleAvg=false
        }else{
          this.setMonthlyAvgThroughputFlag('data')
          this.barcharflag=false;
          this.visibleAvg=false
        result.result=result.result.sort((a:any,b:any) => monthOrder.indexOf(a.Month) -  monthOrder.indexOf(b.Month));
        // console.log(result.result);
        
        result.result.map((item:any, index:any)=>{
          const month =item.Month;
          this.datamonth.push(month);
          this.dataActualThroughPut.push(item.AverageCalcThroughput);
        })
        this.barchart();
        }
        
      },
      (error:any)=>{
        console.log(error);
        this.barcharflag=true
        this.flags.showLoader=false
        this.visibleAvg=false
      }
    )

  }


  getWeeklyData(){
    this.setWeeklyAlarmCountFlag('initial');
    this.visibleWeekCount=true;
    let payload={
      "Plant_Code": this.payload.Plant_Code, 
      "Mill": this.payload.Mill,
      "Grade":this.payload.Grade,
      "Model_No":this.payload.Model_No,
      "date":moment(this.payload.dateTime).format('YYYY-MM-DD')
      // "date":this.payload.dateTime.split(" ")[0]
    }
    // console.log(payload);
    
    this.datapie=[]

    this.dashboardModal.postCall(this.dashboardUrls.getDashboardWeeklyCounts,payload).subscribe(
      (result:any)=>{
        if(result.result[0].result==='No Record Found'){
          this.setWeeklyAlarmCountFlag('nodata')
          this.pieChartflag=true;
          this.flags.showLoader=false
          this.visibleWeekCount=false
        }else{
          this.setWeeklyAlarmCountFlag('data')
          this.pieChartflag=false
          this.visibleWeekCount=false
          result.result.map((item:any, index:any)=>{
            const obj = {
              name:moment(item.StartDate).toDate().toDateString()+'-'+moment(item.EndDate).toDate().toDateString(),
              y: item.AlertCount,
            };
            this.datapie.push(obj);
          })
          this.getPieChart()
        }
      },
      (error:any)=>{
        this.pieChartflag=true
        this.flags.showLoader=false
        this.visibleWeekCount=false
      }
    )
  }

  onChangeFilter(event:any){
    console.log("dashboard",event);
    this.flags={
      'showLoader':true
    } 

    this.payload=event;


    let cementFiltersState={
      "Plant_Code":this.payload.Plant_Code,
      "Mill":this.payload.Mill,
      "Grade":this.payload.Grade,
      "Model_No":this.payload.Model_No,
      "dateTime":this.payload.dateTime,
      // "dateRange":['2023-10-10 00:00', '2023-10-10 23:59']
      "dateRange":[moment(this.payload.dateTime).format('YYYY-MM-DD 00:00'),moment(this.payload.dateTime).format('YYYY-MM-DD 23:59')]
    }

    console.log(cementFiltersState);

    localStorage.setItem("cementFiltersState",JSON.stringify(cementFiltersState));
    this.getCardData();
    this.getThroughput()
    this.getWeeklyData();
    this.getAverageData()
    this.addLog(this.payload)

    


    
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
    
    

    this.dashboardModal.postCall(this.dashboardLink.addLog,payload).subscribe({
      next:(res:any)=>{
        console.log(res);
        
      }
    })
    
  }

  lineChart(){
    // this.data2=['Sun Dec 2023-12-10 00:00','Sun Dec 2023-12-10 00:20','Sun Dec 2023-12-10 00:40','Sun Dec 2023-12-10 01:00','Sun Dec 2023-12-10 01:20','Sun Dec 2023-12-10 01:40','Sun Dec 2023-12-10 02:00','Sun Dec 2023-12-10 02:20','Sun Dec 2023-12-10 02:40','Sun Dec 2023-12-10 03:00','Sun Dec 2023-12-10 03:20','Sun Dec 2023-12-10 03:40','Sun Dec 2023-12-10 04:00','Sun Dec 2023-12-10 04:20','Sun Dec 2023-12-10 04:40']
    // this.data=[123,145.3,43.5,90,78,100,156,89,230,98,55,109,22,64,132]
    this.data2=[]
    this.data=[]
    this.chart = new Chart({
      chart: {
        type: 'line',
        zooming: {
          type: 'x',
        },
        backgroundColor: '#EEF7F8',
        // width: 1300,
        height: 520,
        // scrollablePlotArea:{
        //   minWidth:768,
        //   scrollPositionX:-1
        // }
      },

      title: {
        text: 'Daily Throughput Trend',
        style:{
          color:'#000'
        }
      },

      credits: {
        enabled: false,
      },
      xAxis: {
        // type: "category",
        categories: this.data2,
        gridLineWidth: 1,
        // lineColor: 'green',
        tickWidth: 1,
        gridLineColor: 'black',
        gridLineDashStyle: 'ShortDash',
        tickInterval: 2, // Set the interval between ticks
        tickPixelInterval: 10,
        labels: {
          rotation: -45,
          style:{
            color:'#000'
          }
        },
      },
      yAxis: {
        title: {
          text: 'Throughput (TPH)',
          style: {
            fontSize: '15px',
            color:'#000'
          },
        },
        labels: {
          style:{
            color:'#000'
          }
        },
        gridLineColor: 'black',
        gridLineDashStyle: 'ShortDash',
        tickWidth: 1,
        tickPixelInterval: 100,
      },
      plotOptions: {
        series: {
          // color: 'blue',
          point:{
            events:{
              click:(event)=>{
                this.onDataPointClick(event);
              }
            }
          },
          label: {
            connectorAllowed: true,
          },
        },
        line: {
          lineWidth: 3,
        },
      },
      legend:{
        itemStyle:{
          color:'#000'
        }
      },
      series: [
        {
          name: 'Actual ThroughPut',
          data: this.data,
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 5,
          },
          color: '#1f91e6',
        } as any,
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 768,
            },
            chartOptions: {
              legend: {
                align: 'center',
              },
              // scrollbar: {
              //   enabled: true,
              // },
            },
          },
          // {
          //   condition: {
          //     minWidth: 769,
          //   },
          //   chartOptions: {
          //     scrollbar: {
          //       enabled: false,
          //     },
          //   },
          // },
        ],
      },
    });
  }

  barchart(){
    // this.datamonth=['September','October','November','December']
    // this.dataActualThroughPut=[103,150,78,100]

    this.chart2 = new Chart({
      chart: {
        type: 'column',
        // width:650,
        backgroundColor: '#104957',
      },
      title: {
        text: '',
        style:{
          color:'#fff'
        }
      },
      xAxis: {
        categories: this.datamonth,
        labels:{
          style:{
            color:'#fff'
          }
        }
      },
      yAxis: {
        title: {
          text: 'Throughput Range',
          style: {
            fontSize: '15px',
            color:'#fff'
          },
        },
        labels: {
          style:{
            color:'#fff'
          }
        },
        gridLineColor: 'black',
        gridLineDashStyle: 'ShortDash',
      },
      series: [
        {
          type: 'column',
          name: 'Actual Throughput',
          data: this.dataActualThroughPut,
          color: '#1f91e6',
        },
      ],
      legend: {
        itemStyle: {
          fontSize: '14px',
          fontWeight: 'bold',
          color:'#fff'
        },
      },
    });
  }

  getPieChart(){
    // this.datapie=[
    //   {name:"Sun Dec 10 2023-Sat Dec 16 2023",y:20},
    //   {name:"Sun Dec 03 2023-Sat Dec 09 2023",y:207},
    //   {name:"Sun Nov 26 2023-Sat Dec 02 2023",y:107},
    //   {name:"Sun Nov 19 2023-Sat Nov 25 2023",y:227},
    // ]

    this.chart1 = new Chart({
      chart: {
        type: 'pie',
        width:620,
        backgroundColor: '#104957',
      },
      title: {
        text: '',
        style:{
          color:'#fff'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name:'Alerts',
          type: 'pie',
          data: this.datapie,
        },
      ],
      legend: {
        // enabled:this.isScreenSmall(),
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'middle',
        itemStyle: {
          fontSize: '14px',
          fontWeight: 'bold',
          color:'#fff'
        },
      },
    });
  }
  onDataPointClick(data:any){

  }
}

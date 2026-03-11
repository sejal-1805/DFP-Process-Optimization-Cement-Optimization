import { Component, Input,OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
// import { Chart,registerables} from 'chart.js';
// import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() dateTimeData:any
  @Input() seriesData:any
  @Input() displayName:any
  @Input() unitMeasure:any
  chart:any={}
  // @Input() data:any;
  // @Input() title:any;
  // labelsArray:any=[];
  // valueArray:any=[];
  noData:boolean=false;
  @Input() loadchart:any
  constructor(){
    // Chart.register(...registerables);
    // Chart.register(zoomPlugin);
   }

   ngOnChanges(){
    // console.log(this.dateTimeData);
    // console.log(this.seriesData);

    if(this.dateTimeData.length>0 && this.seriesData.length>0){
      this.noData=false
      this.chart = new Chart({
        chart: {
          type: 'line',
          zooming: {
            type: 'x',
          },
          backgroundColor: '#104957',
          // width: 1300,
          height: 420,
          // scrollablePlotArea:{
          //   minWidth:768,
          //   scrollPositionX:-1
          // }
        },
  
        title: {
          text: '',
          style:{
            color:'#FFF'
          }
        },
  
        credits: {
          enabled: false,
        },
        xAxis: {
          // type: "category",
          categories: this.dateTimeData,
          gridLineWidth: 1,
          // lineColor: 'green',
          tickWidth: 1,
          gridLineColor: 'black',
          gridLineDashStyle: 'ShortDash',
          tickInterval: 4, // Set the interval between ticks
          tickPixelInterval: 100,
          labels: {
            rotation: -52,
            style:{
              color:'#fff'
            }
          },
        },
        yAxis: {
          title: {
            text: this.unitMeasure? `Value in ${this.unitMeasure}`:'Value',
            style: {
              fontSize: '15px',
              color:'#FFF'
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
            point:{
              // events:{
              //   click:(event)=>{
              //     this.onDataPointClick(event);
              //   }
              // }
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
            color:'#FFF'
          }
        },
        series: [
          {
            name: this.displayName,
            data: this.seriesData,
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
    }else{
      this.noData=true;
      this.chart={}
    }
    
    
    
    // console.log(this.chart);
   }

   


  ngOnInit(){
    let ctx: any = document.getElementById('lineChart') as HTMLElement;
   
  
    //     this.chart2 = new Chart(ctx, {
    //       type: 'line',
    //       data: data,
    //       options: options,
    //     });
    //   }
   
    
    // this.chart2 = new Chart(ctx,{
    //   type: 'line',
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [7, 10, 3, 5, 2, 3],
    //       fill: true,
    //       backgroundColor: 'orange',
    //       borderColor: 'green',
    //       pointBorderColor: 'red',
    //       pointBackgroundColor: 'red'
    //     }]
    //   },
    //   options: {
    //     plugins: {
    //       zoom: {
    //         zoom: {
    //           wheel: {
    //             enabled: true,
    //           },
    //           pinch: {
    //             enabled: true
    //           },
    //           mode: 'xy',
    //         }
    //       }
    //     }, 
    //     responsive: true,
    //   }
    // })
   
    // this.chart2?.destroy();
    // if(this.data.type=='MultiLine'){
    //   if( this.data.data[0].result!='No Record Found'){
    //     // console.log(this.data)
    //     var actualBlaineValues: any[]=[];
    //     var predictedBlaineValues: any[]=[];
    //     var labelsValue: any[]=[];
    //     this.data.data.map((item:any)=>{
    //       actualBlaineValues.push(item.Actual_Blaine?item.Actual_Blaine:0)
    //       predictedBlaineValues.push(item.Predicted_Blaine?item.Predicted_Blaine:0);
    //       labelsValue.push(item.Date_Time.slice(11,16))
    //     })
    //     let ctx: any = document.getElementById('lineChart') as HTMLElement;
        
    //     var data = {
    //       labels: labelsValue,
    //       datasets: [
    //         {
    //           label: 'predicted Blaine',
    //           data: predictedBlaineValues,
    //           backgroundColor: 'blue',
    //           borderColor: 'lightblue',
    //           fill: false,
    //           lineTension: 0,
    //           radius: 2,
    //         },
    //         {
    //           label:'Actual Blaine',
    //           data: actualBlaineValues,
    //           backgroundColor: 'green',
    //           borderColor: 'lightgreen',
    //           fill: false,
    //           lineTension: 0,
    //           radius: 2,
    //         },
    //       ],
    //     };
  
    //     //options
    //     var options = {
    //       responsive: true,
    //       title: {
    //         display: true,
    //         position: 'top',
    //         text: 'Line Graph',
    //         fontSize: 18,
    //         fontColor: '#111',
    //       },
    //       legend: {
    //         display: true,
    //         position: 'bottom',
    //         labels: {
    //           fontColor: '#333',
    //           fontSize: 16,
    //         },
    //       },
    //     };
  
    //     this.chart2 = new Chart(ctx, {
    //       type: 'line',
    //       data: data,
    //       options: options,
    //     });
    //   }

    //   else{
    //     this.noData=true;
    //   }
    // }
    // else{
    //   if(this.data.length>0){
    //     this.data.map((item:any)=>{
    //       this.labelsArray.push(item.Date_Time)
    //       this.valueArray.push(item.Process_Values.toFixed(2))
    //     })
    
    //     // console.log(this.valueArray, this.labelsArray)
    //     let ctx: any = document.getElementById('lineChart') as HTMLElement;
    //     var data2 = {
    //       labels: this.labelsArray,
    //       datasets: [
    //         {
    //           label: this.title,
    //           data: this.valueArray,
    //           backgroundColor: 'green',
    //           borderColor: 'lightgreen',
    //           fill: false,
    //           lineTension: 0,
    //           radius: 2,
    //         },
            
    //       ],
    //     };
    
    //     //options
    //     // var options = {
    //     //   responsive: true,
    //     //   title: {
    //     //     display: true,
    //     //     position: 'top',
    //     //     text: 'Line Graph',
    //     //     fontSize: 18,
    //     //     fontColor: '#111',
    //     //   },
    //     //   legend: {
    //     //     display: true,
    //     //     position: 'bottom',
    //     //     labels: {
    //     //       fontColor: '#333',
    //     //       fontSize: 16,
    //     //     },
    //     //   },
    //     // };

    //     const config = {
    //       type: 'line',
    //       data: {
    //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //         datasets: [{
    //           label: 'My First Dataset',
    //           data: [65, 59, 80, 81, 56, 55, 40],
    //           fill: false,
    //           borderColor: 'rgb(75, 192, 192)',
    //           tension: 0.1
    //         }]
    //       },
    //       options: {
    //         plugins: {
    //           zoom: {
    //             zoom: {
    //               wheel: {
    //                 enabled: true,
    //               },
    //               pinch: {
    //                 enabled: true
    //               },
    //               mode: 'xy',
    //             }
    //           }
    //         }
    //       }
    //     };
        
    //     this.chart2 = new Chart(ctx, {
    //       type: 'line',
    //       data: data2,
    //       options: options,
    //     });
        

    //   }
    //   else{
    //     this.noData=true;
    //   }
      
    // }
      
  }
}

  

   

  

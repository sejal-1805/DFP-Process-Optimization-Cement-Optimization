import { Component, Input,OnInit } from '@angular/core';
// import { OptionsPointIntervalUnitValue } from 'highcharts';
import { Chart } from 'angular-highcharts';
import { ServicesService } from 'src/app/services.service';
@Component({
  selector: 'app-sec-popup',
  templateUrl: './sec-popup.component.html',
  styleUrls: ['./sec-popup.component.css']
})
export class SecPopupComponent implements OnInit{
  @Input() modalRef: any;
  KW_data:any=[]
  AMP_data:any=[]
  secvalue_date:any=[]
  chart4:any={}
  constructor(private _apiData:ServicesService){}

  ngOnInit(): void {
    this._apiData.getSecvalue().subscribe(({
      next:(res:any)=>{
        console.log(res);
        for (let index = 0; index < res.length; index++) {
          // console.log(res[index]);
          this.KW_data.push(res[index].sec_KW)
          this.AMP_data.push(res[index].sec_Amp)
          
          const inputDate=res[index].date.split("T")[0]
          const input=res[index].date.split("T")[1].slice(0,5)
          this.secvalue_date.push(`${inputDate} ${input}`)
        }
        console.log(this.KW_data,this.AMP_data,this.secvalue_date);
        this.getLineChart()
        
      }
    }))
  }

  getLineChart(){
    this.chart4 = new Chart({
      chart: {
        type: 'line',
        zooming: {
          type: 'x',
        },
        backgroundColor:"#3c4c66",
        width: 1300,
        height: 400,
      },

      title: {
        text: 'SEC Data',
        style:{
          color:'#FFF'
        }
      },

      credits: {
        enabled: false,
      },
      xAxis: {
        // type: "category",
        categories: this.secvalue_date,
        gridLineWidth: 1,
        lineColor: 'green',
        tickWidth: 1,
        gridLineColor:'black',
        gridLineDashStyle:"ShortDash",
        dateTimeLabelFormats: {
          day: '%e. %b',
          week: '%e. %b',
          month: "%b '%y",
          year: '%Y',
        },
        tickInterval:14, // Set the interval between ticks
        tickPixelInterval:50 ,
        labels: {
          rotation: -50,
          style:{
            color:"#FFF"
          }
        },
      },
     
      yAxis:[
        {
          title:{
            text:'KW',
            style:{
              fontSize:'15px',
              color:'#FFF'
            }
          },
          labels: {
            formatter: function () {
              return this.value + '  KW';
            },
            style:{
              color:'#fff'
            }
          },
          tickWidth:1,
          tickInterval:400,
          gridLineColor:'black',
          gridLineDashStyle:"ShortDash",
        },
        {
          title:{
            text:'AMP',
            style:{
              fontSize:'15px',
              color:'#FFF'
            }
          },
          labels: {
            formatter: function () {
              return this.value + '  AMP';
            },
          },
          tickWidth:1,
          tickInterval:50,
          gridLineColor:'black',
          gridLineDashStyle:"ShortDash",
          opposite: true,
        }
      ],
      plotOptions: {
        series: {
          // color: 'blue',
          label: {
            connectorAllowed: true,
          },
        },
       line:{
        lineWidth:2
       }
      },
      series: [
        {
          name: 'KW',
          data: this.KW_data,
          marker: {
            enabled: true,
            symbol: 'circle',
            radius: 3,
          },
          color: '#1f91e6',
          yAxis:0
        } as any,
        {
          name: 'AMP',
          data: this.AMP_data,
          marker: {
            enabled: true,
            symbol: 'diamond',
            radius: 2,
          },
          color: '#20b615',
          yAxis: 1,
        } as any,
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                // layout: "horizontal",
                align: 'center',
                // verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  }
  formatDate(data:any){
    const formattedDate = new Date(data).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      timeZone: 'UTC',
      // timeZoneName: 'short'
    });
    return formattedDate;
  }
  
}

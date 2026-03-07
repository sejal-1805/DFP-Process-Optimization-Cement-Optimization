import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-control-line',
  templateUrl: './control-line.component.html',
  styleUrls: ['./control-line.component.scss'],
})
export class ControlLineComponent implements OnInit {
  @Input() dateTimeData: any;
  @Input() seriesData: any;
  @Input() displayName: any;
  @Input() unitMeasure: any;
  chart: any = {};
  noData: boolean = false;

  ngOnChanges() {
    // console.log(this.dateTimeData);
    // console.log(this.seriesData);

    if (this.dateTimeData.length > 0 && this.seriesData.length > 0) {
      this.noData = false;
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
          style: {
            color: '#FFF',
          },
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
            style: {
              color: '#fff',
            },
          },
        },
        yAxis: {
          title: {
            text: this.unitMeasure ? `Value in ${this.unitMeasure}` : 'Value',
            style: {
              fontSize: '15px',
              color: '#FFF',
            },
          },
          labels: {
            style: {
              color: '#fff',
            },
          },
          gridLineColor: 'black',
          gridLineDashStyle: 'ShortDash',
          tickWidth: 1,
          tickPixelInterval: 100,
        },
        plotOptions: {
          series: {
            // color: 'blue',
            point: {
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
        legend: {
          itemStyle: {
            color: '#FFF',
          },
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
      console.log(this.chart);
    } else {
      this.noData = true;
      this.chart = {};
    }

    // console.log(this.chart);
  }

  ngOnInit(): void {}
}

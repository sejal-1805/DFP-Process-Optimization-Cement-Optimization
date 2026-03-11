import { Component, Input, SimpleChanges, TemplateRef } from '@angular/core';
import * as d3 from 'd3';
import { gaugeGraph } from './gaugeGraph.model';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from '../../../environments/environment';
import { RemovebracketsPipe } from 'src/app/pipes/removebrackets.pipe';
@Component({
  selector: 'app-gauge-graph',
  templateUrl: './gauge-graph.component.html',
  // styleUrls: ['./gauge-graph.component.scss'],
})
export class GaugeGraphComponent {
  @Input() type!: string;
  @Input() datasorce: any;
  @Input() timestamp: any;
  @Input() payload: any;
  trendDataSource: any;
  dateTimedata: any = [];
  seriesData: any = [];
  loadchart: boolean = true;
  gaugemap: any = {};
  urlType = {
    getChartTrendsData: environment.baseUrl + 'getChartTrendsData',
  };
  indexArray: Number[] | any;
  public gaugeType = 'semi';
  gaugeValue = 28.3;
  maxValue: number = 2000;
  modalRef?: BsModalRef;
  max: any = moment().toDate();
  min: any = moment().subtract(1, 'hour').toDate();
  selectRange: any;
  chart: any;
  chartresult: boolean = false;
  tagId: any;
  display_name: any;
  unit_measure: any;
  // gaugeLabel = "Speed";
  // gaugeAppendText = "km/hr";

  constructor(private modalService: BsModalService, private _api: gaugeGraph) {}
  ngOnInit(): void {
    // console.log(this.payload);
    // console.log([this.min,this.max]);
    // console.log(this.datasorce);
    this.selectRange=[this.min,this.max]

  //   this.datasorce.forEach((item:any)=>{
  //     console.log(item.parameterName, item.unitofmeasurement)   
  //     let uomIndex=item.parameterName.toLowerCase().indexOf(item.unitofmeasurement.toLowerCase());
  //     if(uomIndex!=-1){
  //       item.parameterName= item.parameterName.slice(0,uomIndex)
  //     }
      
       
  // })
    // console.log(this.selectRange);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.datasorce) {
      this.datasorce.forEach((item: any) => {
        if (item.actualValue <= item.minValue) {
          item.foregroundColor = 'green';
        }
        if (
          item.actualValue > item.minValue &&
          item.actualValue <= item.maxValue
        ) {
          item.foregroundColor = 'yellow';
        }
        if (item.actualValue > item.maxValue) {
          item.foregroundColor = 'red';
        }
      });
    }
  }

  public openModal(
    template: TemplateRef<any>,
    item: any,
    name: any,
    unit: any
  ) {
    this.modalRef = this.modalService.show(template);
    this.tagId = item;
    let payload = {
      Plant_Code: this.payload.Plant_Code,
      Mill: this.payload.Mill,
      Grade: this.payload.Grade,
      Model_No: this.payload.Model_No,
      tagId: this.tagId,
      startDate: moment(this.min).format('YYYY-MM-DD HH:mm'),
      endDate: moment(this.max).format('YYYY-MM-DD HH:mm'),
    };
    this.display_name = name;
    this.unit_measure = unit;
    // console.log(payload);
    this.getLineTrend(payload, this.display_name, this.unit_measure);
    this.dateTimedata = [];
    this.seriesData = [];
  }

  getLineTrend(payload: any, name: any, unit: any) {
    this._api.postCall(this.urlType.getChartTrendsData, payload).subscribe({
      next: (res: any) => {
        // console.log(res.result[0].result);

        if (res.result[0].result === 'No Record Found') {
          this.chartresult = true;
          this.loadchart = false;
          this.trendDataSource = [];
          this.dateTimedata = [];
          this.seriesData = [];
        } else {
          this.trendDataSource = res.result;
          this.trendDataSource.sort((a: any, b: any) => {
            const date1 = new Date(a.Timestamp);
            const date2 = new Date(b.Timestamp);

            if (date1 < date2) return -1;
            if (date1 > date2) return 1;

            return 0;
          });

          this.chartresult = true;
          this.loadchart = false;
          this.trendDataSource.map((item: any) => {
            // console.log(item);
            this.dateTimedata.push(
              moment(item.Timestamp).format('YYYY-MM-DD HH:mm')
            );
            this.seriesData.push(item.Value);
          });
          // console.log("in parent",this.dateTimedata,this.seriesData);
        }
        // console.log(res.result);
      },
      error: (error: any) => {
        this.loadchart = false;
        this.chartresult = true;
      },
    });
  }
  onselectDateTimeRange(event: any) {
    // console.log(event.value);
    let payload = {
      Plant_Code: this.payload.Plant_Code,
      Mill: this.payload.Mill,
      Grade: this.payload.Grade,
      Model_No: this.payload.Model_No,
      tagId: this.tagId,
      startDate: moment(event.value[0]).format('YYYY-MM-DD HH:mm'),
      endDate: moment(event.value[1]).format('YYYY-MM-DD HH:mm'),
    };
    this.trendDataSource = [];
    this.dateTimedata = [];
    this.seriesData = [];
    this.chartresult = false;
    this.loadchart = true;
    this.getLineTrend(payload, this.display_name, this.unit_measure);
  }
  closeModal() {
    this.trendDataSource = [];
    this.dateTimedata = [];
    this.seriesData = [];
    this.chartresult = false;
    this.loadchart = true;
  }
  ngOnDestroy() {
    this.modalRef?.hide();
  }

  // draw(value:any,index:any) {
  //   var self = this;
  //   // var majorTicks=Math.floor(Math.ceil(value)+50)/10;
  //   var majorTicks=6;
  //   var arcColor:String='#fff500';
  //   var maxValue=Math.ceil(value / 10) * 10 +100

  //   // if(value<500){
  //   //   arcColor='#2dc937'
  //   // }
  //   // if(value>500 && value<1500){
  //   //   arcColor='#fff500'
  //   // }
  //   // if(value>1500){
  //   //   arcColor='#cc3232'
  //   // }
  //   var gauge = function (container: any, configuration: any) {

  //     var config: any = {
  //       size:1000,
  //       // clipWidth: 200,
  //       // clipHeight: 110,
  //       ringInset: 20,

  //       pointerWidth: 5,
  //       pointerTailLength: 10,//
  //       pointerHeadLengthPercent: 0.9,

  //       minValue: 0,
  //       // maxValue: 10,

  //       minAngle: -90,
  //       maxAngle: 90,

  //       transitionMs: 750,

  //       majorTicks: `${majorTicks}`,
  //       // majorTicks:10,
  //       labelFormat: d3.format('d'),
  //       labelInset: 15,

  //       arcColorFn: d3.interpolateHsl(d3.rgb(`${arcColor}`), d3.rgb(`${arcColor}`))
  //     };
  //     var range: any = undefined;
  //     var r: any = undefined;
  //     var pointerHeadLength: any = undefined;
  //     var value = 0;

  //     var svg: any = undefined;
  //     var arc: any = undefined;
  //     var scale: any = undefined;
  //     var ticks: any = undefined;
  //     var tickData: any = undefined;
  //     var pointer: any = undefined;

  //     var donut = d3.pie();

  //     function deg2rad(deg: any) {
  //       return deg * Math.PI / 180;
  //     }

  //     function newAngle(d: any) {
  //       var ratio = scale(d);
  //       var newAngle = config.minAngle + (ratio * range);
  //       return newAngle;
  //     }

  //     function configure(configuration: any) {
  //       var prop = undefined;
  //       for (prop in configuration) {
  //         config[prop] = configuration[prop];
  //       }

  //       range = config.maxAngle - config.minAngle;
  //       r = config.size / 2;
  //       pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

  //       // a linear scale this.gaugemap maps domain values to a percent from 0..1
  //       scale = d3.scaleLinear()
  //         .range([0, 1])
  //         .domain([config.minValue, config.maxValue]);

  //       ticks = scale.ticks(config.majorTicks);
  //       tickData = d3.range(config.majorTicks).map(function () { return 1 / config.majorTicks; });

  //       arc = d3.arc()
  //         .innerRadius(r - config.ringWidth - config.ringInset)
  //         .outerRadius(r - config.ringInset)
  //         .startAngle(function (d: any, i: any) {
  //           var ratio = d * i;
  //           return deg2rad(config.minAngle + (ratio * range));
  //         })
  //         .endAngle(function (d: any, i: any) {
  //           var ratio = d * (i + 1);
  //           return deg2rad(config.minAngle + (ratio * range));
  //         });
  //     }
  //     self.gaugemap.configure = configure;

  //     function centerTranslation() {
  //       return 'translate(' + r + ',' + r + ')';
  //     }

  //     function isRendered() {
  //       return (svg !== undefined);
  //     }
  //     self.gaugemap.isRendered = isRendered;

  //     function render(newValue: any) {
  //       svg = d3.select(container)
  //       .classed("svg-container", true)
  //         .append('svg:svg')
  //         .attr('class', 'gauge gauge_meter')
  //         // .attr("preserveAspectRatio", "xMinYMin meet")
  //  .attr("viewBox", "-10 -8 600 400")
  //  //class to make it responsive
  //  .classed("svg-content-responsive", true);

  //       var centerTx = centerTranslation();

  //       var arcs = svg.append('g')
  //         .attr('class', 'arc')
  //         .attr('transform', centerTx);

  //       arcs.selectAll('path')
  //         .data(tickData)
  //         .enter().append('path')
  //         .attr('fill', function (d: any, i: any) {
  //           return config.arcColorFn(d * i);
  //         })
  //         .attr('d', arc);

  //       var lg = svg.append('g')
  //         .attr('class', 'label')
  //         .attr('transform', centerTx);
  //       lg.selectAll('text')
  //         .data(ticks)
  //         .enter().append('text')
  //         .attr('transform', function (d: any, index:any) {
  //           var ratio = scale(d);
  //           var newAngle = config.minAngle + (ratio * range);
  //           // return 'rotate(' + newAngle + ') translate(-8,' + (config.labelInset - r) + ')';
  //           if(index%2==0 && index>6){
  //             return 'rotate(' + 0 + ') translate(260,4' + ')';
  //           }
  //           else{
  //             return 'rotate(' + newAngle + ') translate(-8,' + (config.labelInset - r) + ')';

  //           }

  //         })
  //         .text(config.labelFormat);

  //       var lineData = [[config.pointerWidth / 2, 0],
  //       [0, -pointerHeadLength],
  //       [-(config.pointerWidth / 2), 0],
  //       [0, config.pointerTailLength],
  //       [config.pointerWidth / 2, 0]];
  //       var pointerLine = d3.line().curve(d3.curveLinear)
  //       var pg = svg.append('g').data([lineData])
  //         .attr('class', 'pointer')
  //         .attr('transform', centerTx);

  //       pointer = pg.append('path')
  //         .attr('d', pointerLine/*function(d) { return pointerLine(d) +'Z';}*/)
  //         .attr('transform', 'rotate(' + config.minAngle + ')')

  //       update(newValue === undefined ? 0 : newValue);
  //     }
  //     self.gaugemap.render = render;
  //     function update(newValue: any, newConfiguration?: any) {
  //       if (newConfiguration !== undefined) {
  //         configure(newConfiguration);
  //       }
  //       var ratio = scale(newValue);
  //       var newAngle = config.minAngle + (ratio * range);
  //       pointer.transition()
  //         .duration(config.transitionMs)
  //         .ease(d3.easeElastic)
  //         .attr('transform', 'rotate(' + newAngle + ')');
  //     }
  //     self.gaugemap.update = update;

  //     configure(configuration);

  //     return self.gaugemap;
  //   };
  //   // Math.floor(Math.random()*(999-100+1)+100)
  //   var size=window.innerWidth
  //   var powerGauge = gauge(`#g${index}`, {
  //     size: 400,
  //     clipWidth: 300,
  //     clipHeight: 50,
  //     ringWidth: 30,
  //     // maxValue: Math.ceil(value / 10) * 10
  //     maxValue: `${maxValue}`,
  //     transitionMs: 4000,
  //     // size: 150,
  //     // clipWidth: 150,
  //     // clipHeight: 150,
  //     // ringWidth: 20,
  //     // maxValue: Math.ceil(value / 10) * 10 + 100,
  //     // transitionMs: 4000,

  //   });
  //   console.log(powerGauge);

  //   powerGauge.render(400);
  //   // var powerGauge = gauge('#millTempOl', {
  //   //   size: 300,
  //   //   clipWidth: 300,
  //   //   clipHeight: 300,
  //   //   ringWidth: 30,
  //   //   maxValue: 10,
  //   //   transitionMs: 4000,
  //   // });
  //   // powerGauge.render(7);
  //   // var powerGauge = gauge('#millRejectFlow', {
  //   //   size: 300,
  //   //   clipWidth: 300,
  //   //   clipHeight: 300,
  //   //   ringWidth: 30,
  //   //   maxValue: 10,
  //   //   transitionMs: 4000,
  //   // });
  //   // powerGauge.render(8);
  //   // var powerGauge = gauge('#millTempIl', {
  //   //   size: 300,
  //   //   clipWidth: 300,
  //   //   clipHeight: 300,
  //   //   ringWidth: 30,
  //   //   maxValue: 10,
  //   //   transitionMs: 4000,
  //   // });
  //   // powerGauge.render(5);

  //   // var powerGauge = gauge('#badHeight', {
  //   //   size: 300,
  //   //   clipWidth: 300,
  //   //   clipHeight: 300,
  //   //   ringWidth: 30,
  //   //   maxValue: 10,
  //   //   transitionMs: 4000,
  //   // });
  //   // powerGauge.render(10);
  //   // var powerGauge = gauge('#grindingPr', {
  //   //   size: 300,
  //   //   clipWidth: 300,
  //   //   clipHeight: 300,
  //   //   ringWidth: 30,
  //   //   maxValue: 10,
  //   //   transitionMs: 4000,
  //   // });
  //   // powerGauge.render(5);

  // }
}

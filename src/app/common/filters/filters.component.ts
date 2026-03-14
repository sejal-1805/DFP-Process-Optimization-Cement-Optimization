import { Component, EventEmitter, Input, Output } from '@angular/core';
import {filtersModel} from './filtersModel.model'
import { environment } from 'src/environments/environment';
import { SocketService } from '../../services/socket.service';
import { ToasterService } from '../../services/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LogLevel } from '@azure/msal-browser';
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  // styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  filtersUrlType={
    'getLatestFilteredData': environment.baseUrl+ 'getLatestFilteredData',
    'getDropDownFilter': environment.baseUrl+'getDropDownFilter',
    'getBlaineRangeList': environment.baseUrl+'getBlaineRangeList',
    'updateBlaineRangeList': environment.baseUrl+'updateBlaineRangeList'
  }
  @Input() filtersData:any;
  @Input() type:any;
  @Output() filterData=new EventEmitter<any>();
  @Input() filtersDate:any;
  @Input() showRange:any=false;
  dropDownData!: { plantData: { value: string; viewValue: string; }[]; millsData: { value: string; viewValue: string; }[]};
  dropdownData: any;
  plantData: any;
  // dropDownData: any;
  allDropDownData: any;
  millsData!: { value: any; viewValue: any; }[];
  gradeData: any;
  rangeData!:any;
  selectedBlaineRange:any;
  showBlaineRange:boolean=false;
  filterDate:any;
  activeRoute: any;
  dataSource:any
  current:any=moment()
  midnight=moment().startOf('day')
  min:any = this.midnight.toDate();
  flags:any
  newDate:any
  urlLink:any
  // min = this.current.format('MM/DD/YYYY, h:mm A');
  max: any = this.current.toDate()
  cemmentPlantName:any;
  allPlantsData: any;
  cement_dropDown:any
  payload!:{
    Plant_Code:any,
    Mill:any,
    Grade:any,
    Model_No:any,
    dateTime:any
  }
  constructor(private filtersModel:filtersModel,private socketService: SocketService,
      private toaster:ToasterService,private activeroute: ActivatedRoute, 
      private http:HttpClient, private router:Router){};


  getIpAddress(){
    this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
      // console.log(res.ip);
      localStorage.setItem("cement_Ip_Address",res.ip)
    },(error:any)=>{
      console.log(error);
      localStorage.setItem("cement_Ip_Address","Ip not found")
    })
          
  }


  displayName:any;
  private retryInterval: any;
  ngOnInit() {

    this.urlLink=window.location.href

    window.addEventListener('beforeunload',()=>{
      // console.log("refresh");
      localStorage.removeItem("cementOpt_dropDownData");
      this.getDropDownData()
    })

    this.getLatestFilterData()
    // this.adLogin();
    this.payload={
      Plant_Code: 'null',
      Mill: 'null',
      Grade: 'null',
      Model_No: 0,
      dateTime: null,
    }

    this.filtersData = {
      Plant_Code: 'null',
      Mill: 'null',
      Grade: 'null',
      Model_No: 0,
      dateTime: moment(this.max).format("YYYY-MM-DD"),
      dateRange:[this.min, this.max]
    };
    this.filtersDate= this.filtersDate?.toString()
    // console.log(this.filtersDate);

    this.cement_dropDown=JSON.parse(localStorage.getItem("cementOpt_dropDownData") || '[]')
    // console.log(this.cement_dropDown);
    
    // Always try to load dropdown data on init
    this.getDropDownData();
    
    // Retry loading data if it hasn't loaded within 3 seconds (wait for auth)
    this.retryInterval = setInterval(() => {
      if(!this.plantData || this.plantData.length === 0) {
        this.getDropDownData();
      } else {
        clearInterval(this.retryInterval);
      }
    }, 2000);


    if(this.urlLink.includes("home")){
      this.getRangesData();
      this.getBlaineRangeList();
      
    }
    

    const check=sessionStorage.getItem('submitCount_CementOPT')

    if(check){
      // console.log("inside filter if");
      
      sessionStorage.removeItem('submitCount_CementOPT')
    }
    
    let filtersState=localStorage.getItem('cementFiltersState')

  }


  public getRangesData(){
    this.rangeData=this.filtersModel.getRangesData()
  }

  

  ngOnChanges(){
    // console.log(this.filtersData); 
    if(this.filtersData){
      this.filtersData.dateRange=[this.filtersData.startDate,this.filtersData.endDate];
    }
    
    // console.log(this.filtersData.dateRange);
    
  }

  ngAfterViewInit(){
    // console.log("apiiii");
    
    this.cement_dropDown=JSON.parse(localStorage.getItem("cementOpt_dropDownData") || '[]')

    if(this.cement_dropDown.length!==0){
      this.getDropDownData()
    }
  }


  showSuccessMessage(){
    this.toaster.addSuccessToast();
  }

  showErrorMessage(){
    this.toaster.addErrorToast('Something Went Wrong, Please Try Again');
  }

  public getLatestFilterData(){
    // console.log("lklklkl",this.payload);
    if(this.payload){
      // console.log("iniside if");
      
      let payload={
        Plant_Code: this.payload.Plant_Code,
        Mill: this.payload.Mill,
        Grade:this.payload.Grade,
        dateTime:this.payload.dateTime,
        Model_No:this.payload.Model_No
      }
      // console.log(payload);

      this.filtersModel.postCall(this.filtersUrlType.getLatestFilteredData,payload).subscribe({
        next:(result:any)=>{
          this.dataSource=this.filtersModel.parseLatestFilterData(result)

          this.payload.dateTime=result.result.date_time;
          this.flags.showLoader=false
        },
        error:(error:any)=>{
          this.showErrorMessage()
        }
      })
      
    }
    
  }

  public getDropDownData() {
    let payload = {
      "Plant_Code": "",
      "Mill": "",
      "Grade": ""
    }

    this.allPlantsData=JSON.parse(localStorage.getItem("cement_allplant") || '[]')
    this.cement_dropDown=JSON.parse(localStorage.getItem("cementOpt_dropDownData") || '[]')
    
    if(this.cement_dropDown.length===0){  
      this.filtersModel.postCall(this.filtersUrlType.getDropDownFilter, payload).subscribe(
        (result: any) => {
          if (result && result.status == 'Success') {
            this.allDropDownData = result.result;
            // if(this.allPlantsData){
              localStorage.setItem("cementOpt_dropDownData",JSON.stringify(this.allDropDownData))
              var modifiedFiltersData = this.filtersModel.getPlantData(this.allDropDownData, this.allPlantsData);
              // var modifiedFilterMill=this.filtersModel.getMillsBasesPlant()
              // console.log(modifiedFiltersData);
              
              this.plantData = modifiedFiltersData.plantData;
            // console.log("plants data",this.plantData);
            
              // var modifiedFiltersMillData=this.filtersModel.getMillsBasesPlant(this.plantData,result.result)
              // console.log(modifiedFiltersMillData);
              localStorage.setItem('cementOptPlants',JSON.stringify(this.plantData))
            // }
            // this.millsData=modifiedFiltersData.millsData;
            // this.gradeData=modifiedFiltersData.gradeData;
  
            let filterState=JSON.parse(localStorage.getItem('cementFiltersState') || '{}')
             if(filterState.Plant_Code){
              // console.log("inside if");
              
              this.filtersData.Plant_Code=filterState.Plant_Code
              this.filtersData.Mill=filterState.Mill
              this.filtersData.Grade=filterState.Grade
              this.payload.Mill=filterState.Mill
              this.payload.Grade=filterState.Grade
              // console.log(this.filtersData.Plant_Code,this.filtersData.Mill,this.filtersData.Grade);
              // console.log(this,payload.Mill,this.payload.Grade);
              
              
              this.getMillsBasesPlant()
              this.getGradeBasesPlantMills()
              
              if(filterState.dateRange){
                // if("if--------------------------")
                this.filtersData = {
                  Plant_Code: filterState.Plant_Code,
                  Mill: filterState.Mill,
                  Grade: filterState.Grade,
                  Model_No: 0,
                  dateTime: moment(this.max).format("YYYY-MM-DD HH:mm"),
                  dateRange:[moment(this.min).toDate(),moment(this.max).toDate()]
                };
              }else{
                // console.log("else--------------------else---------");
                
                this.filtersData = {
                  Plant_Code: filterState.Plant_Code,
                  Mill: filterState.Mill,
                  Grade: filterState.Grade,
                  Model_No: 0,
                  dateTime: moment(this.max).format("YYYY-MM-DD HH:mm"),
                  // dateRange:[moment(filterState.dateRange[0]).toDate(),moment(filterState.dateRange[1]).toDate()]
                };
              }
              // console.log(this.filtersData);
              this.onSubmit()
             }else{
              // console.log("else ");
              this.filtersData = {
                Plant_Code: 'null',
  
                Mill: 'null',
  
                Grade: 'null',
  
                Model_No: 0,
  
                dateTime: moment(this.max).format("YYYY-MM-DD HH:mm"),
                dateRange:[this.min, this.max]
              };
              // console.log(this.filtersData);
              
             }
            
          }
          else {
            // console.log("else filter");
            
          }
  
          // this.toaster.addSuccessToast();
        },
        (error: any) => {
          // this.toaster.addErrorToast('Something Went Wrong, Please Try Again');
        }
      )
    }else{

      var modifiedFiltersData = this.filtersModel.getPlantData(this.cement_dropDown, this.allPlantsData);
      // var modifiedFilterMill=this.filtersModel.getMillsBasesPlant()
      // console.log(modifiedFiltersData);
      
      this.plantData = modifiedFiltersData.plantData;
    // console.log("plants data",this.plantData);
    
      // var modifiedFiltersMillData=this.filtersModel.getMillsBasesPlant(this.plantData,result.result)
      // console.log(modifiedFiltersMillData);
      localStorage.setItem('cementOptPlants',JSON.stringify(this.plantData))
    // }
    // this.millsData=modifiedFiltersData.millsData;
    // this.gradeData=modifiedFiltersData.gradeData;

    let filterState=JSON.parse(localStorage.getItem('cementFiltersState') || '{}')
     if(filterState.Plant_Code){
      // console.log("inside if");
      
      this.filtersData.Plant_Code=filterState.Plant_Code
      this.filtersData.Mill=filterState.Mill
      this.filtersData.Grade=filterState.Grade
      this.payload.Mill=filterState.Mill
      this.payload.Grade=filterState.Grade
      // console.log(this.filtersData.Plant_Code,this.filtersData.Mill,this.filtersData.Grade);
      // console.log(this,payload.Mill,this.payload.Grade);
      
      
      this.getMillsBasesPlant()
      this.getGradeBasesPlantMills()
      
      if(filterState.dateRange){
        // if("if--------------------------")
        this.filtersData = {
          Plant_Code: filterState.Plant_Code,
          Mill: filterState.Mill,
          Grade: filterState.Grade,
          Model_No: 0,
          dateTime: moment(this.max).format("YYYY-MM-DD HH:mm"),
          dateRange:[moment(this.min).toDate(),moment(this.max).toDate()]
        };
      }else{
        // console.log("else--------------------else---------");
        
        this.filtersData = {
          Plant_Code: filterState.Plant_Code,
          Mill: filterState.Mill,
          Grade: filterState.Grade,
          Model_No: 0,
          dateTime: moment(this.max).format("YYYY-MM-DD HH:mm"),
          // dateRange:[moment(filterState.dateRange[0]).toDate(),moment(filterState.dateRange[1]).toDate()]
        };
      }
      


      // console.log(this.filtersData);
      this.onSubmit()
     }else{
      // console.log("else ");
      
      this.filtersData = {
        Plant_Code: 'null',

        Mill: 'null',

        Grade: 'null',

        Model_No: 0,

        dateTime: moment(this.max).format("YYYY-MM-DD HH:mm"),
        dateRange:[this.min, this.max]
      };
      // console.log(this.filtersData);
      
     }
    }
   
  }

  public updateBlaineRange(){
    // console.log(this.selectedBlaineRange);
    
    let payload={
      "Plant_Code": this.filtersData.Plant_Code,
      "Mill": this.filtersData.Mill,
      "Grade": this.filtersData.Grade,
      "Min":this.selectedBlaineRange.BLAIN_MIN,
      "Max":this.selectedBlaineRange.BLAIN_MAX,
      "Active":true

    }
    this.filtersModel.postCall(this.filtersUrlType.updateBlaineRangeList, payload).subscribe(
      (result: any) => {
        if(result.error===false){
          this.getBlaineRangeList();
          this.showSuccessMessage();
        }else{
          this.showErrorMessage()
        }
      },
      (error:any)=>{
        this.showErrorMessage()
      })
  }

  public updateBlaineRangeRadio(data:any){
    this.selectedBlaineRange={
      "BLAIN_MAX":data.BLAIN_MAX,
      "BLAIN_MIN":data.BLAIN_MIN
    };
    
  }

 
  public getBlaineRangeList(){
    this.activeroute.url.subscribe(
      (event:any)=>{
        // console.log(event[0].path);
        
        this.activeRoute=event[0].path;
        
      }
      
    )
    // console.log(this.filtersData);
    let payload
    let filter=JSON.parse(localStorage.getItem('cementFiltersState') || '{}')
    // console.log(filter);

    if(Object.keys(filter).length){
      // console.log("filter length")
      // console.log("this is else pART blain list");
      payload={
        "Plant_Code":filter.Plant_Code,
        "Mill": filter.Mill,
        "Grade": filter.Grade,
        "dateTime":null
      }

      this.filtersModel.postCall(this.filtersUrlType.getBlaineRangeList, payload).subscribe(
        (result: any) => {
          // console.log(result);
          if(result && result.status=='Success'){
            this.rangeData=result.result;
            this.selectedBlaineRange=this.rangeData
            // console.log(this.selectedBlaineRange);
            
            if(this.activeRoute=='home'){
              this.showRange=true;
            }
            else{
              this.showRange=false;
            }
           
          }
          else{
            this.rangeData=[];
            this.showRange=false;
          }
          
          
        },
        (error:any)=>{
          // console.log(error);
          
        })
    }
    // if(!filter.Plant_Code){
    //   console.log("this is if blain list");
      
    //   payload={
    //     "Plant_Code": this.filtersData.Plant_Code,
    //     "Mill": this.filtersData.Mill,
    //     "Grade": this.filtersData.Grade,
    //     "dateTime":null
    //   }
    // }
    // else{
    //   console.log("this is else pART blain list");
    //   payload={
    //     "Plant_Code":filter.Plant_Code,
    //     "Mill": filter.Mill,
    //     "Grade": filter.Grade,
    //     "dateTime":null
    //   }
    // }
    
    
    // this.filtersModel.postCall(this.filtersUrlType.getBlaineRangeList, payload).subscribe(
    //   (result: any) => {
    //     console.log(result);
    //     if(result && result.status=='Success'){
    //       this.rangeData=result.result;
    //       if(this.activeRoute=='home'){
    //         this.showRange=true;
    //       }
    //       else{
    //         this.showRange=false;
    //       }
         
    //     }
    //     else{
    //       this.rangeData=[];
    //       this.showRange=false;
    //     }
        
        
    //   },
    //   (error:any)=>{
    //     console.log(error);
        
    //   })
  }


  

  public getMillsBasesPlant() {
    this.millsData=[];
    this.gradeData=[];
    this.filtersData.Mill=null;
    this.filtersData.Grade=null;
    
    this.plantData.forEach((item:any)=>{
      if(item.value==this.filtersData.Plant_Code){
        this.displayName=item.displayName;
      }
    });
  //   this.filtersData = {
  //     Mill: 'null',
  //     Grade: 'null'
  // }
  // console.log(this.filtersData.Plant_Code);
  
    this.millsData = this.filtersModel.getMillsBasesPlant(this.filtersData.Plant_Code, this.allDropDownData ? this.allDropDownData : this.cement_dropDown)
    // this.gradeData = this.filtersModel.getGradeBasesPlantMills(this.filtersData.Plant_Code, this.filtersData.Mill, this.allDropDownData)
    // console.log(this.millsData);
    
  }

  public getPlantname(plant_code:any){
    // console.log("hi",plant_code);
    this.plantData.forEach((item:any)=>{
      if(item.value===plant_code){
        // console.log(item.viewValue,"dldhfldhsldsjvlshv");
        this.cemmentPlantName=item.viewValue
        localStorage.setItem("cementPlant",this.cemmentPlantName)
        
      }
    })
    
  }

  public getGradeBasesPlantMills() {

    this.gradeData=[];
    this.filtersData.Grade=null;
    // console.log(this.filtersData.Mill,this.payload.Mill);
    
    this.gradeData = this.filtersModel.getGradeBasesPlantMills(this.filtersData.Plant_Code, this.filtersData.Mill? this.filtersData.Mill : this.payload.Mill, this.allDropDownData ? this.allDropDownData : this.cement_dropDown)
    // console.log(this.gradeData);
    
  }

  
  onSelectDatetime(value:any){
    // this.filtersData.dateTime=value;
    let newdate=moment(value).format('YYYY-MM-DD')

    // console.log(newdate);
    
    
    this.filtersData.dateTime = newdate;

  }

  onSelectDatetimes(value:any){
    this.newDate=moment(value).format("YYYY-MM-DD HH:mm")
    this.filtersData.dateTime = this.newDate;
    this.filtersData.dateRange=[moment(this.newDate).format("YYYY-MM-DD 00:00"),moment(this.newDate).format("YYYY-MM-DD 23:59")]
    
    
  }


  onSelectDateRange(value:any){
    // console.log(value);
    
      this.filtersData.dateRange=value;
      
  }
  

  public onSubmit(){
    this.filtersData.Model_No=0;
    // console.log(this.displayName);
    
    this.filtersData.displayName = this.displayName;
    this.filterData.emit(this.filtersData)
    // console.log(this.filtersData);

    sessionStorage.setItem('submitCount_CementOPT','1')
    
    // this.getBlaineRangeList()
  }

  ngOnDestroy(){
    if(this.retryInterval){
      clearInterval(this.retryInterval);
    }
  }
}

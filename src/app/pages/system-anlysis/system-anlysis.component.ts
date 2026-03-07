import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {environment} from '../../../environments/environment';
import {CementMillModel} from './systemAnlysis.model';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { SocketService } from '../../services/socket.service';
@Component({
  selector: 'app-system-anlysis',
  templateUrl: './system-anlysis.component.html',
  // styleUrls: ['./system-anlysis.component.scss']
})
export class SystemAnlysisComponent {
  CementUrlType={
    'getLatestFilteredData': environment.baseUrl+ 'getLatestFilteredData',
    'getRecommedationData':environment.baseUrl+ 'getRecommedationData',
    'updateActions': environment.baseUrl+'updateActions',
    'getDropDownFilter': environment.baseUrl+'getDropDownFilter'
  }
  CementUrl:any={
    // "addLog":'https://i4.utclconnect.com/uat/addLog'
    "addLog":`${environment.baseUrlApi}addLog`
    // "addLog":'https://0207pwadeh.execute-api.ap-south-1.amazonaws.com/uat/addLog'
  }
  sidebarExpanded = true;
  modalRef?: BsModalRef;
  showloader:boolean=false;
  dataSource!: { Control_Tags_Data: []; Resultant_Tags_Data: []; filtersData: { Plant_Code: any; Mill: any; Grade: any;dateTime:any }; timestamp:any };
  no_recommendation:number=0;
  recommendationDataSource: any;
  showEditIcon:Boolean=true;
  @ViewChild('recommedationtemplate') recommedationtemplate!:TemplateRef<any>;
  popupInterval!:any;
  dropdownData: any;
  plantData: any;
  filtersData!: { Plant_Code: string; Mill: string; Grade: string; dateTime: string; };
  recommendationDate: any=new Date();
  payload!: { Plant_Code: any; Mill: any; Grade: any; Model_No: number; dateTime: any; };
  flags!: { showLoader: boolean; };
  cementCheckToken:boolean=false
  urlLink:any
  private intervalId: any;
  private recommendedIntervalId: any;
  getCementLatestData:boolean=true;
  displayName: any;
  recommendationcheckData:boolean=false
  isCheckBoxAcknowledge: boolean = true;
  checkNotification:boolean=false
  // recommendationDate: any=new Date();
  constructor(private modalService: BsModalService,private cementMillModel:CementMillModel,
              private toaster:ToasterService, private router:Router,private http:HttpClient,
              private socketService: SocketService){}

 

  ngOnInit(){
    // console.log(this.dataSource);
    // this.getLatestData()
    this.urlLink=window.location.href
    this.checkNotification=false
    // console.log(this.modalService.getModalsCount());

    // console.log(this.dataSource.Control_Tags_Data.length==0 && this.dataSource.Resultant_Tags_Data.length==0)
    
    this.flags={
      'showLoader':false
    }
    // console.log(this.flags);
    
    this.adLogin();
    // this.connectSocket();
    let filter=JSON.parse(localStorage.getItem('cementFiltersState') || '{}')
    // console.log(filter);
    // if(filter.Plant_Code){
    //   this.payload={
    //     "Plant_Code": filter.Plant_Code,
    //     "Mill": filter.Mill,
    //     "Grade": filter.Grade,
    //     "Model_No": filter.Model_No,
    //     "dateTime":null
    //   }
    // }
    // else{
    //   this.payload={
    //     "Plant_Code": 'null',
    //     "Mill": 'null',
    //     "Grade": 'null',
    //     "Model_No": 0,
    //     "dateTime":null
    //   }
    // }
    this.payload={
          "Plant_Code": 'null',
          "Mill": 'null',
          "Grade": 'null',
          "Model_No": 0,
          "dateTime":null
        }
    // console.log(this.payload);
    
    // this.filtersData={
    //   Plant_Code:"null",
    //   Mill:"null",
    //   Grade:"null",
    //   "dateTime":"null"
    // }

    // this.dataSource={Control_Tags_Data:[],Resultant_Tags_Data:[], filtersData:{
    //       Plant_Code: 'null',
    //       Mill: 'null',
    //       Grade:'null',
    //       dateTime:'null'
    //   }
    // }
    
    // this.popupInterval=setInterval(()=>{
    //   this.getRecommendationPopupData();
    //   this.openModal(this.recommedationtemplate);

    // },60000)
    this.no_recommendation=0;
  }



  onChangeFilter(value:any){

    // console.log(value);
    
    
    this.payload=value;
    
    this.no_recommendation=0;
    this.displayName = value.displayName;
    this.checkNotification=false

   
    if(this.payload.dateTime && typeof this.payload.dateTime !=='string'){
      
      this.payload.dateTime=moment(this.payload.dateTime).format('YYYY-MM-DD HH:mm:00');
    }
    // console.log("kkklklklklklklklklkl",this.payload);
    
    localStorage.setItem('cementFiltersState', JSON.stringify(this.payload));
    
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
    if (this.recommendedIntervalId) {
      clearInterval(this.recommendedIntervalId)
    }
    this.connectSocket();
    this.getLatestData();
    this.addLog(this.payload);
    this.openModal(this.recommedationtemplate)
    this.getRecommendationPopupData()
    // this.sendMessageSocket();
    this.sendRecommendationSocketData(this.recomendationSocketPayload());
    this.recommendedIntervalId = setInterval(() => {
      this.sendRecommendationSocketData(this.recomendationSocketPayload());
    }, 60000)
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
    

    this.cementMillModel.postCall(this.CementUrl.addLog,payload).subscribe({
      next:(res:any)=>{
        // console.log(res);
      }
    })
    
  }

  public recomendationSocketPayload(){
      var recSocPayload={
        action: "cementOpt",
        "optType":"cement",
        "Mill": this.payload.Mill,
        "Grade":this.payload.Grade,
        "Plant_Code": this.payload.Plant_Code,
        "Model_No": 0
      }

      return recSocPayload
  }


  public sendMessageSocket(){
    console.log("Latest Data socket");
    let plants= JSON.parse(JSON.stringify(localStorage.getItem('cementOptPlants')));
    var updatedControlTags:any
    var counter=0;
    plants=JSON.parse(plants);
    
    let SelectedPlant=plants.filter((item:any)=>{
      if(this.payload.Plant_Code==item.value){
        // console.log(item.viewValue);
        return item.viewValue
      }
    })

    // console.log(SelectedPlant[0].viewValue);
    

    SelectedPlant= SelectedPlant.filter((item:any)=>{
      if(item !==null && item !==undefined)
      return item
    })
    // console.log(SelectedPlant);
    let control_tags_list=[],result_tags_list=[]
    control_tags_list=this.dataSource.Control_Tags_Data.map((item:any)=>{
      return item.iotTagId;
    })
    result_tags_list=this.dataSource.Resultant_Tags_Data.map((item:any)=>{
      return item.iotTagId
    })
    // console.log("id of control tags",control_tags_list);
    

    let newSocketpayload={
      action: "cementLiveOpt",
      "Plant_Code":SelectedPlant[0].viewValue,
      "Control_Tags_Data":control_tags_list,
      "Resultant_Tags_Data":result_tags_list
    }

    // console.log(newSocketpayload,"new Socket payload");
    var socket=this.socketService.send(JSON.stringify(newSocketpayload));
    if(socket){
      socket.addEventListener("message", (event:any) => {
        var eventData= JSON.parse(event.data)
        // console.log(eventData);
        if(eventData?.result){
          if (eventData?.result?.Control_Tags_Data && Object.keys(eventData?.result?.Control_Tags_Data)?.length) {
            this.dataSource.Control_Tags_Data.forEach((item:any)=>{
              item.actualValue=eventData?.result?.Control_Tags_Data[item.iotTagId];
            })
          }

          if (eventData?.result?.Resultant_Tags_Data && Object.keys(eventData?.result?.Resultant_Tags_Data)?.length) {
            this.dataSource.Resultant_Tags_Data.forEach((item:any)=>{
              item.actualValue = eventData?.result?.Resultant_Tags_Data[item.iotTagId];
            })
          }
        }
      });
    }
  }

  onSelectDatetime(value:any){
    this.filtersData.dateTime=value;
  }


  adLogin() {
    var accessToken = localStorage.getItem('cement_access_token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    // var url = "https://i4.utclconnect.com/uat/users/adLoginBasic";
    // var url = "https://i4.utclconnect.com/api/users/adLoginBasic";
    var url = `${environment.baseUrlApi}users/adLoginBasic`;
    const httpOptions = {
      headers: headers
    };
    this.http.post(url, {}, httpOptions).subscribe(
      (result: any) => {
        localStorage.setItem("cement_allplant",JSON.stringify(result.data.Plants));
        localStorage.setItem('cement_accessToken', result.data.token)
        localStorage.setItem('cement_user', result.data.UserName)
        localStorage.setItem('cement_userEmail',result.data.UserID)

        this.cementCheckToken=true
        // this.allPlantsData=result.data.Plants;
        // this.getDropDownData();
        // this.getLatestData();
       
        var index = result.data.Modules.findIndex((item: any) => {
          return item.Module === 'OPT'
        })


        if (index != -1) {
          this.router.navigate(['/home'])
          localStorage.setItem('hasOptAccess', 'true')
        }
        else {
          this.router.navigate(['/login'])
          localStorage.setItem('hasOptAccess', 'false')
        }

      },
      (error:any)=>{
        this.router.navigate(['/login'])
      })

      this.getIpAddress()

  }

  getIpAddress(){
    this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
      // console.log(res.ip);
      localStorage.setItem("cement_Ip_Address",res.ip)
    },(error:any)=>{
      // console.log(error);
      localStorage.setItem("cement_Ip_Address","Ip not found")
    })
  }

  public getLatestData(){
    // console.log(this.payload)
    let count=sessionStorage.getItem('submitCount_CementOPT')
    // this.payload.Plant_Code=this.payload.Plant_Code.value;
    let payload={
      Plant_Code:this.payload.Plant_Code,
      Mill:this.payload.Mill,
      Grade:this.payload.Grade,
      Model_No:this.payload.Model_No,
      dateTime:count ? moment.utc(this.payload.dateTime).format("YYYY-MM-DD HH:mm") : ""
    }

    this.flags.showLoader=true
    // console.log(payload);

      this.cementMillModel.postCall(this.CementUrlType.getLatestFilteredData,payload).subscribe(
        (result:any)=>{
          if (result.result.result==='No Record Found') {
            this.flags.showLoader=false;
            this.getCementLatestData=false;
          } else {
            this.getCementLatestData=false;
            this.dataSource= this.cementMillModel.parseLatestFilterData(result);
            // console.log(this.dataSource,"get latest filter data");
            this.payload.dateTime=result.result.timestamp
            // this.getRecommendationPopupData();
            this.flags.showLoader=false;
            this.sendMessageSocket();
            this.intervalId = setInterval(() => {
              this.sendMessageSocket();
            }, 60000)
          }
        },
        (error:any)=>{
          console.log(error)
          this.flags.showLoader=false;
          this.getCementLatestData=true
          this.showErrorMessage();
        }
      )
  }

  ngOnDestroy(){
    this.modalRef?.hide()
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.recommendedIntervalId) {
      clearInterval(this.recommendedIntervalId);
    }
  }

  public showTextBox(item:any){
    // this.showEditIcon= !this.showEditIcon;
    item.showTextBox= !item.showTextBox;
  }

  public checkBoxAck(event: any,data:any){
    this.isCheckBoxAcknowledge = event.target.checked;
    data.isAcknowledged=this.isCheckBoxAcknowledge ? "Yes":"No"
  }

  public updateRecommendation(item:any){
    let userEmail_Cement=localStorage.getItem('cement_userEmail')
    // console.log(item);
    let updatePayload = {
      "Plant_Code": this.payload.Plant_Code,
      "Mill": this.payload.Mill,
      "Grade":this.payload.Grade,
      "dateTime":item.timestamp,
      "TagId": item.iotTagId,
      "actionTaken":item.actionTaken,
      "acknowledgeBy":userEmail_Cement,
      "acknowledgeDateTime": new Date().toJSON(),
      "isAcknowledged":item.isAcknowledged,
      "isSnoozed": 0,
      "comments":item.comments,
      "isViewed": "Yes",
      "Model_No":0,
    }
    
    // let payload={...updatePayload, ...this.dataSource.filtersData};
    // console.log(updatePayload);
    this.cementMillModel.postCall(this.CementUrlType.updateActions,updatePayload).subscribe(
      (result:any)=>{
        if(result.error===false){
          this.getRecommendationPopupData();
          this.showSuccessMessage();
        }else{
          this.getRecommendationPopupData();
          this.showErrorMessage();
        }
      },
      (error:any)=>{
        console.log(error);
        this.showErrorMessage();
      })
  }

  public sendRecommendationSocketData(msg: any) {
    const socket = this.socketService.send(JSON.stringify(msg)) 
     if (socket) {
      socket.addEventListener("message", (event:any) => {
        var eventData= JSON.parse(event.data)
        // console.log("Recommended Socket Response", eventData)
        if(eventData?.result){
          this.recommendationDataSource = eventData.result;
          this.no_recommendation = this.recommendationDataSource?.length;
          if(this.modalService.getModalsCount() === 0){
            this.openModal(this.recommedationtemplate)
          }
          if (eventData?.result[0]?.timestamp) {
            this.recommendationDate=moment.utc(eventData.result[0].timestamp).format("YYYY-MM-DD HH:mm");
          }
        }
      })
    }
  }

  showSuccessMessage(){
    this.toaster.addSuccessToast();
  }

  showErrorMessage(){
    this.toaster.addErrorToast('Something Went Wrong, Please Try Again');
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    // this.checkNotification=true;
  
    // console.log(this.modalService.getModalsCount());
    
  }
  public bellClick(){
    this.checkNotification=true;
  }
  public closeRecomPop(){
    this.checkNotification=true
    this.no_recommendation=0
  }

  public connectSocket(){
    this.socketService.disconnect();
    this.socketService.connect();
    // this.socketService.recommendationSocket();
  }

  public getRecommendationPopupData(){
    // console.log(this.payload.dateTime, "dateTime");
    
    // this.payload.dateTime=this.dataSource.filtersData.dateTime;
    // console.log(this.payload.dateTime);
    let count=sessionStorage.getItem('submitCount_CementOPT')

    let payload={
            "Plant_Code": this.payload.Plant_Code,
            "Mill": this.payload.Mill,
            "Grade": this.payload.Grade,
            "Model_No": this.payload.Model_No,
            "dateTime":count? moment.utc(this.payload.dateTime).format("YYYY-MM-DD HH:mm"):""
      
    }
    this.recommendationcheckData=false
    this.cementMillModel.postCall(this.CementUrlType.getRecommedationData,payload).subscribe(
      (result:any)=>{
        // console.log(result);
        if(result.result.result!='No Record Found'){
          // console.log(result.result);
          this.recommendationcheckData=false;
          
          
          this.recommendationDataSource=result.result;
          this.no_recommendation=this.checkNotification?0: this.recommendationDataSource?.length;
          // this.recommendationDate=moment(result.result[0].timestamp).toISOString();
          // this.recommendationDate=moment(result.result[0].timestamp).subtract(330,'minutes').toDate().toString();
          this.recommendationDate = moment
              .utc(result.result[0].timestamp)
              .format('ddd YYYY-MM-DD HH:mm');
          // this.recommendationDate=moment.utc(result.result[0].timestamp).format("ddd YYYY-MM-DD HH:mm")
          
          // console.log(this.recommendationDate);
          
        } else {
          this.recommendationDataSource=[];
          this.recommendationcheckData=true
        }
       
    
        this.recommendationDataSource.map((item:any)=>{
          item.userComment=''
          item.showTextBox=false
        })
        // this.recommendationTime=this.recommendationDataSource[0].timestamp.slice()
        // this.dataSource= this.cementMillModel.parseLatestFilterData(result);
        // this.showloader=true;
      },
      (error:any)=>{
        console.log("recommendation popup error ",error)
        this.showErrorMessage();
      }
    )
  }

  // ngOnDestroy(){
  //   clearInterval(this.popupInterval)
  // }
  
}

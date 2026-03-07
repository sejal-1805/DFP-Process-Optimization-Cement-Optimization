import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DashboardModel } from '../dashboard/dashboard.modal';
import { ToasterService } from '../../services/toaster.service';
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  // styleUrls: ['./adminpage.component.scss'],
})
export class AdminpageComponent implements OnInit {
  AdminUrlType = {
    getCloseLoopMasterData: environment.baseUrl + 'getCloseLoopMasterData',
    updateCloseLoopMasterData:
      environment.baseUrl + 'updateCloseLoopMasterData',
    // 'addLog':environment.baseUrl+'addLog'
  };
  dashboardLink: any = {
    addLog: 'https://i4.utclconnect.com/uat/addLog',
  };
  sidebarExpanded = true;
  tableRecord: any = [];
  resultArray: any = [];
  btnDisable: boolean = true;
  submitButtonsDisabled: { [plant: string]: { [mill: string]: boolean } } = {};
  submitData: any = [];
  noRecordFound: boolean = true;
  activateRecordNotFound: boolean = false;
  urlLink: any;
  payload!: { Plant_Code: any; Mill: any; Grade: any; Model_No: number; dateTime: any };
  recommendationDate: any=new Date();
  jsonCement:any
  noDataFoundCement:boolean=false
  constructor(
    private dashboardModal: DashboardModel,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.urlLink = window.location.href;
    
    
    this.jsonCement=JSON.parse(localStorage.getItem("cementFiltersState") || '{}')
    if(Object.keys(this.jsonCement).length!==0){
      this.getTableData();
      this.addLog();
      this.activateRecordNotFound=true
    }else{
      this.activateRecordNotFound=false
    }
    // console.log(Object.keys(jsonCement).length);
    

  }
  addLog() {

    let payLoadData={
      "Plant":this.jsonCement.Plant_Code,
      "Mill":this.jsonCement.Mill
    }
    let plantName = localStorage.getItem('cementPlant');
    let email = localStorage.getItem('cement_userEmail');
    let ip = localStorage.getItem('cement_Ip_Address');
    let payload = {
      userId: email,
      ip: ip,
      module: 'opt',
      plant: plantName,
      url: this.urlLink,
      options: JSON.stringify(payLoadData),
      plant_or_section: 'Cement',
    };
    this.dashboardModal.postCall(this.dashboardLink.addLog,payload).subscribe({
      next:(res:any)=>{
        console.log(res);

      }
    })
  }
  showSuccessMessage() {
    this.toaster.addSuccessToast();
  }
  // onChangeFilter(event:any){
  //   this.getTableData();
  // }
  public getTableData() {
    let payload={
      "Plant_Code":this.jsonCement.Plant_Code,
      "Mill":this.jsonCement.Mill
    }
    this.dashboardModal
      .postCall(this.AdminUrlType.getCloseLoopMasterData, payload)
      .subscribe(
        (result: any) => {
          console.log(result.error);
          
          if (result.error === false) {
            this.noRecordFound = false;
            this.tableRecord = result.result;
            console.log(this.tableRecord);
            for (const record of this.tableRecord) {
              for (const result of record.result) {
                if (result.plant && result.mill) {
                  if (!this.submitButtonsDisabled[result.plant]) {
                    this.submitButtonsDisabled[result.plant] = {};
                  }
                  if (!this.submitButtonsDisabled[result.plant][result.mill]) {
                    this.submitButtonsDisabled[result.plant][result.mill] =
                      true;
                  }
                }else{
                  console.log("else");
                  
                  
                }
              }
            }
          }else{
            this.noDataFoundCement=true
            this.noRecordFound=true;
            this.activateRecordNotFound = false;
          }
        },
        (error: any) => {
          console.log(error);
          this.noRecordFound = true;
          this.activateRecordNotFound = false;
        }
      );
  }

  handleFlagChange($event: any, data: any, item: any) {
    console.log($event.value, data, item);
    this.btnDisable = false;
    this.submitData = item;

    this.submitButtonsDisabled[data.plant][data.mill] = false;
    // if(data.parameters==='All' && data['Close_Loop_Flag']===false){
    //   console.log("if",data['Close_Loop_Flag']);

    //   this.submitButtonsDisabled[data.plant][data.mill] = true;
    // }else{
    //   console.log("else")
    //   this.submitButtonsDisabled[data.plant][data.mill] = false;
    // }
  }

  handleSubmit() {
    let paylaod = this.submitData;
    console.log(this.submitData);

    this.dashboardModal
      .postCall(this.AdminUrlType.updateCloseLoopMasterData, paylaod)
      .subscribe(
        (result: any) => {
          console.log(result);
          this.showSuccessMessage();
          this.getTableData();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}

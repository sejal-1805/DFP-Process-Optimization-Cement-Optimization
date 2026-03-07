import { MatTableDataSource } from "@angular/material/table";

 export class alertModel{
  parseAlertData(result:any){
    let recommendationDataSource=result.result;
    recommendationDataSource.map((item:any)=>{
        item.deviationpercent=item.deviationpercent.toFixed(2);
        item.deviationvalue=item.deviationvalue?.toFixed(2);
        item.timestamp= new Date(item.timestamp).toUTCString().split('GMT')[0]
    })
    recommendationDataSource.sort((val1:any,val2:any)=>{
      const date1=new Date(val1.timestamp)
      const date2=new Date(val2.timestamp)

      if(date1>date2) return -1;
      if(date1<date2) return 1;

      return 0
    })
    let keysList=['DisplayName','upper_bound','lower_bound','spot_value','deviation_value','deviationpercent','timestamp']
    let displayedColumn=['Parameter Name','Upper Bound','Lower Bound','Spot Value','Deviated Value','Deviation(%)','Date & Time']
    let dataSource = new MatTableDataSource(recommendationDataSource);
    return {'recommendationDataSource':recommendationDataSource,'keysList':keysList,'displayedColumn':displayedColumn,'dataSource':dataSource }
  }  
}


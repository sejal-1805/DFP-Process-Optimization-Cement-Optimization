import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface millsType{
    'value': String, 
    'viewValue': String,
}
export interface gradeType{
    'value': String, 
    'viewValue': String,
}
export interface plantType{
    'value': String, 
    'viewValue': String,
    'displayName':String
}
@Injectable({
    providedIn: 'root'
})

export class filtersModel {

    token:any

    constructor(private http:HttpClient){}
    /**@method  @returns array of object @typedef millsType  @description for mills dropdown filter */

    public getRangesData(){
        const rangesData=[{value: '100-150', viewValue: '100-150'},{value: '200-250', viewValue: '200-250'},
        {value: '300-400', viewValue: '300-400'}, {value: '400-500', viewValue: '400-500'}]
        return rangesData ;
    }

    public getDropdownData(){
        const dropDownData={
            plantData:[{value: 'VC01', viewValue: 'VC01'}],
            millsData:[{value: 'U1CMML3', viewValue: 'U1CMML3'}],
            gradeData:[{value: 'OPC53', viewValue: 'OPC53'}]
        }
        return dropDownData ;
    }

     /**@method  @returns array of object  @typedef plantType @description for plant dropdown filter */

    
     public getPlantData(responseData:any, allPlants:any){
        var plantData:{ value: any; viewValue: any;displayName:any }[]=[];
        var plantUniqueId:String[]=[];
        responseData.map((data:any)=>{
            plantData.push({value: data.plantCode, viewValue:data.genericPlantCode,displayName:data.Plant})
        })

      
        plantData=plantData.filter((item)=>{
            const isDuplicated= plantUniqueId.includes(item.value)
            if(!isDuplicated){
                plantUniqueId.push(item.value); 
                return true 
            }
            else{
                return false;
            }
           
        })

        plantData= plantData.filter(obj1=>allPlants.some((obj2:any)=>obj1.viewValue==obj2.Plant))
        

        return {plantData:plantData}
    }

    public parseLatestFilterData(result:any){
        // console.log(result);
        if(result.result.result=="No Record Found"){
            // console.log("In If");
            
            var Control_Tags_Data=[];
            var Resultant_Tags_Data= [];
            var filtersData = {
                Plant_Code: 'null',
                Mill: 'null',
                Grade: 'null',
                dateTime: null
            }
            
        }
        else{
            Control_Tags_Data=result.result.Control_Tags_Data;
            Resultant_Tags_Data= result.result.Resultant_Tags_Data;
            filtersData={
                Plant_Code: result.result.plantCode,
                Mill: result.result.mill,
                Grade:result.result.grade,
                dateTime:result.result.timestamp
            };
            
        }
        
        
        return {Control_Tags_Data:Control_Tags_Data,Resultant_Tags_Data:Resultant_Tags_Data, filtersData:filtersData,timestamp:result.result.timestamp }
    }

    getMillsBasesPlant(plant:any, data:any){
        // console.log(plant,data)
        var millsData: { value: any; viewValue: any; }[]=[];
        var millsUniqueId: String[]=[];
        data.map((item:any)=>{
            if(item.plantCode==plant){
                millsData.push({value: item.mill, viewValue: item.mill})
            }
        })

        millsData=millsData.filter((item)=>{
            const isDuplicated= millsUniqueId.includes(item.value)
            if(!isDuplicated){
                millsUniqueId.push(item.value); 
                return true 
            }
            else{
                return false;
            }
           
        }) 
        // console.log(millsData);
        
        return millsData
    }
    
    getGradeBasesPlantMills(plant:any, mill:any, data:any){
        var gradeData:{ value: any; viewValue: any; }[]=[];
        var gradeUniqueId: String[]=[];
        // console.log(plant,mill,data);
        
        data.map((item:any)=>{
            if(item.plantCode==plant && item.mill==mill){
                gradeData.push({value: item.grade, viewValue: item.grade})
            }
        })

        gradeData=gradeData.filter((item)=>{
            const isDuplicated= gradeUniqueId.includes(item.value)
            if(!isDuplicated){
                gradeUniqueId.push(item.value); 
                return true 
            }
            else{
                return false;
            }
           
        }) 
        // console.log(gradeData);
        
        return gradeData;
    }

    /** @method which @returns Observable @description used for api call  */
  public postCall(apiUrl:string, payload:any){

    this.token=localStorage.getItem("cement_accessToken")
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });
    const httpOptions = {
        headers: headers
    };
    // return this.http.post(apiUrl,payload)
    return this.http.post(apiUrl,payload,httpOptions)
}

   
}


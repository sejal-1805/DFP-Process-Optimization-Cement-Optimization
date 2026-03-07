import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LogLevel } from "@azure/msal-browser";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})

export class CementMillModel {
    token:any
    constructor(private http:HttpClient){}
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

    public parseFilterData(result:any){
        const filtersData={
            Plant_Code:  result.plantCode,
            Mill: result.mill,
            Grade:result.grade,
            dateTime:result.timestamp
        }

        return filtersData
    }

    /** @method which @returns Observable @description used for api call  */
    public postCall(apiUrl:string, payload:any){
        this.token=localStorage.getItem('cement_accessToken')
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          });
        const httpOptions = {
            headers: headers
        };
        return this.http.post(apiUrl,payload,httpOptions)
        // return this.http.post(apiUrl,payload)
    }
}


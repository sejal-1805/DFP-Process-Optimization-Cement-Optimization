import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface dashboardData{
    Plant_Code:string,
    Mill:string,
    date:string
}
@Injectable({
    providedIn: 'root'
})



export class DashboardModel {

    token:any
    constructor(private http:HttpClient){}

    public postCall(apiUrl:string, payload:any){
        this.token=localStorage.getItem('cement_accessToken')
        // console.log(this.token);
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
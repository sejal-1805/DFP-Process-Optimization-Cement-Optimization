import { HttpClient,HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class gaugeGraph{

    token:any
    constructor(private http:HttpClient){}

    public postCall(apiUrl:any,payload:any){
        this.token=localStorage.getItem('cement_accessToken')
        // console.log(this.token);
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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
 
  private apiKey='5ca8a11145465a96d22f549976ce8335'
  private baseUrl='http://localhost:3000/data'
  private baseUrl1='http://localhost:3000/datas'
  private baseUrl2='http://localhost:3000/mockdata'
  private baseUrl3='http://localhost:3000/dummy'
  private baseUrl4='https://api.themoviedb.org/3'
  // private baseURL5='http://localhost:3000/elements'
  private baseURL5='http://localhost:3004/elements'
  private baseURL6='http://localhost:3001/elements'
  private baseURL7=' http://localhost:3002/elements'
  private baseURL8='http://localhost:3003/elements'
  throughPutData: { data: { "(Raw material flow) kiln feed": number; calculatedThroughput: number; date: string; }[]; };
  weeklyAlert: { data: { AlertCount: number; Week: string; startDate: string; endDate: string; }[]; };
  monthlyAverageThroughput: { data: { actualThroughput: number; calculatedThroughput: number; month: string; year: number; }[]; };
  
  constructor(private http:HttpClient) { 
    this.weeklyAlert={
      "data": [
          {
              "AlertCount": 325,
              "Week": "Week 01",
              "startDate": "August 20, 2023",
              "endDate": "August 26, 2023"
          },
          {
              "AlertCount": 595,
              "Week": "Week 02",
              "startDate": "August 13, 2023",
              "endDate": "August 19, 2023"
          },
          {
              "AlertCount": 109,
              "Week": "Week 03",
              "startDate": "August 6, 2023",
              "endDate": "August 12, 2023"
          },
          {
              "AlertCount": 673,
              "Week": "Week 04",
              "startDate": "July 30, 2023",
              "endDate": "August 5, 2023"
          }
      ]
    }

    this.monthlyAverageThroughput={
      "data": [
          {
              "actualThroughput": 285.66348515436306,
              "calculatedThroughput": 28.64725346632124,
              "month": "March",
              "year": 2023
          },
          {
              "actualThroughput": 290.54611004070586,
              "calculatedThroughput": 29.017479309879032,
              "month": "April",
              "year": 2023
          },
          {
              "actualThroughput": 250.0088077591358,
              "calculatedThroughput": 25.135627265008544,
              "month": "May",
              "year": 2023
          },
          {
              "actualThroughput": 268.3413567517415,
              "calculatedThroughput": 26.825435324356796,
              "month": "June",
              "year": 2023
          },
          {
              "actualThroughput": 112.27472275441593,
              "calculatedThroughput": 11.200919327772295,
              "month": "July",
              "year": 2023
          },
          {
              "actualThroughput": 281.0315118870842,
              "calculatedThroughput": 27.916595570294326,
              "month": "August",
              "year": 2023
          }
      ]
    }

    this.throughPutData={
      "data": [
          {
              "(Raw material flow) kiln feed": 287.6816,
              "calculatedThroughput": 287.6816,
              "date": "2023-08-23T18:30:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 288.361,
              "calculatedThroughput": 288.361,
              "date": "2023-08-23T18:40:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 288.5875,
              "calculatedThroughput": 288.5875,
              "date": "2023-08-23T18:50:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 289.1159,
              "calculatedThroughput": 289.1159,
              "date": "2023-08-23T19:00:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 289.8708,
              "calculatedThroughput": 289.8708,
              "date": "2023-08-23T19:10:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 289.1159,
              "calculatedThroughput": 289.1159,
              "date": "2023-08-23T19:20:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 288.8139,
              "calculatedThroughput": 288.8139,
              "date": "2023-08-23T19:30:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.4552,
              "calculatedThroughput": 287.4552,
              "date": "2023-08-23T19:40:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.9081,
              "calculatedThroughput": 287.9081,
              "date": "2023-08-23T19:50:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 286.0964,
              "calculatedThroughput": 286.0964,
              "date": "2023-08-23T20:00:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.6062,
              "calculatedThroughput": 287.6062,
              "date": "2023-08-23T20:10:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 285.417,
              "calculatedThroughput": 285.417,
              "date": "2023-08-23T20:20:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 286.0209,
              "calculatedThroughput": 286.0209,
              "date": "2023-08-23T20:30:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 288.512,
              "calculatedThroughput": 288.512,
              "date": "2023-08-23T20:40:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 285.9454,
              "calculatedThroughput": 285.9454,
              "date": "2023-08-23T20:50:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.5307,
              "calculatedThroughput": 287.5307,
              "date": "2023-08-23T21:00:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 286.9268,
              "calculatedThroughput": 286.9268,
              "date": "2023-08-23T21:10:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 286.0209,
              "calculatedThroughput": 286.0209,
              "date": "2023-08-23T21:20:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.3042,
              "calculatedThroughput": 287.3042,
              "date": "2023-08-23T21:30:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.6816,
              "calculatedThroughput": 287.6816,
              "date": "2023-08-23T21:40:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 289.4933,
              "calculatedThroughput": 289.4933,
              "date": "2023-08-23T21:50:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 288.8894,
              "calculatedThroughput": 288.8894,
              "date": "2023-08-23T22:00:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.9081,
              "calculatedThroughput": 287.9081,
              "date": "2023-08-23T22:10:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 288.2855,
              "calculatedThroughput": 288.2855,
              "date": "2023-08-23T22:20:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 285.4925,
              "calculatedThroughput": 285.4925,
              "date": "2023-08-23T22:30:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.6816,
              "calculatedThroughput": 287.6816,
              "date": "2023-08-23T22:40:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 288.512,
              "calculatedThroughput": 288.512,
              "date": "2023-08-23T22:50:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.6062,
              "calculatedThroughput": 287.6062,
              "date": "2023-08-23T23:00:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.5307,
              "calculatedThroughput": 287.5307,
              "date": "2023-08-23T23:10:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 284.2847,
              "calculatedThroughput": 284.2847,
              "date": "2023-08-23T23:20:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 284.3602,
              "calculatedThroughput": 284.3602,
              "date": "2023-08-23T23:30:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 285.1151,
              "calculatedThroughput": 285.1151,
              "date": "2023-08-23T23:40:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 286.1719,
              "calculatedThroughput": 286.1719,
              "date": "2023-08-23T23:50:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.2287,
              "calculatedThroughput": 287.2287,
              "date": "2023-08-24T00:00:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.5307,
              "calculatedThroughput": 287.5307,
              "date": "2023-08-24T00:10:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 285.417,
              "calculatedThroughput": 285.417,
              "date": "2023-08-24T00:20:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 286.9268,
              "calculatedThroughput": 286.9268,
              "date": "2023-08-24T00:30:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 286.6248,
              "calculatedThroughput": 286.6248,
              "date": "2023-08-24T00:40:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 286.8513,
              "calculatedThroughput": 286.8513,
              "date": "2023-08-24T00:50:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 286.0209,
              "calculatedThroughput": 286.0209,
              "date": "2023-08-24T01:00:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.8326,
              "calculatedThroughput": 287.8326,
              "date": "2023-08-24T01:10:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.7571,
              "calculatedThroughput": 287.7571,
              "date": "2023-08-24T01:20:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 285.8699,
              "calculatedThroughput": 285.8699,
              "date": "2023-08-24T01:30:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 289.1159,
              "calculatedThroughput": 289.1159,
              "date": "2023-08-24T01:40:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 286.3984,
              "calculatedThroughput": 286.3984,
              "date": "2023-08-24T01:50:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.6062,
              "calculatedThroughput": 287.6062,
              "date": "2023-08-24T02:00:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 288.663,
              "calculatedThroughput": 288.663,
              "date": "2023-08-24T02:10:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 286.3229,
              "calculatedThroughput": 286.3229,
              "date": "2023-08-24T02:20:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.0023,
              "calculatedThroughput": 287.0023,
              "date": "2023-08-24T02:30:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 285.719,
              "calculatedThroughput": 285.719,
              "date": "2023-08-24T02:40:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 285.0396,
              "calculatedThroughput": 285.0396,
              "date": "2023-08-24T02:50:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.9836,
              "calculatedThroughput": 287.9836,
              "date": "2023-08-24T03:00:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 0,
              "calculatedThroughput": 0,
              "date": "2023-08-24T03:10:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 285.6435,
              "calculatedThroughput": 285.6435,
              "date": "2023-08-24T03:20:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 285.0396,
              "calculatedThroughput": 285.0396,
              "date": "2023-08-24T03:30:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 288.9649,
              "calculatedThroughput": 288.9649,
              "date": "2023-08-24T03:40:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 255.9016,
              "calculatedThroughput": 255.9016,
              "date": "2023-08-24T03:50:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 265.4884,
              "calculatedThroughput": 265.4884,
              "date": "2023-08-24T04:00:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.8326,
              "calculatedThroughput": 287.8326,
              "date": "2023-08-24T04:10:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.3797,
              "calculatedThroughput": 287.3797,
              "date": "2023-08-24T04:20:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 287.3797,
              "calculatedThroughput": 287.3797,
              "date": "2023-08-24T04:30:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 289.4178,
              "calculatedThroughput": 289.4178,
              "date": "2023-08-24T04:40:00.000Z"
          },
          {
              "(Raw material flow) kiln feed": 288.8894,
              "calculatedThroughput": 288.8894,
              "date": "2023-08-24T04:50:00.000Z"
          }
      ]
    }

  }


  getData(){
    const url=`${this.baseUrl}`
    return this.http.get(url);
  }
  getDatas(){
    const url=`${this.baseUrl1}`
    return this.http.get(url);
  }
  getApiData(){
    const url=`${this.baseUrl2}`
    return this.http.get(url);
  }
  getDummyData(){
    const url=`${this.baseUrl3}`
    return this.http.get(url);
  }
  getMovieData(){
    const url=`${this.baseUrl4}/discover/movie?api_key=${this.apiKey}`
    return this.http.get(url)
  }
  getThroughPutData(){
    return of(this.throughPutData)
  }
  getWeeklyalert(){

    return of(this.weeklyAlert)
  }
  getActualThroughtPut(){
    return of(this.monthlyAverageThroughput)
  }
  getSecvalue(){
    const url=`${this.baseURL8}`
    return this.http.get(url)
  }

 
}


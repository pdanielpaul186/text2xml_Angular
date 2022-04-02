import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { dataModel } from '../models/dataModel.model';
import { ApiPaths } from './api-service.service';


@Injectable({
  providedIn: 'root'
})

export class ApiDataModelService {

  httpOptions = {
    headers : new HttpHeaders({'content-type' : 'application/json'})
  }

  constructor(
    private http : HttpClient
  ) { }
  

  

  getDataModel () : Observable<dataModel []> {
    return this.http.get<dataModel []>(ApiPaths.baseURL+'models/model/?nameTemplate=MLI_UREV1', this.httpOptions)
      .pipe(
        retry(1),
        map((data : dataModel []) => {
          return data
        }), catchError( error => {
          return throwError("data not found");
        })       
      )
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() { }

}

export enum ApiPaths {
  baseURL = 'http://10.255.0.59:4300/'
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() { }

}

export enum ApiPaths {
  baseURL = 'https://text2xml-backend.herokuapp.com/'
}

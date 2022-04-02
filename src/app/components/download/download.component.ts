import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiPaths } from 'src/app/services/api-service.service';
import { saveAs } from 'file-saver';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServerConnectionPopupComponent } from '../popups/server-connection-popup/server-connection-popup.component';
import  { parse }  from 'js2xmlparser';
import * as JSZIP from 'jszip';
import { zip } from 'rxjs';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  addressForm = this.fb.group({
    templateName: [null, Validators.required],
    fileTypes: ['free', Validators.required]
  });

  templateList : any;
  
  nameTemplate !: string;
  fileTypes !: string;


  zipFile : JSZIP = new JSZIP();

  constructor(
    private fb: FormBuilder,
    private http : HttpClient,
    private router : Router,
    private matDialog : MatDialog
    ) {}

    responseAPI : any;
  onSubmit(): void {
    let apiSendData = {
      templateName : this.nameTemplate,
      fileType : this.fileTypes
    }
    localStorage.setItem("templateName",this.nameTemplate);
    if(apiSendData.fileType == "dbConn") {
      const dialogConfig = new MatDialogConfig();
      this.matDialog.open(ServerConnectionPopupComponent,dialogConfig);
    } else {
      this.http.post(ApiPaths.baseURL+'templates/download',apiSendData)
      .subscribe(
        (res) => {
          this.responseAPI = res
          if(this.responseAPI.status == "Success"){
            if(this.fileTypes == "json") {
              for(var i=0;i<this.responseAPI.data.length;i++){
                if(this.responseAPI.data[i] == undefined || this.responseAPI.data[i] == null) {
                  this.responseAPI.data.splice[i];
                } else {
                  Object.keys(this.responseAPI.data[i]).forEach((key) => {
                    var replacedKey = key.trim().toUpperCase().replace(/\s+/g, "_");
                    var specialKey = replacedKey.trim().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "_");
                    if (key !== specialKey) {
                      this.responseAPI.data[i][specialKey] = this.responseAPI.data[i][key];
                      delete this.responseAPI.data[i][key];
                    }
                  })
                  var blob = new Blob([JSON.stringify(this.responseAPI.data[i])],{type: "application/json"})
                  saveAs(blob,'download.json')
                }
              }
              window.location.reload();
            }
            else if (this.fileTypes == "xml") {
              console.log(this.responseAPI.data.length);
              for(var i=0;i<this.responseAPI.data.length;i++){
                if(this.responseAPI.data[i] == undefined || this.responseAPI.data[i] == null) {
                  this.responseAPI.data.splice[i];
                } else {

                  Object.keys(this.responseAPI.data[i]).forEach((key) => {
                    var replacedKey = key.trim().toUpperCase().replace(/\s+/g, "_");
                    var specialKey = replacedKey.trim().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "_");
                    if (key !== specialKey) {
                      this.responseAPI.data[i][specialKey] = this.responseAPI.data[i][key];
                      delete this.responseAPI.data[i][key];
                    }
                  })
                  // console.log(this.responseAPI.data[i]);
                  var js2xml = parse("Optima",this.responseAPI.data[i]);
                  var blob = new Blob([js2xml],{type:"application/json"});
                  console.log(i+ " data processed into zip");
                  this.zipFile.file("download_"+i+".xml",blob);
                  // saveAs(blob,'download.xml')
                }
              }
              this.zipFile.generateAsync({type:"blob"})
                .then(function (content) {
                  saveAs(content,"xml_Files.zip")
              })
              //window.location.reload();
            }
            else if (this.fileTypes == "excel") {
              var blob = new Blob([],{type: "application/vnd.ms-excel;charset=utf-8"})
              saveAs(blob,'download.xls')
              window.location.reload();
            }
          }else {
            alert(this.responseAPI.message)
          }
        }
      )
    }
  }

  ngOnInit(): void {
    this.fileTypes = 'json';

    this.http.get(ApiPaths.baseURL+'templates/')
        .subscribe(
          (res) =>{
            this.templateList = res;
            if(this.templateList.status == 'Success') {
              //this.templateList.data.push(this.templateName[0]);
            }
            else {
              alert(this.templateList.error + "          Sorry for the inconvience caused !!!!!")
              window.location.reload();
            }
          }
        )
  }
}

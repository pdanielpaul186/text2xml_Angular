import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from 'src/app/services/api-service.service';

interface DialogData {
  text : "abcdefh"
}

@Component({
  selector: 'app-server-connection-popup',
  templateUrl: './server-connection-popup.component.html',
  styleUrls: ['./server-connection-popup.component.css']
})
export class ServerConnectionPopupComponent {
  addressForm = this.fb.group({
    connectionName: null,
    hostName: [null, Validators.required],
    portNumber: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required],
    defaultSchema: [null, Validators.required],
    tableName : [null, Validators.required]
  });

  hasUnitNumber = false;
  tstResponse : any;
  insertResponse : any;

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private http : HttpClient,
    public dialogRef : MatDialogRef<ServerConnectionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data : DialogData) {}

  onSubmit(): void {
    
    let jsonData = {
      templateName : localStorage.getItem("templateName"),
      fileType : "json",
      connectionDetails : this.addressForm.value
    }

    this.http.post(ApiPaths.baseURL+'templates/sqlInsert',jsonData)
      .subscribe(
        (res) => {
          this.insertResponse = res;

          if(this.insertResponse == "Success") {
            alert('Data Insertion Successfull !!!!!!');
            localStorage.removeItem("templateName")
            this.dialogRef.close();
            this.router.navigate(['conversion'])
          } else {
            alert('Cant access the database !!!!!!!! Please try again !!!!!');
            localStorage.removeItem("templateName")
            this.dialogRef.close();
            this.router.navigate(['conversion'])
          }
        }
    )
  }

  value = 'Clear me';

  close() {
    this.dialogRef.close();
  }

  tstConn() : void {
    this.http.post(ApiPaths.baseURL+'templates/testConn',this.addressForm.value)
      .subscribe(
        (res) => {
          this.tstResponse = res;

          if(this.tstResponse.status == "Success") {
            alert(this.tstResponse.message);
          } else {
            alert(this.tstResponse.message);
          }
        }
      )
  }
}

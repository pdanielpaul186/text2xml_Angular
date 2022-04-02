import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiPaths } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent implements OnInit {
  addressForm = this.fb.group({
    templateName: [null, Validators.required],
    fields: null,
    nameTemplate : [null,Validators.required],
    description: [null, Validators.required],
    typeOfConversion: ['basic', Validators.required],
    abbrevTemplate : [null, Validators.required]
  });

  templateName = [
    {nameTemplate : "New Template", abbrevTemplate: 'newTemplate'} 
  ]
  templateList : any;

  templates!: string;
  fields!: number;
  nameTemplate !: string;
  description !: string;
  toC !: string;
  abbrevTemplate !: string

  constructor(
    private fb: FormBuilder,
    private http : HttpClient,
    private router : Router
    ) {}


    fileToUpload!: File;
    fileFormData : FormData = new FormData();
    fileResponse : any;

    submitResponse : any;

  onSubmit(): void {
    let responseData = {
      templateName : this.templates,
      templateID : this.fileToUpload.name.replace(/\.[^/.]+$/, ""),
      fields : this.fields, 
      nameTemplate : this.nameTemplate,
      description : this.description,
      toC : this.toC,
      fileName : this.fileToUpload.name,
      abbrevTemplate : this.abbrevTemplate,
      fileType : this.fileToUpload.name.split('.').pop()
    }
    
    console.log(responseData)

    this.http.post(ApiPaths.baseURL+'templates/storage',responseData)
      .subscribe(
        (res) => {
          this.submitResponse = res;
          if(this.submitResponse.status == 'Success'){
            this.router.navigate(['/templates']);
          }
          else {
            alert(this.submitResponse.message)
            window.location.reload();
          }
        }
      )
  }

  handleFileInput(event : any){
    this.fileToUpload = event.target.files.item(0);

    this.fileFormData.append('file',this.fileToUpload,this.fileToUpload.name)

    this.http.post(ApiPaths.baseURL+'templates/upload',this.fileFormData)
      .subscribe(
        (res)=>{
          this.fileResponse = res;
          if(this.fileResponse.status == "Success"){
            console.log("Attached Files uploaded Successfully !!!!")
          }
          else{
            alert(this.fileResponse.message + "          Sorry for the inconvience caused !!!!!")
            window.location.reload();
          }
        }
      )
  }

  ngOnInit(): void {
      this.toC = 'basic';

      this.http.get(ApiPaths.baseURL+'templates/')
        .subscribe(
          (res) =>{
            this.templateList = res;
            if(this.templateList.status == 'Success') {
              this.templateList.data.push(this.templateName[0]);
              console.log(this.templateList)
            }
            else {
              alert(this.templateList.error + "          Sorry for the inconvience caused !!!!!")
              window.location.reload();
            }
          }
        )
  }
}

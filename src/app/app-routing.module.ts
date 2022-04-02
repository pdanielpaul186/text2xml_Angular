import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversionComponent } from './components/conversion/conversion.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataModelScreenComponent } from './components/data-model-screen/data-model-screen.component';
//import { DataModelsComponent } from './components/data-models/data-models.component';
import { DownloadComponent } from './components/download/download.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TemplatesComponent } from './components/templates/templates.component';

const routes: Routes = [
  {
    path:'',
    component : LayoutComponent,
    children : [
      {
        path : 'dashboard',
        component:DashboardComponent
      },
      {
        path : '',
        redirectTo : 'conversion',
        pathMatch : 'full'
      },
      {
        path : 'templates',
        component : TemplatesComponent
      },
      {
        path : 'conversion',
        component : ConversionComponent
      },
      {
        path : "download",
        component : DownloadComponent
      },
      {
        path : "models",
        component : DataModelScreenComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { AddSensorsDataComponent } from './dashboard/add-sensors-data/add-sensors-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ButtonComponent } from './button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './dialogs/delete-dialog.component';
import { SensorsDataTableComponent } from './dashboard/sensors-data-table/sensors-data-table.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    AddSensorsDataComponent,
    DashboardComponent,
    AboutPageComponent,
    DeleteDialogComponent,
    SensorsDataTableComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

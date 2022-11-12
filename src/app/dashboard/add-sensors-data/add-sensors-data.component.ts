import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-add-sensors-data',
  templateUrl: './add-sensors-data.component.html',
  styleUrls: ['./add-sensors-data.component.scss'],
})
export class AddSensorsDataComponent implements OnInit {
  sensorsForm!: FormGroup;

  constructor(
    public storeService: StoreService,
    private formBuilder: UntypedFormBuilder,
    public backendService: BackendService,
    private _snackBar: MatSnackBar
  ) {}
  public sensorenDataForm: any;
  public showAddTask: boolean = false;

  ngOnInit(): void {
    this.sensorenDataForm = this.formBuilder.group({
      sensorId: [0, [Validators.required]],
      temperature: ['', [Validators.required]],
      humidity: ['', [Validators.required]],
      date: [null, [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.sensorenDataForm?.valid) {
      await this.backendService.addSensorsData(this.sensorenDataForm.value);
      this.sensorenDataForm.reset();
      this.backendService.getSensorenDaten();
      this.backendService.getSensoren();
      this._snackBar.open('Neuer Messerwert hinzugefügt', 'Ok', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 2000,
      });
    }
  }

  toggleAddTask() {
    this.showAddTask = !this.showAddTask;
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.sensorsForm.controls[controlName].hasError(errorName);
  };
}

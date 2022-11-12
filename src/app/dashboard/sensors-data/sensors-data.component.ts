import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog.component';
import { SensorenData } from 'src/app/models/sensor-data.model';
import { Sensor, SensorPosition } from 'src/app/models/sensor.model';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-sensors-data',
  templateUrl: './sensors-data.component.html',
  styleUrls: ['./sensors-data.component.scss'],
})
export class SensorsDataComponent implements OnInit {
  displayedColumns: string[] = [
    'Sensor',
    'Datum',
    'Temperatur',
    'Luftfeuchtigkeit',
    'Standort',
    'Position',
    'Aktion',
  ];

  dataSource = new MatTableDataSource(this.storeService.sensorenDaten);

  public get SensorPosition() {
    return SensorPosition;
  }

  constructor(
    private backendService: BackendService,
    public storeService: StoreService,
    private dialog: MatDialog
  ) {}

  @ViewChild('paginator')
  paginator!: MatPaginator;

  async ngOnInit() {
    await this.backendService.getSensoren();
    await this.backendService.getSensorenDaten();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Opens delete-dialog component (Modal-Window)
   * @param id takes id of sensor
   */
  openDeleteModal(id: number) {
    const dialogRef = this.dialog
      .open(DeleteDialogComponent, {
        width: '250px',
        data: { id },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.backendService.getSensorenDaten();
          this.backendService.getSensoren();
          this.storeService.sensorenDaten;
        }
      });
  }
}

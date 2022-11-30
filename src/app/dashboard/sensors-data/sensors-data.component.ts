import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class SensorsDataComponent implements OnInit, AfterViewInit {
  sensorenData!: Object;

  displayedColumns: string[] = [
    'Sensor',
    'Datum',
    'Temperatur',
    'Luftfeuchtigkeit',
    'Standort',
    'Position',
    'Aktion',
  ];

  dataSource = new MatTableDataSource<SensorenData>();

  public get SensorPosition() {
    return SensorPosition;
  }

  constructor(
    private backendService: BackendService,
    public storeService: StoreService,
    private dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  async ngOnInit() {
    await this.backendService.getSensoren();
    await this.backendService.getSensorenDaten();
    this.initializeDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initializeDataSource() {
    this.dataSource.data = this.storeService.sensorenDaten;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Opens delete-dialog component (Modal-Window)
   * @param id takes id of sensor
   */
  openDeleteModal(id: number, index: any) {
    const dialogRef = this.dialog
      .open(DeleteDialogComponent, {
        width: '250px',
        data: { id },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.dataSource.data.filter((i) => i != index);
          this.backendService.getSensoren();
          this.backendService.getSensorenDaten();
        }
      });
  }
}

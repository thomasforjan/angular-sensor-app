import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog.component';
import { SensorenData } from 'src/app/models/sensor-data.model';
import { SensorPosition } from 'src/app/models/sensor.model';
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

  dataSource = new MatTableDataSource<SensorenData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public get SensorPosition() {
    return SensorPosition;
  }

  constructor(
    private backendService: BackendService,
    public storeService: StoreService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.backendService.getSensoren();
    await this.backendService.getSensorenDaten();
    this.dataSource.data = this.storeService.sensorenDaten;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Opens delete-dialog component (Modal-Window)
   * @param id takes id of sensor
   */
  openDeleteModal(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.storeService.sensorenDaten =
          this.storeService.sensorenDaten.filter((sensor) => sensor.id !== id);
      }
    });
  }
}

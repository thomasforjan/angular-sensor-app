import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SensorenData } from 'src/app/models/sensor-data.model';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog.component';
import { SensorPosition } from 'src/app/models/sensor.model';

@Component({
  selector: 'app-sensors-data-table',
  templateUrl: './sensors-data-table.component.html',
  styleUrls: ['./sensors-data-table.component.scss'],
})
export class SensorsDataTableComponent implements AfterViewInit, OnDestroy {
  isDeleting = false;
  toDeleteItemId: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<SensorenData>;

  private storeServiceSubscription?: Subscription;

  /** Columns displayed in the table.**/
  displayedColumns = [
    'id',
    'sensorName',
    'date',
    'temperature',
    'humidity',
    'location',
    'position',
    'action',
  ];

  pageSizes = [5, 10, 25, 100];

  constructor(
    private storeService: StoreService,
    private backendService: BackendService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.storeService.isLoading = true;
    this.storeServiceSubscription = this.storeService.dataHasUpdated.subscribe(
      () => {
        this.dataSource = new MatTableDataSource(
          this.storeService.sensorenDaten
        );
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.storeService.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.storeServiceSubscription?.unsubscribe();
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
          this.toDeleteItemId = id;
          this.isDeleting = true;
          this.storeService.isLoading = true;
          this.dataSource.data.filter((i) => i != index);
          this.backendService.getSensoren();
          this.backendService.getSensorenDaten();
          this.isDeleting = false;
          this.storeService.isLoading = false;
        }
      });
  }

  public get SensorPosition() {
    return SensorPosition;
  }
}

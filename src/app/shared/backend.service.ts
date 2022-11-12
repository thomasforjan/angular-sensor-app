import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SensorenDataResponse } from '../models/sensor-data-response';
import { SensorenData } from '../models/sensor-data.model';
import { Sensor } from '../models/sensor.model';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private storeService: StoreService, private http: HttpClient) {}

  sensoren: Sensor[] = [];

  public async getSensoren() {
    this.sensoren = await firstValueFrom(
      this.http.get<Sensor[]>('http://localhost:5000/sensors')
    );
    this.storeService.sensoren = this.sensoren;
  }

  public async getSensorenDaten() {
    const sensorenDataResponse = await firstValueFrom(
      this.http.get<SensorenDataResponse[]>(
        `http://localhost:5000/sensorsData?_page=${this.storeService.page}&_l
    imit=${this.storeService.sensorsPerPage}`,
        { observe: 'response' }
      )
    );
    var count = Number(sensorenDataResponse.headers.get('X-Total-Count'));

    if (sensorenDataResponse.body != null) {
      const sensorenData: SensorenData[] = sensorenDataResponse.body.map(
        (data: any) => {
          const sensor: Sensor = this.sensoren.filter(
            (sensor) => sensor.id == data.sensorId
          )[0];
          return { ...data, sensor };
        }
      );
      this.storeService.sensorenDaten = sensorenData;
    }
  }

  public async addSensorsData(sensorenData: SensorenData[]) {
    await firstValueFrom(
      this.http.post('http://localhost:5000/sensorsData', sensorenData)
    );
    await this.getSensorenDaten();
  }

  public async deleteSensorsDaten(sensorId: number) {
    await firstValueFrom(
      this.http.delete(`http://localhost:5000/sensorsData/${sensorId}`)
    );
    await this.getSensorenDaten();
  }
}

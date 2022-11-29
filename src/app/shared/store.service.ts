import { Injectable } from '@angular/core';
import { SensorenData } from '../models/sensor-data.model';
import { Sensor } from '../models/sensor.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public sensorenDaten: SensorenData[] = [];
  public sensoren: Sensor[] = [];

  constructor() {}
}

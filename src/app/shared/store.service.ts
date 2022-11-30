import { EventEmitter, Injectable } from '@angular/core';
import { SensorenData } from '../models/sensor-data.model';
import { Sensor } from '../models/sensor.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public dataHasUpdated = new EventEmitter();

  private _sensorenDaten: SensorenData[] = [];
  public sensoren: Sensor[] = [];

  constructor() {}

  public set sensorenDaten(v: SensorenData[]) {
    this._sensorenDaten = v;
    this.dataHasUpdated.emit();
  }

  public get sensorenDaten(): SensorenData[] {
    return this._sensorenDaten;
  }
}

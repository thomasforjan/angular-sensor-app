import { Sensor } from './sensor.model';

export interface SensorenData {
  id: number;
  date: Date;
  temperature: number;
  humidity: number;
  sensor: Sensor;
}

export interface Sensor {
  id: number;
  name: string;
  location: string;
  active: boolean;
  position: SensorPosition;
}

export enum SensorPosition {
  indoor = 1,
  outdoor = 2,
  water = 3,
}

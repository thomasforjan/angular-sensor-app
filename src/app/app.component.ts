import { Component } from '@angular/core';
import { StoreService } from './shared/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sensor-app';

  constructor(public storeService: StoreService) {}
}

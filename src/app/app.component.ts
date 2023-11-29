import { Component } from '@angular/core';
import { CustomizerService } from './shared/service/customizer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'personal-training-app';
  public layoutType = 'dark';

  constructor(public customize: CustomizerService) {}
  public customizeLayoutVersion(val) {
    this.customize.setLayoutVersion(val);
    this.layoutType = val;
  }
}

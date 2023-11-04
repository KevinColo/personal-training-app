import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comming-soon2',
  templateUrl: './comming-soon2.component.html',
  styleUrls: ['./comming-soon2.component.scss'],
})
export class CommingSoon2Component implements OnInit {
  public seconds: number;
  public timer: any;

  constructor() {
    this.setTime();
  }

  ngOnInit() {}

  setTime() {
    const elements = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds')
    };

    this.timer = setInterval(() => {
      const countDown = new Date('dec 30, 2022 00:00:00').getTime();
      const now = new Date().getTime();
      const distance = countDown - now;

      const timeLeft = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };

      for (const unit in elements) {
        if (elements[unit]) {
          elements[unit].textContent = timeLeft[unit].toString();
        }
      }

    }, this.seconds);
  }
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

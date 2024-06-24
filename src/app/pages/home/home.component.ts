import { Component, OnInit } from '@angular/core';
import { TimeapiService } from 'src/app/services/timeapi.service';

interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedValue: string = '';

  timezones: string[] = [];

  constructor(private timeApiService: TimeapiService) {}

  ngOnInit(): void {
    this.timeApiService.getTimezones().subscribe({
      next: (timezones) => {
        this.timezones = timezones;
      },
    });
  }

  addTimezone(): void {}
}

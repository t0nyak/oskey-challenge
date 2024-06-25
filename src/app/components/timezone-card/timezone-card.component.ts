import { Component, EventEmitter, Input, Output } from '@angular/core';
import Timezone from 'src/app/models/timezone';
import { TimezonesService } from 'src/app/services/timezones.service';

@Component({
  selector: 'timezone-card',
  templateUrl: './timezone-card.component.html',
  styleUrls: ['./timezone-card.component.scss'],
})
export class TimezoneCardComponent {
  @Input() timezone: Timezone = {} as Timezone;
  @Output() delete = new EventEmitter<string>();

  constructor(private timezonesService: TimezonesService) {}

  get formattedTime(): string {
    return new Date(this.timezone.createdAt).toLocaleString();
  }

  deleteTimezone(id: string): void {
    this.delete.emit(id);
  }
}

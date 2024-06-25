import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeapiService {
  apiPath: string = 'https://timeapi.io/api/TimeZone/AvailableTimeZones';

  constructor(private http: HttpClient) {}

  getTimezones(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiPath}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }
}

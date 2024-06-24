import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeapiService {
  apiPath: string = 'https://www.timeapi.io/api';

  constructor(private http: HttpClient) {}

  getTimezones(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.apiPath}/TimeZone/AvailableTimeZones`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }
}

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { throwError, timer, from, of } from "rxjs";
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class ApiCallServiceService {
  token: string;
  headers: any;
  constructor(private httpClient: HttpClient, private router: Router) {}

  get<T>(url: string) {
    return this.httpClient
      .get<T>(url, { headers: this.headers })
      .pipe(map(res => res));
  }

  put<T>(url: string, data: any) {
    return this.httpClient.put<T>(url, data).pipe(map(res => res));
  }

  delete<T>(url: string) {
    return this.httpClient.delete<T>(url).pipe(map(res => res));
  }

  post<T>(url: string, data: any) {
    return this.httpClient.post<T>(url, data).pipe(map(res => res));
  }
}

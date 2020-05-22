import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsServiceService {

  urls: any;
  constructor(private http: HttpClient) {}

  async getUrl(key: string) {
    if (!this.urls) {
      this.urls = await this.http
        .get("../../../assets/js/Url.json")
        .toPromise();
    }

    return this.urls["baseUrl"] + this.urls[key];
  }
}

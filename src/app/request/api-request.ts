import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiRequestService {
    constructor(private http: HttpClient) { }


    post(url: string, data: object) {
        return this.http.post<Response>(url, { data });
    }

}
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ApiService {
    constructor(private http: Http){}

    post(url: string, body: any, options?: any): Observable<any> {
        return this.http.post(url, body, options).map((res: any)=>res._body ? JSON.parse(res._body) : res);
    }
    
    get(url: string, options?: any): Observable<any> {
        return this.http.get(url, options).map((res: any)=>res._body ? JSON.parse(res._body) : res);
    }
}
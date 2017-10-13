import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class HttpAccess {

  public constructor(private http: Http) {
  }

  /**
   * GET Request
   * @param url: string
   * @param requestOptions RequestOptions
   * @returns Observable<any>
   */
  public get(url: string,
             requestOptions: RequestOptions = new RequestOptions({
               headers: this.getDefaultHeaders(),
               method: 'GET'
             })): Observable<any> {

    return this.http.get(url, requestOptions)
      .map((res: Response) => res.json())
  }

  /**
   * POST Request
   * @param url: string
   * @param payload: any
   * @param requestOptions RequestOptions
   * @returns Observable<any>
   */
  public post(url: string, payload: any = null,
              requestOptions: RequestOptions = new RequestOptions({
                headers: this.getBodyHeaders(),
                method: 'POST'
              })): Observable<any> {

    return this.http.post(url, payload, requestOptions)
      .map((res: Response) => res.json())
  }

  /**
   * PUT Request
   * @param url: string
   * @param payload: any
   * @param requestOptions RequestOptions
   * @returns Observable<any>
   */
  public put(url: string, payload: any = null,
             requestOptions: RequestOptions = new RequestOptions({
               headers: this.getBodyHeaders(),
               method: 'PUT'
             })): Observable<any> {
    return this.http.put(url, payload, requestOptions)
      .map((res: Response) => res.json())
  }

  /**
   * DELETE Request
   * @param url: string
   * @param requestOptions RequestOptions
   * @returns Observable<any>
   */
  public delete(url: string,
                requestOptions: RequestOptions = new RequestOptions({
                  headers: this.getDefaultHeaders(),
                  method: 'DELETE'
                })): Observable<any> {
    return this.http.delete(url, requestOptions)
      .map((res: Response) => res.json())
  }

  /**
   * For Requests with a Body
   * @returns {Headers}
   */
  private getBodyHeaders(): Headers {
    let headers = this.getDefaultHeaders();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  /**
   * Default Headers
   * @returns {Headers}
   */
  private getDefaultHeaders(): Headers {
    let headers = new Headers();
    headers.append('Authorization', 'blablabla1234\\(^-^)/');
    return headers;
  }

}

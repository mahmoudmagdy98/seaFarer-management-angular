import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeafarerService {
  private baseUrl = environment.apiBaseUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  GetAllSeafarers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}//MarineServices/GetAllSeafarers?Direction=ltr&InCT`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getVendors(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/LegalAffairs/FillVendor?Id=0&text=&Direction=ltr&InCT`, this.httpOptions)
    .pipe(catchError(this.handleError));
}

getEmployees(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/POS/FillEmployee?Id=0&text=&Direction=ltr&InCT`, this.httpOptions)
    .pipe(catchError(this.handleError));
}





  getSeafarerById(empId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/POS/FillEmployee?Id=${empId}&text=&Direction=ltr&InCT`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }



  saveSeafarer(seafarer: any): Observable<any> {
  return this.http.post<any>(
    `${this.baseUrl}/MarineServices/SaveSeafarer?InCT`,
    seafarer,
    this.httpOptions
  ).pipe(catchError(this.handleError));
}

  changeStatus(empId: number, status: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/MarineServices/ActivateAndInActivateSeafarer?Id=${empId}&InCT&Status=${status}&EmpId=${empId}`, {}, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}

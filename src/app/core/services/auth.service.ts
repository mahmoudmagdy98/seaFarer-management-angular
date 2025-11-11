import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 private apiUrl = 'http://176.9.184.190/token';


  constructor(private http: HttpClient) { }

  login(username: string, password: string, mobileid: string): Observable<any> {

  const body = new URLSearchParams();
body.set('username', username);
body.set('Password', password);
body.set('grant_type', 'password');
body.set('mobileid', mobileid);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.apiUrl, body.toString(), { headers });
  }
}

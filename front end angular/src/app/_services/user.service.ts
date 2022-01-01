import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;
  constructor(private http: HttpClient,private tokenStorage: TokenStorageService) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getUserByID(id: any): Observable<any> {
    return  this.http.get(API_URL + 'user', { responseType: 'text',params:{id} });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
  
    return this.http.get(API_URL + 'admin',{ responseType: 'text' ,params:{clientEmail:this.tokenStorage.getEmail()}} );
  }
  deletUser(id: any): Observable<any> {
  
    return this.http.delete(API_URL + 'user',{ responseType: 'text',params:{id, clientEmail:this.tokenStorage.getEmail()}});
  }
  updateUser(id: string,username: string, email: string, password: string, role:string){

    return this.http.put(API_URL + 'user', {
      clientEmail:this.tokenStorage.getEmail(),
      id,
      username,
      email,
      password,
      role
    }, httpOptions);
  }
}

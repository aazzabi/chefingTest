import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Task} from '../../models/Task';
import {StorageService} from '../security/storage.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT'
  }),
  responseType: 'text' as 'text'
};

@Injectable()
export class TaskService {
  url = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Task[]>(this.url);
  }
  getById(id: number) {
    return this.http.get<Task[]>(this.url + '/' + id );
  }
  deleteTask(t : any) {
    return this.http.get(this.url + '/delete/' + t.id);
  }

  confirmerTask(t: any) {
    return this.http.get(this.url + '/confirme/' + t.id);
  }
  add(t: any) {
    const body = JSON.stringify(t);
    return this.http.post(this.url + '/add', body, httpOptions);
  }
}

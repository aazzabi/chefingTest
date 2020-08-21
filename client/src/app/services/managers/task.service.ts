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
    return this.http.delete(this.url + '/delete/' + t._id);
  }

  confirmTask(t: any) {
    return this.http.put(this.url + '/confirme/' + t._id, t , httpOptions);
  }
  unConfirmTask(t: any) {
    return this.http.put(this.url + '/unconfirme/' + t._id, t , httpOptions);
  }
  addTask(t: any) {
    const body = JSON.stringify(t);
    return this.http.post(this.url + '/add', body, httpOptions);
  }

  editTask(t:any) {
    const body = JSON.stringify(t);
    return this.http.put(this.url + '/update/'+ t._id, body, httpOptions);
  }
}

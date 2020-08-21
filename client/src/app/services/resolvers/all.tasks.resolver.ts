import {Task} from '../../models/Task';
import {Resolve, ActivatedRoute, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TaskService} from '../managers/task.service';
import {Injectable} from '@angular/core';
import {StorageService} from '../security/storage.service';

@Injectable()
export class AllTasksResolverService implements Resolve<Task[]> {
  constructor(private TaskService: TaskService) {}

  // @ts-ignore
  resolve(route: ActivatedRoute, state: RouterStateSnapshot): Observable<Task[]> {
    return this.TaskService.getAll();
  }
}

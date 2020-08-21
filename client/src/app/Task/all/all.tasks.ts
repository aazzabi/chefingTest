import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditTaskComponent} from "../edit/edit.task";
import {TaskService} from "../../services/managers/task.service";
import {AddTaskComponent} from "../add/add.task";
import {Task} from '../../models/Task';

@Component({
  selector: 'app-all-task-back',
  templateUrl: './all.tasks.html',
  styleUrls: ['./all.tasks.css']
})
export class AllTasks {
  allTasks: Task[];
  tableChecked = new Array;


  constructor(
    private TaskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal) {
    this.allTasks = this.route.snapshot.data['tasks'];
  }

  edit(t: Task) {
    const modalRef = this.modalService.open(EditTaskComponent);
    modalRef.componentInstance.t = t;
  }

  new() {
    const modalRef = this.modalService.open(AddTaskComponent);
    modalRef.componentInstance.addTaskEvent.subscribe(($e) => {
      console.log($e, "$e");
      this.TaskService.addTask($e).subscribe(
        response => {
          console.log(JSON.parse(response));
          modalRef.close();
          this.allTasks.push(JSON.parse(response));
        },
        error => {
          console.log(error);
        }
      );
    })
  }

  deleteTask(index: number, c: Task) {
    if (confirm('Are you sure to delete this Task')) {
      this.TaskService.deleteTask(c).subscribe(
        response => {
          this.allTasks.splice(index, 1);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  check(t: Task) {
    this.TaskService.confirmTask(t).subscribe(
      response => {
        // @ts-ignore
        t.status = 'DONE';
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  unCheck(t: Task) {
    this.TaskService.unConfirmTask(t).subscribe(
      response => {
        // @ts-ignore
        t.status = 'TODO';
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  checkbox(item: any, i: any) {
    if (this.tableChecked.find(x => x === item)) {
      this.tableChecked.splice(this.tableChecked.indexOf(item), 1);
    } else {
      this.tableChecked.push(item);
    }
  }

  markAsTODOSelectedClaims() {
      const tempChecked = [];
      this.tableChecked.forEach(e => tempChecked.push(e));
      for (let i = 0; i < tempChecked.length; i++) {
        const tcv = tempChecked[i];
        const index = this.allTasks.findIndex(item => item._id === tcv._id);
        this.TaskService.unConfirmTask(tcv).subscribe(
          response => {
            tcv.status = 'TODO';
          },
          error => {
            console.log(error);
          }
        );
        const indexChecked = this.tableChecked.findIndex(item => item._id === tcv._id);
        this.tableChecked.splice(indexChecked, 1);
      }
      tempChecked.forEach(obj => {
        obj.checked = false;
      });
  }

  markAsDONESelectedClaims() {
      const tempChecked = [];
      this.tableChecked.forEach(e => tempChecked.push(e));
      for (let i = 0; i < tempChecked.length; i++) {
        const tcv = tempChecked[i];
        const index = this.allTasks.findIndex(item => item._id === tcv._id);
        this.TaskService.confirmTask(tcv).subscribe(
          response => {
            tcv.status = 'DONE';
          },
          error => {
            console.log(error);
          }
        );
        const indexChecked = this.tableChecked.findIndex(item => item._id === tcv._id);
        this.tableChecked.splice(indexChecked, 1);
      }
      tempChecked.forEach(obj => {
        obj.checked = false;
      });
  }

  deleteSelectedClaims() {
    if (confirm('Are you sure to delete those tasks !!! ')) {
      const tempChecked = [];
      this.tableChecked.forEach(e => tempChecked.push(e));
      for (let i = 0; i < tempChecked.length; i++) {
        const tcv = tempChecked[i];
        const index = this.allTasks.findIndex(item => item._id === tcv._id);
        console.log(index, 'index');
        this.TaskService.deleteTask(tcv).subscribe(
          response => {
          },
          error => {
            console.log(error);
          }
        );
        this.allTasks.splice(index, 1);
        const indexChecked = this.tableChecked.findIndex(item => item._id === tcv._id);
        this.tableChecked.splice(indexChecked, 1);
      }
      tempChecked.forEach(obj => {
        obj.checked = false;
      });
    }
  }
}

import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditTaskComponent} from "../edit/edit.task";
import {TaskService} from "../../services/managers/task.service";
import {AddTaskComponent} from "../add/add.task";

@Component({
  selector: 'app-all-task-back',
  templateUrl: './all.tasks.html',
  styleUrls: ['./all.tasks.css']
})
export class AllTasks {
  allTasks: Task[];

  collection = {
    count: 10,
    data: [],
    dataEnCours: [],
    dataEnAttente: [],
    dataFermee: [],
    dataConfirmed: [],
    dataResolu: []
  };

  constructor(
    private TaskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal) {
    this.allTasks = this.route.snapshot.data['tasks'];
  }

  // tslint:disable-next-line:use-life-cycle-interface use-lifecycle-interface
  ngOnInit() {
    // @ts-ignore
  }

  edit(c: Task) {
    const modalRef = this.modalService.open(EditTaskComponent);
    modalRef.componentInstance.c = c;
  }

  new() {
    const modalRef = this.modalService.open(AddTaskComponent);
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

  // checkbox(item: Task, n: number) {
  //   if (this.tableChecked.find(x => x === item)) {
  //     this.tableChecked.splice(this.tableChecked.indexOf(item), 1);
  //     console.log(this.tableChecked);
  //   } else {
  //     this.tableChecked.push(item);
  //     console.log(this.tableChecked);
  //   }
  // }

  // deleteSelectedTasks() {
  //   if (confirm('Are you sure to delete those Tasks !!! ')) {
  //     const tempChecked = [];
  //     this.tableChecked.forEach(e => tempChecked.push(e));
  //     for (let i = 0; i < tempChecked.length; i++) {
  //       const tcv = tempChecked[i];
  //       const index = this.collection.data.findIndex(item => item.id === tcv.id);
  //       this.TaskService.deleteTask(tcv).subscribe(
  //           response => {
  //           },
  //           error => {
  //             console.log(error);
  //           }
  //         );
  //       this.collection.data.splice(index, 1);
  //       const indexChecked = this.tableChecked.findIndex(item => item.id === tcv.id);
  //       this.tableChecked.splice(indexChecked, 1);
  //     }
  //     tempChecked.forEach(obj => {
  //       obj.checked = false;
  //     });
  //   }
  // }

  // archiverSelectedTasks() {
  //   if (confirm('Are you sure to archive those Tasks !!! ')) {
  //     const tempChecked = [];
  //     this.tableChecked.forEach(e => tempChecked.push(e));
  //     for (let i = 0; i < tempChecked.length; i++) {
  //       const tcv = tempChecked[i];
  //       const index = this.collection.data.findIndex(item => item.id === tcv.id);
  //       this.TaskService.archiverTask(tcv).subscribe(
  //           response => {
  //           },
  //           error => {
  //             console.log(error);
  //           }
  //         );
  //       this.collection.dataEnCours.splice(index, 1);
  //       this.collection.dataEnAttente.splice(index, 1);
  //       this.collection.dataResolu.splice(index, 1);
  //       const indexChecked = this.tableChecked.findIndex(item => item.id === tcv.id);
  //       this.tableChecked.splice(indexChecked, 1);
  //     }
  //     tempChecked.forEach(obj => {
  //       obj.checked = false;
  //       obj.status = 'FERME_SANS_SOLUTION';
  //     });
  //   }
  // }
  // desarchiverSelectedTasks() {
  //   if (confirm('Are you sure to archive those Tasks !!! ')) {
  //     const tempChecked = [];
  //     // selectionner que les réclamation FERME_SANS_SOLUTION
  //     this.tableChecked.forEach(e => {
  //       if (e.status === 'FERME_SANS_SOLUTION') { tempChecked.push(e); }
  //     });
  //     for (let i = 0; i < tempChecked.length; i++) {
  //       const tcv = tempChecked[i];
  //       const index = this.collection.dataFermee.findIndex(item => item.id === tcv.id);
  //       this.TaskService.desarchiverTask(tcv).subscribe(
  //           response => {
  //           },
  //           error => {
  //             console.log(error);
  //           }
  //         );
  //       this.collection.dataFermee.splice(index, 1);
  //       const indexChecked = this.tableChecked.findIndex(item => item.id === tcv.id);
  //       this.tableChecked.splice(indexChecked, 1);
  //     }
  //     tempChecked.forEach(obj => {
  //       obj.checked = false;
  //       obj.status = 'EN_COURS';
  //     });
  //   }
  // }

  // bipper(c: any) {
  //   this.TaskService.bipperAgent(c.responsable.id);
  // }
  newTask: any;

  public addToList() {
    if (this.newTask == '') {
    } else {
      this.allTasks.push(this.newTask);
      this.newTask = '';
    }
  }

  check(t: Task) {
    this.TaskService.confirmerTask(t).subscribe(
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
}

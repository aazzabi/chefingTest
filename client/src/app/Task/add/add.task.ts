import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskService} from "../../services/managers/task.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-task-back',
  templateUrl: './add.tasks.html',
  styleUrls: []
})
export class AddTaskComponent {
  constructor(public activeModal: NgbActiveModal, private taskService: TaskService) {
  }

  addTask = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  confirm() {
    this.taskService.add({
      title: this.addTask.value.title,
      description: this.addTask.value.description
    }).subscribe(
      response => {
        this.activeModal.close();
      },
      error => {
        console.log(error);
      }
    );
  }
}

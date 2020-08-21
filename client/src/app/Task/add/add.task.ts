import {Component, EventEmitter, Output} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TaskService} from "../../services/managers/task.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from '../../models/Task';

@Component({
  selector: 'app-add-task-back',
  templateUrl: './add.tasks.html',
  styleUrls: []
})
export class AddTaskComponent {
  constructor(public activeModal: NgbActiveModal, private taskService: TaskService) {}
  @Output() addTaskEvent = new EventEmitter<any>();

  addTask = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  onClickOk() {
    let t = {
      title: this.addTask.value.title,
      description: this.addTask.value.description,
    };
    this.addTaskEvent.emit(t);
  }
}

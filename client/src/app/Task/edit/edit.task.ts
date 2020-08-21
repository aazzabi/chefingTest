import {Component, Input} from "@angular/core";
import {TaskService} from "../../services/managers/task.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from '../../models/Task';

@Component({
  selector: 'app-edit-task-back',
  templateUrl: './edit.tasks.html',
  styleUrls: []
})
export class EditTaskComponent {
  @Input()
  t: Task;


  constructor(public activeModal: NgbActiveModal, private taskService: TaskService) {

  }


  editTask = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.editTask.get('title').setValue(this.t.title);
    this.editTask.get('description').setValue(this.t.description);
  }

  edit() {
    if ((this.t.title !== this.editTask.value.title) || (this.t.description !== this.editTask.value.description)) {
      let t = {
        _id: this.t._id,
        title: this.editTask.value.title,
        description: this.editTask.value.description,
      };
      this.taskService.editTask(t).subscribe(
        response => {
          this.activeModal.close();
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}

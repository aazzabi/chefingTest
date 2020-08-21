import {NgModule} from "@angular/core";
import {AllTasks} from "./all/all.tasks";
import {AllTasksResolverService} from "../services/resolvers/all.tasks.resolver";
import {TaskService} from "../services/managers/task.service";
import {TaskRouting} from "./task.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AddTaskComponent} from "./add/add.task";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  imports: [
    TaskRouting,
    FormsModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AllTasks,
    AddTaskComponent
  ],
  providers: [
    TaskService,
    AllTasksResolverService,
  ],
  entryComponents: [AddTaskComponent]

})
export  class  TaskModule {

}

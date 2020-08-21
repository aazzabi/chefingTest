import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllTasks} from "./all/all.tasks";
import {AllTasksResolverService} from "../services/resolvers/all.tasks.resolver";

const routes: Routes = [
  { path: '', component: AllTasks , resolve : { tasks: AllTasksResolverService }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRouting {

}

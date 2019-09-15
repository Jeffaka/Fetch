import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs/operators";
import {Todo, TodosService} from "./todos.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  todos: Todo[] = []
  title = 'fetch';
  todoTitle = ''
  loading = false
  constructor(private todosService: TodosService){

  }

  ngOnInit(){
    this.fetchTodos()
  }
  addTodo(){
    if(!this.todoTitle.trim()){
      return
    }

    this.todosService.addTodo({
      title:this.todoTitle,
      completed: false
    }).subscribe(todo => {
          this.todos.push(todo)
          this.todoTitle = ''
      })

  }
  fetchTodos(){
    this.loading = true
        this.todosService.fetchTodos()
        .subscribe(todos =>{
          this.todos = todos
          this.loading = false
        })
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodos(id)
        .subscribe(() =>{
          this.todos = this.todos.filter(t => t.id !== id)
        })
  }
}

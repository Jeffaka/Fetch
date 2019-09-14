import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Todo {
  completed: boolean
  id?: number
  title: string
  userId?: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  todos: Todo[] = []
  title = 'fetch';
  todoTitle = ''
  constructor(private http: HttpClient){

  }

  ngOnInit(){
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
        .subscribe(todos =>{
          console.log('Respons ', todos)
          this.todos = todos
        })
  }
  addTodo(){
    if(!this.todoTitle.trim()){
      return
    }
    const newTodo: Todo = {
      title:this.todoTitle,
      completed: false
    }
    this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
        .subscribe(todo => {
          console.log('todo', todo)
          this.todos.push(todo)
          this.todoTitle = ''
        })
  }
}

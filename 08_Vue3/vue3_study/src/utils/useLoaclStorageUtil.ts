import { Todo } from '../types/Todo'
export function saveTodos(todos: Todo[]) {
    todos && localStorage.setItem('todos_key',JSON.stringify(todos));
}
export function readTodos(): Todo[] {
    return JSON.parse(localStorage.getItem('todos_key') || '[]');
}
import React, {useState, useEffect} from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoApi from './api'
import FakeApi from './fakeApi'



function Todo({ todo, markTodo, removeTodo }) {
  return (
    <div
      className="todo"
      
    >
      <span style={{ textDecoration: todo.status === 'completed' ? "line-through" : "" }}>{todo.title}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(todo._id)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(todo._id)}>🗑</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Add Todo</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [Api, setApi] = useState()

  useEffect(() => {
    const manageApi = async () => {
      const isApiWorking = await TodoApi.isApiWorking()
      if(isApiWorking)
      setApi(TodoApi)
      else setApi(FakeApi)
    }
    manageApi()
  }, [])

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await Api.getAllTodos()
      setTodos(todos)
    }
    if(Api)
    fetchTodos()
  }, [Api])

  const addTodo = async title => {
    const todo = {title, status:'created'}
    const newTodo = await Api.createTodo(todo)
    setTodos([newTodo,...todos])

  };

  const markTodo = async _id => {
    const todo = todos.find(todo=> todo._id === _id)
    todo.status = todo.status === 'completed' ? 'created' : 'completed'
    await Api.updateTodo(_id,todo)
    setTodos([...todos]);
  };

  const removeTodo = async _id => {
    await Api.deleteTodo(_id)
    const index = todos.findIndex(todo=> todo._id === _id)
    todos.splice(index, 1);
    setTodos([...todos]);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo) => (
            <Card key={todo._id} >
              <Card.Body>
                <Todo
                key={todo._id}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
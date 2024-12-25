
import axios from "axios"

const API_URL = "http://localhost:7070/api/"
const API_END_POINT = `${API_URL}tasks/`

const isApiWorking = async()=>{
    try {
        await axios.get(API_URL)
        return true
    } catch (error) {
        return false
    }
}

const createTodo = async(task)=> {
  const { data:{data:newTodo} } = await axios.post(API_END_POINT, task)
  return newTodo
}

const deleteTodo = async (_id) => {
  const {data:{message}} = await axios.delete(`${API_END_POINT}${_id}`)
  return message
}

const updateTodo = async(_id, task)=> {
  const { data:{data:newTodo} } = await axios.put(`${API_END_POINT}${_id}`, task)
  return newTodo
}

const getTodo = async(_id)=> {
    const { data:{data:todo }} = await axios.get(`${API_END_POINT}${_id}`)
    return todo
  }

const getAllTodos = async() => {
  const { data:{data: todos} } = await axios.get(API_END_POINT)
  return todos
}

// eslint-disable-next-line import/no-anonymous-default-export
export default{
    isApiWorking, createTodo, deleteTodo, updateTodo, getTodo, getAllTodos 
    }

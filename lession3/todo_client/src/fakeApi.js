
let tasks = []
const createTodo = async(task)=> {
    task._id = tasks.length
    tasks.push(task)
    return task
}

const deleteTodo = async (_id) => {
    if (_id < 0 || _id >= tasks.length) throw new Error({ _id: 'Invalid' })
    tasks.splice(_id, 1)
}

const updateTodo = async(_id, task)=> {
    if (_id < 0 || _id >= tasks.length) throw new Error({ _id: 'Invalid' })
    tasks[_id] = task
}
const getTodo = async(_id)=> {
    if (_id < 0 || _id >= tasks.length) throw new Error({ _id: 'Invalid' })
    return tasks[_id]
  }

const getAllTodos = async() => [...tasks]  // send a copy... not the original reference

// eslint-disable-next-line import/no-anonymous-default-export
export default{
    createTodo, deleteTodo, updateTodo, getTodo, getAllTodos 
    }

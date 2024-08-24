import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



function App() {

  const [todo, setTodo] = useState("") 
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
   let todoString = localStorage.getItem("todos")
   if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
   }
    }, []) 
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
     setTodo(t[0].todo)
     let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete= (e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    console.log(todos)
    saveToLS()
    
  } 
  const handleChange= (e)=>{
    setTodo(e.target.value)
  }
   
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id ==id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  

  

  return (
    <>
    <Navbar/>
      <div className='mx-3 md: container md:mx-auto my-5 rounded-xl p-5 bg-blue-100 min-h-[80vh] md:w-[40%]'>
      <h1 className='font-bold text-center text-3xl'>iNotes - Manage Your Tasks</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>
            ADD A TASK
          </h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1'></input>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-purple-800 hover:bg-purple-500 disabled:bg-blue-900 mx-2 rounded-full p-4 py-2 text-sm font-bold text-white '>Save</button>
        </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished}>
        </input> <label className='mx-2' htmlFor='show'>Show Finished</label>
        <div className='h-[1px] bg-black opacity-20 w-[90%] mx-auto my-2'></div>
          <h2 className='text-2xl font-bold'>Your To-Dos</h2>
         <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Tasks Pending</div> }
          {todos.map(item=>{ 

    
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between ">
            <div className='flex gap-5'>
            <input name={item.id}  onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id=" "></input>
            <div className={item.isCompleted?"line-through":" "}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
            <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-blue-900 hover:bg-blue-300 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-blue-900 hover:bg-blue-300 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'><MdDelete />
              </button>
            </div>
          </div>
           })}
         </div>
         </div>
    
        
    </>
  )
}

export default App

import './global.css'

import style from './App.module.css'

import { type ChangeEvent, type FormEvent, useState } from 'react'

import { CirclePlus } from 'lucide-react'
import { Button } from './components/Button'
import { Header } from './components/Header'
import { Input } from './components/Input'
import { Empty } from './components/List/Empty'
import { Header as ListHeader } from './components/List/Header'
import { Item } from './components/List/Item'

export interface Task {
  id: string
  content: string
  checked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const tasksOnStorage = localStorage.getItem('tasks')

    if (tasksOnStorage) {
      return JSON.parse(tasksOnStorage)
    }

    return []
  })
  const [newTaskText, setNewTaskText] = useState<string>('')

  const tasksCreated = tasks.length
  const tasksCompleted = tasks.reduce((count, task) => {
    return task.checked ? count + 1 : count
  }, 0)
  const tasksCreatedIsZero = tasks.length === 0

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTaskChangeInvalid(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Você precisa adicionar uma tarefa')
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    // Check if the text is not empty
    if (newTaskText.trim() === '') {
      return
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      content: newTaskText,
      checked: false,
    }

    const tasksArray = [...tasks, newTask]

    setTasks(tasksArray)

    setNewTaskText('')

    localStorage.setItem('tasks', JSON.stringify(tasksArray))
  }

  function checkedTask(id: string, isChecked: boolean) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, checked: isChecked }
      }
      return task
    })

    const tasksArray = updatedTasks.sort((a, b) => {
      /**
       * If a is checked and b is not, a goes down (returns 1)
       * If b is checked and a is not, b goes down (returns -1)
       * If both are in the same state, does not change the order
       */
      const aIsChecked = a.checked && !b.checked
      const bIsChecked = !a.checked && b.checked

      if (aIsChecked) {
        return 1
      }
      if (bIsChecked) {
        return -1
      }

      return 0
    })

    setTasks(tasksArray)

    localStorage.setItem('tasks', JSON.stringify(tasksArray))
  }

  function deleteTask(id: string) {
    const tasksArray = tasks.filter(task => {
      return task.id !== id
    })

    setTasks(tasksArray)

    localStorage.setItem('tasks', JSON.stringify(tasksArray))
  }

  return (
    <main>
      <Header />

      <section className={style.wrapper}>
        <form onSubmit={handleCreateNewTask} className={style.addTask}>
          <Input
            placeholder="Adicione uma nova tarefa"
            value={newTaskText}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskChangeInvalid}
            required
          />
          <Button type="submit">
            Criar <CirclePlus size={16} />
          </Button>
        </form>

        <div className={style.tasks}>
          <ListHeader
            tasksCreated={tasksCreated}
            tasksCompleted={tasksCompleted}
          />

          <div>
            {tasksCreatedIsZero ? (
              <Empty />
            ) : (
              tasks.map(task => {
                return (
                  <Item
                    key={task.id}
                    task={task}
                    onDeleteTask={deleteTask}
                    onCheckedTask={checkedTask}
                  />
                )
              })
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

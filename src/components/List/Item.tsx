import style from './Item.module.css'

import type { Task } from '../../App'

import { Trash2 } from 'lucide-react'
import type { ChangeEvent } from 'react'

interface ItemProps {
  task: Task
  onDeleteTask: (id: string) => void
  onCheckedTask: (id: string, isChecked: boolean) => void
}

export function Item({ task, onDeleteTask, onCheckedTask }: ItemProps) {
  function handleDeleteTask() {
    onDeleteTask(task.id)
  }

  function handleToggleCheckChange(event: ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked

    onCheckedTask(task.id, isChecked)
  }

  return (
    <label htmlFor={task.id} className={style.item}>
      <div>
        <input
          type="checkbox"
          id={task.id}
          checked={task.checked}
          onChange={handleToggleCheckChange}
        />
        <p>{task.content}</p>
      </div>

      <button type="button" onClick={handleDeleteTask}>
        <Trash2 size={16} />
      </button>
    </label>
  )
}

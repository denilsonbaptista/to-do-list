import style from './Header.module.css'

export interface HeaderProps {
  tasksCreated: number
  tasksCompleted: number
}

export function Header({ tasksCreated, tasksCompleted }: HeaderProps) {
  const tasksCompletedIsZero = tasksCompleted === 0

  return (
    <header className={style.header}>
      <aside>
        <p>Tarefas criadas</p>
        <span>{tasksCreated}</span>
      </aside>
      <aside>
        <p>Concluídas</p>
        <span>
          {tasksCompletedIsZero
            ? tasksCompleted
            : `${tasksCompleted} de ${tasksCreated}`}
        </span>
      </aside>
    </header>
  )
}

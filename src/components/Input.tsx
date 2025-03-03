import type { ComponentProps } from 'react'

import style from './Input.module.css'

interface InputProps extends ComponentProps<'input'> {}

export function Input({ ...props }: InputProps) {
  return <input className={style.input} type="text" {...props} />
}

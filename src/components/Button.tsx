import type { ComponentProps } from 'react'
import style from './Button.module.css'

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ ...props }: ButtonProps) {
  return <button className={style.button} {...props} />
}

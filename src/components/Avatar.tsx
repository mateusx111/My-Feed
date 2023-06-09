import {ImgHTMLAttributes} from 'react'
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement>{
  hasBorder?: boolean;
}

// no lugar de props colocar um objeto com props especificas e aplicasr valores padrão para a prop(Desestruturação)
export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar} // condicional para que haja ou n borda no vatar
      {...props}
    />
  )
}

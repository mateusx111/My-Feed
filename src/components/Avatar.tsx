import styles from './Avatar.module.css'

// no lugar de props colocar um objeto com props especificas e aplicasr valores padrão para a prop(Desestruturação)
export function Avatar({ hasBorder = true, src }) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar} // condicional para que haja ou n borda no vatar
      src={src}
      alt="foto perfil"
    />
  )
}

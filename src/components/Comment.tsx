import { ThumbsUp, Trash } from 'phosphor-react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'

export function Comment({ content, onDeleteComment }) {
  const [likeCount, setLikeCount] = useState(0)

  function handleLikeCount() {
    setLikeCount(likeCount + 1)
  }

  function handleDeletComment() {
    onDeleteComment(content)
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://github.com/mateusx111.png"
        alt=""
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Mateus Souza</strong>
              <time title="11 de maio de 2023" dateTime="2023-05-11 10:30:23">
                Cerca de 1h atrás
              </time>
            </div>

            <button onClick={handleDeletComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeCount}>
            <ThumbsUp />
            Aplaudir<span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}

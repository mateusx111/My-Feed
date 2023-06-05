import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR' // colocando em português
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph'| 'link';
  content: string;
}

interface postProps{
  author: Author,
  publishedAt: Date,
  content: Content[]
}

// props deesestruturadas
export function Post({ author, publishedAt, content }: postProps) {
  //se qualquer uma dessas props for alterada o post vai renderisar de novo

  const [comments, setComments] = useState([])

  const [newCommentText, setNewCommentText] = useState('') // estado deve ser iniciado com o  mesmo tipo de dado que vai receber

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'", // formato de data segundo a lib fns(consultar documentação)
    { locale: ptBR },
  )

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault() // evita o comportamento padrão evita mudar de pagina

    setComments([...comments, newCommentText]) // não passo o que quero inserir mas sim NOVO VALOR
    setNewCommentText('') // limpar o campo da textarea
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) { // passando generics para o ts 
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function deleteComment(commentTodelete: string) {
    //Função enviada como propriedade para o component Comment
    //imutabilidaed -> as variáveis não soferm mutação, nós criamor um nova valor(um novo espaço na memória)
    //Sera criada uma nova listra de comentários sem o comentário que foi deletado
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentTodelete
    })
    setComments(commentsWithoutDeletedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} /> {/* */}
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          // key sempre vai no primeiro elemento depois de return
          if (line.type === 'paragraph') {
            // eslint-disable-next-line spaced-comment
            return <p key={line.content}>{line.content}</p> //usando propri texto como key, ela precisa ser única denrp da renderização de cada componente
          } else if (line.type === 'link') {
            return (
              <p key={line.content}>
                <a href="https://www.rocketseat.com.br/discover">
                  {line.content}
                </a>
              </p>
            )
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe seu comentário..."
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required // no react quando um prop é true eu n preciso infor mar que é true é só colocar a propiedade
        />

        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Comentar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {/* Listar comentarios */}
        {comments.map((comment) => {
          return (
            <Comment
              key={comment} // usando proprio texto como key
              content={comment}
              onDeleteComment={deleteComment} //Função enviada como propriedade para o component Comment
            />
          )
        })}
      </div>
    </article>
  )
}

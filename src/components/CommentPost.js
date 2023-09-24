import Image from "next/image"
import { useState } from "react";

const CommentPost = ({ setComments }) => {

  const [content, setContent] = useState('')

  const handledComments = (e) => {
    e.preventDefault();
    
    const payload = {
      _id: 10,
      avatar: "/avatars/image-amyrobson.png",
      user: "amyrobson",
      timeStamp: new Date().toString(),
      content
    }
      
    setComments((prev) => {
      return [...prev, payload]
    })

    setContent('')
  }

  return (
    <div className="comment-form">
      <Image src="/avatars/image-amyrobson.png" alt="foto de perfil de usuario" height={60} width={60} />
      <form onSubmit={handledComments}>
        <textarea onChange={(e) => {
          setContent(e.target.value)
        }}>
          { content }
        </textarea>
        <button>Send</button>
      </form>      
  </div>
  )
}

export default CommentPost
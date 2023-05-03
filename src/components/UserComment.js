import Image from "next/image"

const UserComment = ({ comment }) => {

  const { avatar, user, timeStamp, content } = comment

  const formatData = ({ timeStamp }) => {
    console.log("🚀 ~ file: UserComment.js:8 ~ formatData ~ timeString:", timeStamp)
    const timeString = new Date(timeStamp).getUTCDate()
    console.log("🚀 ~ file: UserComment.js:10 ~ formatData ~ timeString:", timeString)
    // return new Intl.DateTimeFormat('es-MX', { dateStyle: "short" }).format(new Date(timeStamp).getTime())
  }

  return (
    <div className="user-comment">
      <div className="user-info">
        <div>
          <Image src={avatar} alt="foto de perfil de usuario" height={60} width={60} />
          <h3>{user}</h3>
          <small>you</small>
          <span>{formatData({ timeStamp })}</span>
        </div>
        <div>
          <button className="btn btn-small btn-replay">Replay</button>
          <button className="btn btn-small btn-delete">Delete</button>
          <button className="btn btn-small">Edit</button>
        </div>                
      </div>
      <div>
        {/* comentario */}
        <p className="user-content">          
          { content }
        </p>
      </div>
    </div>
  )
}

export default UserComment


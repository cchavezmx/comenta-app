import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'
import CommentPost from '@/components/CommentPost'
import UserComment from '@/components/UserComment'
import { comment } from 'postcss';
const API = process.env.NEXT_PUBLIC_API_URL;

const inter = Inter({ subsets: ['latin'] })

const comentarios_mock = [
  {
    _id: 1,
    avatar: '/avatars/image-juliusomo.png',
    user: "cinephile_101",
    content: "Esta película fue increíble, me dejó sin palabras",
    timeStamp: "27/04/2023 08:23:15"
  },
  {
    _id: 2,
    user: "moviebuff99",
    avatar: '/avatars/image-juliusomo.png',
    content: "Creo que la actuación de los protagonistas fue excelente",
    timeStamp: "27/04/2023 11:47:31",
    replay: true
  },
  {
    _id: 3,
    user: "filmgeek88",
    avatar: '/avatars/image-juliusomo.png',
    content: "La trama fue un poco confusa al principio, pero al final todo tuvo sentido",
    timeStamp: "27/04/2023 15:12:52"
  },
  {
    _id: 4,
    user: "screenwriter24",
    avatar: '/avatars/image-juliusomo.png',
    content: "Me hubiera gustado ver más desarrollo en los personajes secundarios",
    timeStamp: "27/04/2023 18:39:21"
  },
  {
    _id: 5,
    user: "moviecritic7",
    avatar: '/avatars/image-juliusomo.png',
    content: "En general, fue una película entretenida pero nada sorprendente",
    timeStamp: "27/04/2023 21:02:57"
  },
  {
    _id: 6,
    user: "cinemagoer22",
    avatar: '/avatars/image-juliusomo.png',
    content: "Esta película me hizo reír y llorar, definitivamente vale la pena verla",
    timeStamp: "28/04/2023 08:13:06"
  },
  {
    _id: 7,
    user: "filmstudent45",
    avatar: '/avatars/image-juliusomo.png',
    content: "La cinematografía y la música fueron impresionantes",
    timeStamp: "28/04/2023 12:36:49"
  },
  {
    _id: 8,
    user: "movielover_90",
    avatar: '/avatars/image-juliusomo.png',
    content: "Aunque la trama fue un poco predecible, disfruté mucho la película",
    timeStamp: "28/04/2023 16:21:02"
  },
  {
    _id: 9,
    user: "theatergoer12",
    avatar: '/avatars/image-juliusomo.png',
    content: "Fui a ver esta película con amigos y todos la disfrutamos mucho",
    timeStamp: "28/04/2023 19:47:11"
  },
  {
    _id: 10,
    user: "filmnerd55",
    avatar: '/avatars/image-juliusomo.png',
    content: "La película fue buena, pero la novela en la que se basa es aún mejor",
    timeStamp: "28/04/2023 22:14:24"
  }
];

export default function Home() {

  const [login, setLogin] = useState(false)    

  useEffect(() => {
    // verificar si el usuario esta logueado
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('token')
      if (!user) {
        window.location.href = '/login'
      }

      const token = JSON.parse(user)      
      if (token) {
        // servicio de autenticacion
        fetch(`${API}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token?.token}`
        },        
      })
      .then(res => {
        if (res.status === 200) {
          setLogin(true)
          return res.json()
        } else {
          window.location.href = '/login'
        }
      })      
    }
      
    }

  }, [])

  const [comments, setComments] = useState(comentarios_mock)  

  if (!login) {
    return (
      <div>
        <h1>Debes iniciar sesion</h1>
      </div>
    )
  }

  return (
    <main className={`flex flex-col p-2 ${inter.className}`}>
      <CommentPost setComments={setComments} />      
      {
        comments.map((coment) => {
          return (
            <UserComment key={comment._id} comment={coment} />
          )
        })
      }
    </main>
  )
}

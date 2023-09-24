import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'
import CommentPost from '@/components/CommentPost'
import UserComment from '@/components/UserComment'
import { comment } from 'postcss';
import { useRouter } from 'next/router';
const API = process.env.NEXT_PUBLIC_API_URL;
import { verifyToken } from '@/utils/verifyToken';

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
  }
];

export default function Home() {

  const router = useRouter()
  const [comments, setComments] = useState(comentarios_mock)  
  const [isLogin, setIsLoging] = useState(false)


  const getToken = async () => {
    return await verifyToken()
    .then(res => {
      console.log(res, '😡')
      setIsLoging(res)
    })
    .catch(err => {
      localStorage.removeItem('token')
      router.push('/login')
    }) 
  }

  useEffect(() => {    
    getToken()
  }, [])

  // if (isLogin === false) {    
  //   router.push('/login')
  // }


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

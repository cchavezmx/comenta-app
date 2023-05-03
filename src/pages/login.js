import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { verifyToken } from '@/utils/verifyToken';
const API = process.env.NEXT_PUBLIC_API_URL;

const Login = () => {
  const [errors, setErrors] = useState({})
  const router = useRouter()
  
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

  const getUser = (e) => {
    e.preventDefault();
    
    const form = new FormData(e.target)
    const payload = {
      email: form.get('email'),
      password: form.get('password')
    }

    console.log(payload)

    try {      
      fetch(`${API}/user/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',          
        },
        body: JSON.stringify(payload)
      })
        .then(res=> {
          console.log(res)
          // res.status === 200, 400
          // res => error = hay un error
          if (res.status !== 200) {
            throw new Error('Password o usuario incorrecto')
          }
          return res.json()
        })
        .then(jsonResponse => {
          console.log(jsonResponse)
          if (jsonResponse.message.token) {
            localStorage.setItem('token', JSON.stringify(jsonResponse))
            // es correcto los redireccionamos al index "/"
            // vanilla js (window) no esta disponible al inicio
            // window.location.href = '/'
            router.push('/')
          }
        })
        .catch(error =>  {
          setErrors({ message: error.message })
          console.log(error)          
        })
        .finally(() => {
          // el codigo aqui adentro se ejecutar al terminar el fecth // success , error

        })
    } catch (error) {
      console.log(error)
    }
  }
  
    return (
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            {/* logo */}
            { errors.message && <p className="text-red-500 text-sm">{errors.message}</p> }
            <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">                        
                        Inicia sesión en tu cuenta 
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={getUser}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Correo</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                        </div>                        
                        <button type="submit" className="bg-blue-400 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Iniciar sesión
                        </button>                        
                    </form>                    
                </div>
            </div>
        </div>
      </section>
    )
}

export default Login
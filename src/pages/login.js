import { useState } from "react";
import { useRouter } from 'next/router'
const API = process.env.NEXT_PUBLIC_API_URL;

const Login = () => {
  

  const [errors, setErrors] = useState({})
  const router = useRouter()
  
  const submit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const data = {
      email: form.get('email'),
      password: form.get('password')
    }
    

    fetch(`${API}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(res => {      
      if (res.status === 400) {
        throw new Error('Usuario o contraseña incorrectos')
      }
      return res.json();
    })
    .then(data => {
      console.log(data, 'data');
      localStorage.setItem('token', JSON.stringify(data.user));
      router.push('/')
    })
    .catch(err => {      
      setErrors(err)
    })
  }

  const onBlurInput = (e) => {
    setErrors({})
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
                    <form className="space-y-4 md:space-y-6" onSubmit={submit} >
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Correo</label>
                            <input onBlur={onBlurInput} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                            <input onBlur={onBlurInput} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
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
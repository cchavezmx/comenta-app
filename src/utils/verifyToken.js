const API = process.env.NEXT_PUBLIC_API_URL;

const verifyToken = async () => {
  let user = null
  const token = localStorage.getItem('token')
  console.log(token)

  try {
    if (!token) {
      throw new Error('no tiene permsisos')
    }

    const tokenDecode = JSON.parse(token)
    console.log("🚀 ~ file: verifyToken.js:13 ~ verifyToken ~ tokenDecode:", tokenDecode)

    return fetch(`${API}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenDecode.message.token}`
      }
    })
    .then(res =>  {
      console.log(res)
      if (res.status === 401){
        throw new Error('Usuario invalido')
      }
      return res.json()
    })
    .then((json) => {
      console.log(json)
      return user = json
    })

  } catch (error) {    
    user = false
  }

}

export {
  verifyToken
}
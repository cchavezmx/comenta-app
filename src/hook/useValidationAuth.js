import { useEffect, useState } from "react";
const API = process.env.NEXT_PUBLIC_API_URL;

const useValidationAuth = (token) => {

  const [user, setUser] = useState(null)
    console.log("🚀 ~ file: useValidationAuth.js:7 ~ useValidationAuth ~ user:", user)
    
  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch(`${API}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },                
      })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'data');
        setUser(data)
      })
    }
  }, [token])
    
  
  return user
    
}

export default useValidationAuth
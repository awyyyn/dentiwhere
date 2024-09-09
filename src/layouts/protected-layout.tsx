import Navbar from '@/components/shared/navbar/navbar'
import { userAtom } from '@/states/user-state'
import { db } from '@/utils/supabase'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedLayout = () => {

  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
        
    (async() => { 

        const { data, error } = await db.auth.getSession()

        if(error){
            console.log(error)
        } 

        if(data && data.session) { 
            const userData = await db.from("user").select("*").eq("email", data.session.user.email!).maybeSingle();

            if(userData.error) console.log(userData.error)
            
            if(userData === null) {
                localStorage.clear()
                setUser(null)
                return navigate("/")
            } 

            setUser(userData.data)
            
        } 

    })()

  }, [])

  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default ProtectedLayout

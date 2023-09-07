import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { logLogout } from '../Common/ServerFunctions/UserFunctions'

const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const { userId, userType } = cookies;
    const navigate = useNavigate();

    useEffect(() => {
      const logout = async () => {
        await logLogout(userId, userType);
        removeCookie('userId')
        navigate("/")
      };
      logout();
    }, [])
  return (
    <>
    </>
  )
}

export default Logout
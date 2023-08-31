import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        removeCookie('userId')
        navigate("/")
    }, [])
  return (
    <>
    </>
  )
}

export default Logout
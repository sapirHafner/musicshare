import React from 'react'
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AddAlbums = () => {
  const [cookies] = useCookies(['userId']);
  const { userId } = cookies;
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === undefined) {
        navigate("/")
    }
}, [])

  return (
    <div>
      hello!
    </div>
  )
}

export default AddAlbums
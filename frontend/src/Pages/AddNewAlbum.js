import React from 'react'
import { addAlbumAndSongsToArtist } from '../Common/ServerFunctions/AlbumFunctions'
import NewAlbumForm from '../Components/Forms/NewAlbumForm'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const AddNewAlbum = () => {
    const [cookies] = useCookies(['userId'])
    const { artistId } = cookies;
    const navigate = useNavigate();
    const onSubmit = async (album, songs) => {
        await addAlbumAndSongsToArtist(artistId, album, songs)
        navigate('/')
    }
    return (
        <div>
            <NewAlbumForm onSubmit={onSubmit} />
        </div>
    )
}

export default AddNewAlbum;
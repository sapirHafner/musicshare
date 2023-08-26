import React from 'react'
import ArtistNavBar from './ArtistNavBar'
import { addAlbumAndSongsToArtist } from '../ServerFunctions/AlbumFunctions'
import NewAlbumForm from './NewAlbumForm'
import { useCookies } from 'react-cookie'
import { createSongs } from '../ServerFunctions/SongFunctions'
import { useNavigate } from 'react-router-dom'

const AddNewAlbum = () => {
    const [cookies] = useCookies(['userId'])
    const { artistId } = cookies;
    const navigate = useNavigate();
    const onSubmit = async (album, songs) => {
        await addAlbumAndSongsToArtist(artistId, album, songs)
        navigate('/myMusic')
    }
    return (
        <div>
            <ArtistNavBar />
            <NewAlbumForm onSubmit={onSubmit} />
        </div>
      )
}

export default AddNewAlbum;
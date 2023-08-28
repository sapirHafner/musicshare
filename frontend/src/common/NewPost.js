import React, { useEffect, useState } from 'react'
import UserNavigationBar from '../User/UserNavigationBar'
import NewPostForm from './NewPostForm'
import { createNewPost } from '../ServerFunctions/PostsFunctions'
import { fetchMusicalEntity } from '../ServerFunctions/MusicalEntitiesFunctions'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useQuery, getMusicalEntityBoxComponent } from './Utilities'
import LoadingScreen from '../Common/LoadingScreen';

const NewPost = () => {
  const [cookies] = useCookies(['userId']);
  const userId = cookies['userId'];

  const navigate = useNavigate();

  const query = useQuery();
  const type = query.get("type")
  const musicalEntityId = query.get("id")
  const [musicalEntityComponent, setMusicalEntityComponent] = useState();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() =>{
    const fetchData = async () => {
        setMusicalEntityComponent(getMusicalEntityBoxComponent(await fetchMusicalEntity({
          Type: type,
          Id: musicalEntityId
        })));
        console.log("here")
        setIsLoaded(true);
    }
    fetchData();
  }, [])

  const onSubmit = async (title, content) => {
    const Post = {
      Title: title,
      Content: content,
      MusicalEntity: {
        Type: type,
        Id: musicalEntityId
      },
      UserId: userId
    }
    await createNewPost(Post);
    navigate(`/user/${userId}`);
  }


  return (
    <div className='grid-container'>
        <UserNavigationBar />
        <div className='content'>
          {
            isLoaded ?
            <div>
              {musicalEntityComponent}
              <NewPostForm onSubmit={onSubmit}/>
            </div>
            :
            <LoadingScreen />
          }
        </div>
    </div>
  )
}

export default NewPost
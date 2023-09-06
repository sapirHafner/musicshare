import React, { useEffect, useState } from 'react';
import DeleteButton from '../Components/DeleteButton/DeleteButton';
import { getAllUsers, deleteUser } from '../ServerFunctions/UserFunctions';
import LoadingScreen from '../Common/LoadingScreen';

const UsersDisplay = () => {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setUsers(await getAllUsers());
      setIsLoaded(true);
    };
    fetchData();
  }, []);

  const handleDelete = async (userId, userType) => {
    await deleteUser(userId, userType);
    setUsers(users.filter(user => user._id !== userId));
  };

  return (
    isLoaded ? (
      <div>
        {users.map(user => (
          <div key={user._id}>
            {user.Type}: {user.Username} <DeleteButton onDelete={() => {handleDelete(user._id, user.Type)}} />
          </div>
        ))}
      </div>
    ) : (
      <LoadingScreen />
    )
  );
};

export default UsersDisplay;

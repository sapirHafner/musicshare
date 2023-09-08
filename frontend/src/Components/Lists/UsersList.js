import React, { useEffect, useState } from 'react';

import DeleteButton from '../Buttons/DeleteButton';
import LoadingScreen from '../LoadingScreen';

import { getAllUsers, deleteUser } from '../../Common/ServerFunctions/UserFunctions';

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
            {user.type}: {user.username} <DeleteButton onDelete={() => {handleDelete(user._id, user.type)}} />
          </div>
        ))}
      </div>
    ) : (
      <LoadingScreen />
    )
  );
};

export default UsersDisplay;

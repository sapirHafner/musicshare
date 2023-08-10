import React from 'react'

const Profile = ({ profile }) => {
  return (
    <div>
        This is your profile!!! <br />
        your name is {profile.FirstName} <br />
        your last name is {profile.LastName} <br />
        your email is {profile.Email} <br />
    </div>
  );
};

export default Profile;
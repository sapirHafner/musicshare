import React from 'react'
import SignUpForm from './SignUpForm'

const CreateUser = ({OnSignUp}) => {
    
    const handleSignUp= (event) => {
        event.preventDefault()
        const firstName = event.target.firstname.value
        const lastName = event.target.lastname.value
        const email = event.target.email.value
        const userName = event.target.username.value
        const password = event.target.password.value
        OnSignUp(firstName, lastName, email, userName, password)
    }

    return (
    <SignUpForm OnSubmit={handleSignUp} />
  )
}

export default CreateUser
import React from 'react'
import SignUpForm from './SignUpForm'

const CreateUser = ({OnSignUp}) => {
    
    const handleSignUp= (event) => {
        event.preventDefault()
        const firstName = event.target.username.value
        const lastName = event.target.username.value
        const email = event.target.username.value
        const userName = event.target.username.value
        const password = event.target.password.value
        OnSignUp(firstName, lastName, email, userName, password)
    }

    return (
    <SignUpForm />
  )
}

export default CreateUser
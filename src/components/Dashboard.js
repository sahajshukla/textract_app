import React, {useState} from 'react'
import {Card, Button, Alert} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'



export default function Dashboard(){
    console.log("dashboard is working!")
    const [error,setError] = useState('')
    const {currentUser, logout} = useAuth()
    const Navigate = useNavigate()
    async function handleLogout(){
        setError('')
        try{
            await logout()
            Navigate('/login')
        } catch{
            setError('Failed to log out')
        }
    }

    

  return (
    <>
        <Card>
            <Card.Body>
            <h2 className = "text-center mb-4"> Profile</h2>
            <Link to="/image-capture" className = "tags w-100 mt-3"> Upload Image </Link>
            </Card.Body>
            <div className = "w-100 text-center mt-2">
            <Button variant = "link" onClick = {handleLogout}> Log Out </Button>
            </div>
        </Card>
    </>
  )
}

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { confirmEmail } from '../../redux/AuthReducer'

const VerifyEmail = () => {
   
    const {confirm} = useSelector((state) => state.auth)
    const {token} = useParams()
    let dispatch = useDispatch()
    useEffect(() => {
     dispatch(confirmEmail(token))
    }, [])
   
  
   
  return (
    <div className='container text-center' style={{minHeight:'80vh'}}>
      {
     confirm ===true?<>
        <h2 className='mt-2'>Email confirmed successfully</h2>
        <Link to='/login'>go to login</Link>
      </> :
       <>
        <h2 className='mt-2'>Email not confirmed</h2>
       </> 
      }
    </div>
  )
}

export default VerifyEmail

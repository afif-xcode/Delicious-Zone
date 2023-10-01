import React from 'react'
import { ChangeProfilePicture } from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import {UpdatePassword} from './UpdatePassword'


export default function Setting() {
  return (
    <>
        <h1 className='mb-14 text-3xl font-medium'>Edit Profile</h1>
        <ChangeProfilePicture></ChangeProfilePicture>
        <EditProfile></EditProfile>
        <UpdatePassword></UpdatePassword>
    </>
  )
}

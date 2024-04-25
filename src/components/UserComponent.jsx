import React from 'react'

const UserComponent = (props) => {
  return (
    <div className='flex items-center'>
        <img className='w-10' src="https://statics.olx.in/external/base/img/avatar_2.png" alt="" />
        <p className='font-bold'>{props.userName}</p>
    </div>
  )
}

export default UserComponent

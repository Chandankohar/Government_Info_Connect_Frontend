import React from 'react'
import { Link } from 'react-router-dom'

const AppliedSchemeUserInfoCard = ({applieduser}) => {
  return (
    <Link
    to={`/admin/userappliedschemedetail/${applieduser._id}`}
      className="my-3 flex justify-content-between border cursor-pointer shadow flex-col gap-4 rounded-2xl p-4 transition-all hover:bg-gray-300 md:flex-row"
      key={applieduser._id} style={{backdropFilter: 'blur(5px) saturate(2) '}}
    >
         
        <div > 
        <div className="text-lg md:text-xl">{applieduser.username.toUpperCase()}</div>
        <div className="line-clamp-3 mt-2 text-sm">User CitizenID: {applieduser.usercitizenid}</div>
        <div className="line-clamp-3 mt-2 text-sm">Applied Date: {applieduser.date.slice(0,10)}</div>
        </div>
        <div>
          {applieduser.status=='rejected'?(<label className=" bg-danger bg-gradient rounded border border-secondary ">Rejected</label>):applieduser.status=='null'?(
        <label className=" bg-warning bg-gradient rounded border border-secondary ">Pending...</label>):
        (<label className=" bg-success bg-gradient rounded border border-secondary ">Approved</label>)}
        
        </div>
      
    </Link>
  )
}

export default AppliedSchemeUserInfoCard

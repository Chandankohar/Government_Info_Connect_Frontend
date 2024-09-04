import React from 'react'

const AboutusCard = ({ image, name, address, contact,work,role }) => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-lg flex flex-col  text-center  sm:w-1/3 m-4">
    <img src={image} alt={name} className="h-2/3 w-full rounded-xl object-cover" />
    <h2 className="text-xl font-semibold text-white">{name}</h2>
    <p className="text-gray-300">{address}</p>
    <p className="text-gray-300">{contact}</p>
    <p className="text-gray-300">{role}</p>
    <p className="text-gray-300">{work}</p>
  </div>

  )
}

export default AboutusCard

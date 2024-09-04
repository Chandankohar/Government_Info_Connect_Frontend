import React from 'react'
import Chandan from '../../assets/Chandan.jpg'
import Manjit from '../../assets/Manjeet.jpeg'
import Divya from '../../assets/Divya.jpg'
import Krishna from '../../assets/Krishna.jpg'
import AboutusCard from './AboutusCard'
function AboutUs() {
    const members = [
        {
          image: Manjit, 
          name: 'Manjit Vishwakarma',
          address: '123 Street Name, Parasi, Nepal',
          contact: '+91 9876543210',
          role:'Team Leader',
          work:'Working as a Frontend Developer',
        },
        {
          image: Krishna, 
          name: 'Krishna Yadav',
          address: 'Bagaha , bhairahawa, Nepal',
          contact: '+9779804421275',
          role:'Team Member',
          work:'Working as a Backend Developer',
        },
        {
          image: Chandan, // Replace with the actual image URL
          name: 'Chandhan Kohar',
          address: 'Parasi, Nepal',
          contact: '+91 9876543212',
          role:'Team Member',
          work:'Working as a Backend Developer',
        },
        {
          image: Divya,
          name: 'Divya',
          address: '1011 Road Name, MR, India',
          contact: '+91 9876543213',
          role:'Team Member',
          work:'Working as a UI/UX Designer and Documentation',
        },
      ];
    
  return (
    
        
        <>
          <h1 className='fw-bold fs-4  mt-4 text-center '>About Our Team Members</h1>
          <div className="ms-10 me-10  border-[1px] border-secondary"></div>
          <div className="flex flex-row ms-10 me-10">
            {members.map((member, index) => (
              <AboutusCard 
                key={index} 
                image={member.image} 
                name={member.name} 
                address={member.address} 
                contact={member.contact} 
                work={member.work} 
                role={member.role} 
              />
            ))}
          </div>
          </>
       
     
    
  )
}

export default AboutUs

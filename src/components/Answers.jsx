import React, { useEffect, useState } from 'react'

const Answers = ({ans,index,totalResult}) => {
    const [heading,setHeading]= useState(false)
    const [starsReplace,setStarsReplace]=useState(ans)

    
    

    useEffect(()=>{
        if(handleHeading(ans)){
            setHeading(true)
            setStarsReplace(handleHeadingStars(ans))
        }
    },[])
    const handleHeading=(str)=>{
        return /^(\*)(\*)(.*)\*$/.test(str)
    }

    const handleHeadingStars=(str)=>{
        return str.replace(/^(\*)(\*)|(\*)$/g,'')
    }

  return (
    <div key={index} className='py-2'>
      {
        index===0 && totalResult>1?<span className='text-xl font-bold'>{starsReplace}</span>:
        heading? 
      <span className='  text-lg font-semibold'>{starsReplace}</span>
      :
      <span >{starsReplace}</span>
      }
    </div>
  )
}

export default Answers

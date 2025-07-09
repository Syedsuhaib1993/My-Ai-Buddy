import React, { useEffect, useState } from 'react'

const Answers = ({ ans, index, totalResult }) => {
  const [heading, setHeading] = useState(false)
  const [processed, setProcessed] = useState(ans)

  useEffect(() => {
    if (isHeading(ans)) {
      setHeading(true)
      setProcessed(cleanHeading(ans))
    }
  }, [ans])

  const isHeading = (str) => {
    // Match: starts with "**" ends with "*" (or "**")
    return /^\*\*.*\*$/.test(str)
  }

  const cleanHeading = (str) => {
    return str.replace(/^\*\*/, '').replace(/\*$/, '').trim()
  }

  return (
    <div key={index} className='py-2'>
      {
        heading ? (
          <span className='text-lg font-semibold'>{processed}</span>
        ) : (
          <span>{processed}</span>
        )
      }
    </div>
  )
}

export default Answers

// import React from 'react'

const Items = ({ person }) => {
    // console.log(person)
  return (
    <div className="item-box">
        {person.map((item) => (
            <img src={item.image} alt="Image" />
        ))}
    </div>
  )
}

export default Items
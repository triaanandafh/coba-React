import { useState } from "react"
import Items from "./components/Items"
import { ListItems } from "./data"


function App() {
  const [person, serPerson] = useState(ListItems);
  // console.log(person);
  return (
    <>
      <div className="list-items">
       <div className="container">
          <h1>Daftar Hadir : 0 orang</h1>
          <Items person={person}/>
       </div>
      </div>
    </>
  )
}

export default App

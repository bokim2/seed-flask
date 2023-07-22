import React, { useEffect } from 'react'
import AddFlask from '../components/AddFlask'
import FlaskList from '../components/FlaskList'
import Header from '../components/Header'

function Home() {
//   useEffect(()=>{
//     const fetchFlasks = async () => {
//         let response = await fetch("http://localhost:4000/api/flasks/")
//     let data = await response.json()
//     // console.log(data)
//     }
// },[])

  return (
    <div className="mainDiv">
      <Header />
      <AddFlask />
      <FlaskList />
    </div>
  )
}

export default Home

import React, { useEffect } from 'react'
import AddFlask from '../components/AddFlask'
import FlaskList from '../components/FlaskList'
import Header from '../components/header'

function Home() {
  useEffect(()=>{
    const fetchFlasks = async () => {
        let response = await fetch("http://localhost:3000/api/flasks/")
    let data = await response.json()
    // console.log(data)
    }
},[])

  return (
    <div>
      <Header />
      <AddFlask />
      <FlaskList />
    </div>
  )
}

export default Home

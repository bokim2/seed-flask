import React from 'react'
import AddFlask from '../components/AddFlask'
import FlaskList from '../components/FlaskList'
import Header from '../components/header'

function Home() {
  return (
    <div>
      <Header />
      <AddFlask />
      <FlaskList />
    </div>
  )
}

export default Home

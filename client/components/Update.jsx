import React,{ useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router';
import { FlasksContext } from '../context/FlasksContext' 

function Update(props) {
  const {id} = useParams();
  const { flasks } = useContext(FlasksContext);
  console.log('id in Update', id)
  useEffect(()=>{
    const getFlask = async()=>{
      console.log('id in Update', id)
      const response = await fetch(`http://localhost:3000/api/flasks/${id}/`)
      // console.log(http://localhost:3000/flasks/${id}/)
      let data = await response.json()
      console.log(data.data)
    }
    getFlask()
    .catch(console.err)
  },[])

  console.log(id)
  return (
  
    <div>
      update {id}
    </div>
  )
}

export default Update

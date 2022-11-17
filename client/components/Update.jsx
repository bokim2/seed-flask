import React,{ useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FlasksContext } from '../context/FlasksContext' 

function Update(props) {
  const {id} = useParams();

  console.log('id in Update', id)
  const {flasks, setFlasks} = useContext(FlasksContext);
    useEffect(()=>{
            const fetchFlasks = async () => {
                let response = await fetch("http://localhost:3000/api/flasks/")
            let data = await response.json()
            // console.log(data)
            setFlasks(data.data.flasks)
            // console.log('data.data.flasks', data.data.flasks)
            }
            fetchFlasks()
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

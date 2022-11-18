import React, { useState, useContext } from 'react'
import moment from 'moment';
moment().format();
import {momentFormat} from './FlaskList';
import { FlasksContext } from '../context/FlasksContext'

function AddFlask() {

    const [cell_bank, setCellBank] = useState("");
    const [inoculum_ul, setInoculum] = useState(50);
    const [media_ml, setMedia] = useState(250);
    
    const {flasks, addFlasks, setFlasks} = useContext(FlasksContext);

    function handleSubmit(e) {
        console.log("entering handleSubmit?")
        console.log('cell_bank,inoculum_ul,media_ml', cell_bank, inoculum_ul,media_ml)
        e.preventDefault();
        async function postFlask (){
            const response = await fetch('http://localhost:3000/api/flasks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cell_bank,
                    inoculum_ul,
                    media_ml,
                })
            })
          const data = await response.json()  
          addFlasks(data.data.flasks) 
        //   console.log(data)
        }
        postFlask()
        .catch(console.log('error in post server adding flask'))
 
    }

    let date = new Date();
  return (
    <div className="mb-4">
        <form action="">
            <div className="form-row row mb-3">
                <div className="col-sm">
                   cell bank number  <input type="text" value={cell_bank} onChange={e=> setCellBank(e.target.value)} className="form-control" placeholder="000001"/>
                </div> 
                <div className="col-sm">
                inoculum uL  <input type="text" value={inoculum_ul} onChange={e=> setInoculum(e.target.value)} className="form-control" placeholder="50"/>
                </div>
                <div className="col">
                media mL   <input type="text" value={media_ml} onChange={e=> setMedia(e.target.value)} className="form-control" placeholder="250"/>
                </div>
                <div className="col">
                start date  <input type="text"   className="form-control" placeholder={momentFormat(date)}/>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary mt-4 ">Submit</button>
            </div>
        </form>
      
    </div>
  )
}

export default AddFlask

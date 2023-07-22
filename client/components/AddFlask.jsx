import React, { useState, useContext } from 'react'
import moment from 'moment';
moment().format();
import axios from 'axios'
import {momentFormat} from './FlaskList';
import { FlasksContext } from '../context/FlasksContext'

function AddFlask() {

    const [cell_bank, setCellBank] = useState("");
    const [inoculum_ul, setInoculum] = useState(50);
    const [media_ml, setMedia] = useState(250);
    
    const {flasks, addFlasks, setFlasks} = useContext(FlasksContext);

    const handleSubmit = async (e) => {
        try {
        console.log("entering handleSubmit?")
        console.log('cell_bank,inoculum_ul,media_ml', cell_bank, inoculum_ul,media_ml)
        e.preventDefault();

        async function postFlask (){
        try {

        //   process.env.NODE_ENV === 'production'
        //   ? `api/url/getUserURL/${user}/`
        //   : `http://localhost:4000/api/url/getUserURL/${user}/`

        //     const response = await fetch('http://localhost:4000/api/flasks/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         cell_bank,
        //         inoculum_ul,
        //         media_ml,
        //     })
        // })

        const data = await axios.post(
          process.env.NODE_ENV === 'production'
          ? `api/flasks`
          : `http://localhost:4000/api/flasks/`,
          cell_bank,
          inoculum_ul,
          media_ml,  
        )
        addFlasks(data.data.flasks) 
    //   console.log( Flasks in addFlask, data.data.flasks)
        } catch (err){
            console.log(err)
        }
        }

        await postFlask()
        // .catch(console.log('error in post server adding flask'));

        const fetchFlasks = async () => {
            let { data: res } = await fetch("http://localhost:4000/api/flasks/")
        // let data = await response.json()
        // console.log(data)
        setFlasks(res.data.flasks)
        // console.log('data.data.flasks', data.data.flasks)
        }
        await fetchFlasks()
    } catch(error){
        console.log(error)
    }
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
               {/* <div className="col">
                start date  <input type="text"   className="form-control" placeholder={momentFormat(date)}/>
                </div> */}
                <button onClick={handleSubmit} type="submit" className="btn btn-primary mt-4 ">Submit</button>
            </div>
        </form>
      
    </div>
  )
}

export default AddFlask

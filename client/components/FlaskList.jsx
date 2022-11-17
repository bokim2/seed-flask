import React, { useContext, useEffect } from 'react'
import { FlasksContext } from '../context/FlasksContext'
// import FlaskFinder from "../apis/FlaskFinder"
import moment from 'moment';
moment().format();

export function momentFormat(timestamp){
    if(!timestamp){ return "" } else {return moment(timestamp).format('YY-MM-DD, h:mm:ss a')}
}

function timeSince (interval){
    if(!interval) return ""
    // console.log(interval)
    return  interval.days || (interval.hours && interval.hours) 
    // || (interval.min && interval.min + " min")
}

function FlaskList() {
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

  return (
    <div>
      <div className="list-group">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="bg-primary">
                <th scope="col">flask id</th>
                <th scope="col">cell bank</th>
                <th scope="col">inoculum uL</th>
                <th scope="col">media mL</th>
                <th scope="col">start YY-MM-DD</th>
                <th scope="col">sample YY-MM-DD</th>
                <th scope="col">completed</th>
                <th scope="col">time elapsed hr</th>
                <th scope="col">OD600</th>
            </tr>
          </thead>

          <tbody>
            
                {   flasks &&
                    flasks.map(flask => {
                        return (
                            <tr key={flask.id}>
                                <td className="text-center">{flask.id}</td>
                                <td className="text-center">{flask.cell_bank}</td>
                                <td className="text-center">{flask.inoculum_ul}</td>
                                <td className="text-center">{flask.media_ml}</td>
                                <td className="text-center">{momentFormat(flask.start_date)}</td>
                                <td className="text-center">{momentFormat(flask.end_date)}</td>
                                <td className="text-center">{flask.completed}</td>
                                <td className="text-center">{timeSince(flask.time_since_inoc)}</td>
                                <td className="text-center">{flask.od600}</td>
                            </tr>
                        )
                    })
                }
           
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default FlaskList

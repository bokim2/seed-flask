import React, { useState, useContext, useEffect } from 'react'
import { FlasksContext } from '../context/FlasksContext'
// import FlaskFinder from "../apis/FlaskFinder"
import moment from 'moment';
import { useNavigate } from 'react-router';
moment().format();
import { v4 as uuid } from 'uuid';

export function momentFormat(timestamp){
    if(!timestamp){ return "" } else {return moment(timestamp).format('YYYY-MM-DD, h:mm:ss a')}
}

export function momentInterval(end_date, start_date){
  let a = moment(end_date);//now
  // console.log('end_date', end_date)
  // if (end_date){
  //   // let a = moment()
  //   let b = moment(new Date());
  // } else {
  //   let a = moment(end_date);
  // }
  let b = moment(start_date);
  // console.log('b', b)
  // console.log(a.diff(b, 'minutes')) // 44700
  // console.log("a.diff(b, 'hours')", a.diff(b, 'hours')) // 745
  let time_elapsed = a.diff(b, 'hours')
  if (isNaN(time_elapsed)){
    time_elapsed = moment().diff(b, 'hours')
  }
  return time_elapsed
  // console.log(a.diff(b, 'days')) // 31
  // console.log(a.diff(b, 'weeks')) // 4
}

function timeSince (interval){
    if(!interval) return ""
    // console.log(interval)
    return  interval.days ||  interval.hours || 0
    // || (interval.min && interval.min + " min")
}

function FlaskList() {
    const {flasks, setFlasks} = useContext(FlasksContext);
    const navigate = useNavigate();
    // const [strain, setStrain] = useState("")

function navigateFlask(e, id){
  // e.stopPropagation();
  // setStrain(flask.strain)    
  navigate(`/${id}`)
}

    useEffect(()=>{
            const fetchFlasks = async () => {
                let response = await fetch("http://localhost:3000/api/flasks/")
            let data = await response.json()
            // console.log(data)
            setFlasks(data.data.flasks)
            console.log('data.data.flasks useEffect FlaskList', data.data.flasks)
            }
            fetchFlasks()
            .catch(console.err)
    },[])
// console.log('flasks inside', flasks)
  return (
    <div>
      <div className="list-group">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="bg-primary table-warning">
                <th className="text-center" scope="col">flask id</th>
                <th className="text-center" scope="col">cell bank</th>
                <th className="text-center" scope="col">inoculum uL</th>
                <th className="text-center" scope="col">media mL</th>
                <th className="text-center" scope="col">start YYYY-MM-DD</th>
                <th className="text-center" scope="col">sample YYYY-MM-DD</th>
                <th className="text-center" scope="col">completed</th>
                <th className="text-center" scope="col">time elapsed hr</th>
                <th className="text-center" scope="col">OD600</th>
                <th className="text-center table-primary" scope="col">strain</th>
            </tr>
          </thead>

          <tbody>
            
                {   flasks &&
                    flasks.map(flask => {
                        return (
                            <tr key={uuid()} value={flask.id} onClick={(e)=> navigateFlask(e, flask.id)}>
                                <td className="text-center">{flask.id}</td>
                                <td className="text-center">{flask.cell_bank}</td>
                                <td className="text-center">{flask.inoculum_ul}</td>
                                <td className="text-center">{flask.media_ml}</td>
                                <td className="text-center">{momentFormat(flask.start_date)}</td>
                                <td className="text-center">{momentFormat(flask.end_date)}</td>
                                <td className="text-center">{flask.completed}</td>
                                <td className="text-center">{flask.time_since_inoc
                                }</td>
                                <td className="text-center">{flask.od600}</td>
                                <td className="text-center table-light">{flask.strain}</td>
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

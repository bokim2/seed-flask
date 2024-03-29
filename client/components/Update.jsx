import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FlasksContext } from '../context/FlasksContext'
import { GraphByFlask } from './GraphByFlask'
import { momentFormat, momentInterval, fetchFlasks } from './FlaskList'
import axios from 'axios'
import moment from 'moment'
moment().format()

function Update(props) {
  const { id } = useParams()
  // console.log('id in Update', id)
  const { flasks, addFlasks, setFlasks } = useContext(FlasksContext)
  const [cellBank, setCellBank] = useState('')
  const [od600, setod600] = useState('')
  const [deleted, setDeleted] = useState('')
  const [inoc, setinoc] = useState('')
  const [inoculum_ul, setInoculum] = useState(50)
  const [media_ml, setMedia] = useState(250)
  const [start_date, setStartDate] = useState('')
  const [flasks_id, setFlasksId] = useState([])
  const [timepoint_interval, setTimepointInterval] = useState(0)

  useEffect(() => {
    const fetchFlasksall = async () => {
      const { data: res } = await axios(
        process.env.NODE_ENV === 'production'
          ? `api/flasks/${id}`
          : `http://localhost:4000/api/flasks/${id}`,
      )
      setCellBank(res.data.flasks.cell_bank)
      setod600(res.data.flasks.od600)
      setInoculum(res.data.flasks.inoculum_ul)
      setMedia(res.data.flasks.media_ml)
      setStartDate(res.data.flasks.start_date)

      let inter =
        moment().diff(momentFormat(res.data.flasks.start_date), 'minutes') / 60
      console.log('inter', inter)
      setTimepointInterval(inter.toFixed(2))
    }

    const fetchJoinedFlask = async () => {
      // let response = await fetch(`http://localhost:4000/api/flasksall/${id}`)
      const { data: res } = await axios(
        process.env.NODE_ENV === 'production'
          ? `api/flasksall/${id}`
          : `http://localhost:4000/api/flasksall/${id}`,
      )

      setFlasksId(res.data.flasks)
    }

    fetchFlasksall()
    fetchJoinedFlask().catch(console.err)
  }, [])

  const navigate = useNavigate()

  function navigateFlask(e, id) {
    // e.stopPropagation();
    navigate(`/${id}`)
  }

  //////////////
  function navigateFlaskHome() {
    // e.stopPropagation();
    navigate(`/`)
  }
  /////////////

  async function handleSubmit(e) {
    console.log('entering handleSubmit?')
    console.log('id in handlesubmit', id)
    // console.log('cell_bank,inoculum_ul,media_ml', cell_bank, inoculum_ul,media_ml)
    e.preventDefault()
    const date = new Date()
    console.log('handlesubmit, start_date', start_date)
    console.log('interval in handlesubmit', timepoint_interval)

    async function postFlask() {
      // const response = await fetch(`http://localhost:4000/api/flasks/${id}`, {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //         od600,
      //         completed: false,
      //         end_date: date,
      //         time_since_inoc: interval,
      //         flask_id: id,
      //     })
      // }

      // )

      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `api/flasks/${id}`
          : `http://localhost:4000/api/flasks/${id}`,
        {
          od600,
          completed: false,
          end_date: date,
          time_since_inoc: timepoint_interval,
          flask_id: id,
        },
      )
      // const data = await response.json()
      // setFlasks(data.data.flasks)
      // console.log('submit update flask', data)
    }
    await postFlask().catch(err =>
      console.log('error in post server adding flask'),
    )
    navigateFlaskHome()
  }

  function handleDelete(e) {
    console.log('entering handleSubmit?')
    // console.log('cell_bank,inoculum_ul,media_ml', cell_bank, inoculum_ul,media_ml)
    e.preventDefault()

    async function postFlask() {
      const response = await fetch(`http://localhost:4000/api/flasks/${id}`, {
        method: 'DELETE',
      })
      // const data = await response.json()
      // setFlasks(data.data.flasks)
      // console.log('submit update flask', data)
    }
    postFlask().catch(err => console.log('error in post server deleting flask'))
    navigateFlaskHome()
  }
  // console.log(id)
  return (
    <div className="updateFlask">
      <div className="updateFlaskId">
        <h4>Update - Flask Id: {id || 0}</h4>
      </div>
      <form action="">
        <div className="form-group">
          <label htmlFor="cell_bank">cellbank</label>
          <input
            id="cell_bank"
            value={cellBank || 0} 
            onChange={e => setCellBank(e.target.value)}
            className="form-control"
            type="text"
          ></input>
        </div>
        {/*<div className="form-group">
          <label htmlFor="sample_date">sample date</label>
          <input id="sample_date" className="form-control" type="text"></input>
         </div>*/}
        <div className="form-group">
          <label htmlFor="od600">OD600</label>
          <input
            id="od600"
            value={od600 ?? ''}
            onChange={e => setod600(e.target.value)}
            className="form-control"
            type="text"
          ></input>
        </div>
        <div className="d-grid gap-2 ">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-lg m-5"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="d-grid gap-2 col-6 mx-auto ">
        <button
          type="submit"
          onClick={handleDelete}
          className="btn btn-danger btn-lg m-5 "
        >
          Delete
        </button>
      </div>
      <GraphByFlask id={id} flasks_id={flasks_id} />
    </div>
  )
}

export default Update

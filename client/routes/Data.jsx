import React, { useContext, useEffect } from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS} from 'chart.js/auto'
import { useNavigate } from 'react-router';
import { FlasksContext } from '../context/FlasksContext';
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

function Data() {
  const {flasks, setFlasks} = useContext(FlasksContext);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchFlasks = async () => {
        let response = await fetch("http://localhost:3000/api/flasks/")
    let data = await response.json()
    // console.log(data)
    setFlasks(data.data.flasks)
    console.log('data.data.flasks', data.data.flasks)
    }
    fetchFlasks()
    .catch(console.err)
  },[])

  // const [flasksid, setFlasksid] = useState({
  //   labels: flasks.map((flask)=> flask.od600),
  //   datasets: [{
  //     label: "od600",
  //     data: flasks.map((flask)=> flask.cell_bank)
  //   }]
  // })

const flasksprops = {
    labels: flasks.map((flask)=> timeSince(flask.time_since_inoc)),
    datasets: [{
      label: "od600",
      data: flasks.map((flask)=> flask.od600)
    }]
  }

  // const defaultProps = {
  //   displayTitle: true,
  //   displayLegend: true,
  //   legendPosition: "right"
  // }
  console.log(flasksprops)

  return (
    <div className="barchartdiv" >
    <h3>OD600 vs Time Elapsed (hr)</h3>
    <Bar className="barchart" data={flasksprops} options={{
      title: {
        display: true,
        text: 'od600'
      },
      legend: {
        display:true,
        text: "hi"
      }
    }}/> 
    </div>
  )
}

export default Data

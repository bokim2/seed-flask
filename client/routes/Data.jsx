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
    { /*  flasks &&
      flasks.map(flask => {
          return (
              <tr key={flask.id} value={flask.id} onClick={(e)=> navigateFlask(e, flask.id)}>
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
    */}
    </div>
    // {(async function() {
    //   const data = [
    //     { year: 2010, count: 10 },
    //     { year: 2011, count: 20 },
    //     { year: 2012, count: 15 },
    //     { year: 2013, count: 25 },
    //     { year: 2014, count: 22 },
    //     { year: 2015, count: 30 },
    //     { year: 2016, count: 28 },
    //   ];
    
    //   new Chart(
    //     document.getElementById('acquisitions'),
    //     {
    //       type: 'bar',
    //       data: {
    //         labels: data.map(row => row.year),
    //         datasets: [
    //           {
    //             label: 'Acquisitions by year',
    //             data: data.map(row => row.count)
    //           }
    //         ]
    //       }
    //     }
    //   );
    // })()}

  )
}

export default Data

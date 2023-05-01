import React, { useContext } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { FlasksContext } from '../context/FlasksContext' 

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export function GraphByFlask(props){
    console.log('GraphByFlask props.flasks_id', props.flasks_id)
    return (
        <div>
            <div>{props.id}</div>
            <div>{JSON.stringify(props.flasks_id)}</div>
        </div>
    )
}
import React,{ useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FlasksContext } from '../context/FlasksContext' 

function Update(props) {
  const {id} = useParams();
// console.log('id in Update', id)
  const {flasks, addFlasks, setFlasks} = useContext(FlasksContext);
  const [cellBank, setCellBank] = useState("");
  const [od600, setod600] = useState("");
  const [deleted, setDeleted] = useState("");
  
  useEffect(()=>{
    const fetchFlasks = async () => {
        let response = await fetch(`http://localhost:3000/api/flasks/${id}`)
    let data = await response.json()
    // console.log(data)
    
    console.log('data.data.flasks', data.data.flasks, 'id', id)
    // console.log('data.data.flasks[id]', data.data.flasks[id])
    // setFlasks(data.data.flasks)
    setCellBank(data.data.flasks.cell_bank)
    setod600(data.data.flasks.od600)
    // console.log('data.data.flasks', data.data.flasks)
    }
    fetchFlasks()
    .catch(console.err)
},[])


  const navigate = useNavigate();

function navigateFlask(e, id){
// e.stopPropagation();    
navigate(`/${id}`)
  }

  //////////////
  function navigateFlaskHome(){
    // e.stopPropagation();    
    navigate(`/`)
      }
/////////////

function handleSubmit(e) {
  console.log("entering handleSubmit?")
  // console.log('cell_bank,inoculum_ul,media_ml', cell_bank, inoculum_ul,media_ml)
  e.preventDefault();
  async function postFlask (){
      const response = await fetch(`http://localhost:3000/api/flasks/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              cell_bank: cellBank,
              od600,
          })
      })
    // const data = await response.json()  
    // setFlasks(data.data.flasks) 
    // console.log('submit update flask', data)
  }
  postFlask()
  .catch(err => console.log('error in post server adding flask'))
  navigateFlaskHome()

}

function handleDelete(e) {
  console.log("entering handleSubmit?")
  // console.log('cell_bank,inoculum_ul,media_ml', cell_bank, inoculum_ul,media_ml)
  e.preventDefault();
  
  async function postFlask (){
      const response = await fetch(`http://localhost:3000/api/flasks/${id}`, {
          method: 'DELETE'

      })
    // const data = await response.json()  
    // setFlasks(data.data.flasks) 
    // console.log('submit update flask', data)
  }
  postFlask()
  .catch(err => console.log('error in post server deleting flask'))
  navigateFlaskHome()

}
  // console.log(id)
  return (
  
    <div>
      update {id}
      <form action="">
        <div className="form-group">
          <label htmlFor="cell_bank">cellbank</label>
          <input id="cell_bank" value={cellBank} onChange={e=> setCellBank(e.target.value)} className="form-control" type="text"></input>
        </div>
        {/*<div className="form-group">
          <label htmlFor="sample_date">sample date</label>
          <input id="sample_date" className="form-control" type="text"></input>
         </div>*/}
        <div className="form-group">
          <label htmlFor="od600">OD600</label>
          <input id="od600" value={od600} onChange={e=> setod600(e.target.value)} className="form-control" type="text"></input>
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary m-4">Submit</button>
      </form>
      <button type="submit" onClick={handleDelete} className="btn btn-danger m-4 ">Delete</button>
    </div>
  )
}

export default Update

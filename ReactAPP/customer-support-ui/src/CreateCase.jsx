import React, { useState }  from "react"
import { Link, useNavigate } from "react-router-dom"
import{CasePriority} from "./CaseStatus"

import axios from 'axios'
function CreateCase(){
    const[value, setValue]=useState({
        customerName:'',
        customerEmail:'',
        subject:'',
        description:'',
        status:0,
        priority:''
    })
    const navigate=useNavigate();
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.post("https://localhost:7234/api/SupportCase",value)
          .then(res=>{console.log(res);navigate("/")}).catch(err=>console.log(err));
        }
    return(
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className="w-50 border bg-white shadow px-5 pb-5 rounded">
        <h1>Create case</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="customerName" className="form-label">Customer Name:</label>
                <input type="text" name="customerName" className="form-control" placeholder="Enter Customer Name"
                 onChange={e=>setValue({...value,customerName:e.target.value})}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="customerEmail" className="form-label">Customer Email:</label>
                <input type="email" name="customerEmail" className="form-control" placeholder="Enter Customer Email"
                onChange={e=>setValue({...value,customerEmail:e.target.value})}></input>
            </div>
             <div className="mb-3">
                <label htmlFor="subject">Subject:</label>
                <input type="text" name="subject" className="form-control" placeholder="Enter Subject" 
                                 onChange={e=>setValue({...value,subject:e.target.value})}></input>
            </div>
             <div className="mb-3">
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" className="form-control" placeholder="Enter Description"
                                 onChange={e=>setValue({...value,description:e.target.value})}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="description">Priority:</label>

                 <select name="priority" className="form-control" value={value.priority}
                 onChange={e=>setValue({...value,priority:Number(e.target.value)})}>
                                    <option value="">Select priority</option>
                                    <option value={CasePriority.Low}>Low</option>
                                    <option value={CasePriority.Medium}>Medium</option>
                                    <option value={CasePriority.High}>High</option>
                
                                </select>
            </div>
            <button className="btn btn-success">Submit</button>
            <Link to="/" className="btn btn-primary ms-3">Back</Link>
        </form>
        </div>
    </div>
)
}
export default CreateCase
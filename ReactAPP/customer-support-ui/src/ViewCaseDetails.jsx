import React,{useState,useEffect}  from "react"
import { useParams ,Link} from "react-router-dom";
import axios from 'axios'

import { CasePriorityName,CaseStatusName } from "./CaseStatus";
function ViewCaseDetails(){

     const[data,setData]=useState([]);
     const {id}=useParams();
    useEffect(()=>{
        axios.get("https://localhost:7234/api/SupportCase/"+id)
        .then(res=>setData(res.data)).catch(err=>console.log(err));
    },[])

    return(<div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">

            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded ">
                <h3>Case Details</h3>
                <div className="mb-2">
                    <strong>Customer Name:{data.customerName}</strong>
                </div>
                <div className="mb-2">
                    <strong>Customer Email:{data.customerEmail}</strong>
                </div>
                <div className="mb-2">
                    <strong>Reference No:{data.referenceNo}</strong>
                </div>
                <div className="mb-2">
                    <strong>Subject:{data.subject}</strong>
                </div>
                <div className="mb-2">
                    <strong>Description:{data.description}</strong>
                </div>
                <div className="mb-2">
                   
                    <strong>Case Status:{CaseStatusName[data.status]}</strong>
                </div>
                <div className="mb-2">
                    <strong>Priority:{CasePriorityName[data.priority]}</strong>
                </div>
                <Link to={`/update/${id}`} className="btn btn-success">Update</Link>
                <Link to='/' className="btn btn-primary ms-3">Back</Link>

            </div>
    </div>)
}
export default ViewCaseDetails
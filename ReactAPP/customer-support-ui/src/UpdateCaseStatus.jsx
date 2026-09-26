import React, { useState, useEffect } from "react"
import { CaseStatus } from "./CaseStatus"
import axios from "axios"
import { Link, useParams, useNavigate } from 'react-router-dom'
function UpdateCaseStatus() {

    const [value, setValue] = useState({});
    const [error, setError] = useState("");

    const { id } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("https://localhost:7234/api/SupportCase/" + id)
            .then(res => setValue(res.data))
            .catch(err => console.log(err));
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        axios.put("https://localhost:7234/api/SupportCase/" + id, value)
            .then(res => { console.log(res); navigate("/") })
            .catch(err => {
                console.log(err.response?.data?.message);
                setError(err.response?.data?.message);
            }
            );
    }
    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pb-5 rounded">
                <h1>Update case Status</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="status">Case Status:</label>
                        {error && (<div className="alert alert-danger">{error}</div>)}
                        <select name="status" className="form-control" value={value.status}
                            onChange={e => setValue({ ...value, status: Number(e.target.value) })}>
                            <option value="">Select status</option>
                            <option value={CaseStatus.Open}>Open</option>

                            <option value={CaseStatus.InProgress}>In Progress</option>
                            <option value={CaseStatus.Resolved}>Resolved</option>

                        </select>
                    </div>

                    <button className="btn btn-success">Submit</button>
                    <Link to="/" className="btn btn-primary ms-3">Back</Link>
                </form>
            </div>
        </div>)
}
export default UpdateCaseStatus


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CasePriorityName, CaseStatusName } from "./CaseStatus";

function ViewCase() {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [custEmail, setCustEmail] = useState("");
    const [referenceNo, setReferenceNo] = useState("");


    useEffect(() => {
        axios
            .get("https://localhost:7234/api/SupportCase/SearchCaseAsync")
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container-fluid">
                <h1 className="text-center mb-4">
                    Customer Support Cases
                </h1>

                <div className="w-100 bg-white rounded border shadow p-4">
                    <div className="d-flex justify-content-end mb-3">
                        <Link to="/create" className="btn btn-success">
                            Create Case
                        </Link>
                    </div>

                    <div className="table-responsive">
                        <div className="row g3 mb-3">
                            <div className="col-md-2">
                                <label>
                                    Customer Email
                                </label>
                                <input type="text" name="customerEmail" className="form-control" placeholder="Search Email"
                                    value={custEmail}
                                    onChange={(e) => setCustEmail(e.target.value)} ></input>
                            </div>
                            <div className="col-md-3">
                                <label>
                                    Reference No
                                </label>
                                <input type="text" name="referenceNo" className="form-control" placeholder="Search refno"
                                    value={referenceNo}
                                    onChange={(e) => setReferenceNo(e.target.value)} ></input>
                            </div>
                            <div className="col-md-2">
                                <label>
                                    status
                                </label>
                                <select className="form-select" value={status}
                                    onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Select</option>
                                    {Object.entries(CaseStatusName).map(([key, value]) =>
                                        <option key={key} value={key}>{value}</option>

                                    )}
                                </select>
                            </div>

                            <div className="col-md-2">

                                <label>
                                    Priority
                                </label>
                                <select className="form-select" value={priority}
                                    onChange={(e) => setPriority(e.target.value)}>
                                    <option value="">Select</option>
                                    {Object.entries(CasePriorityName).map(([key, value]) =>
                                        <option key={key} value={key}>{value}</option>

                                    )}
                                </select>
                            </div>
                            <div className="col-md-2  mt-3 d-flex align-items-end">
                                <button className="btn btn-secondary btn-sm"
                                    onClick={() => { setReferenceNo(""); setCustEmail(""); setStatus(""); setPriority(""); }}
                                >Clear</button>
                            </div>
                        </div>
                        <table className="table table-striped table-bordered align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Reference Number</th>
                                    <th>Customer Name</th>
                                    <th>Customer Email</th>
                                    <th>Subject</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Created On</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data.filter((d) => status === "" || String(d.status) === status)
                                        .filter((d) => priority === "" || String(d.priority) === priority)
                                        .filter((d) => String(d.customerEmail).toLowerCase().includes(custEmail.toLowerCase()))
                                        .filter((d) => String(d.referenceNo).toLowerCase().includes(referenceNo.toLowerCase()))

                                        .map
                                        ((d) => (
                                            <tr key={d.id}>
                                                <td>{d.referenceNo}</td>
                                                <td>{d.customerName}</td>
                                                <td>{d.customerEmail}</td>
                                                <td>{d.subject}</td>
                                                <td>{d.description}</td>
                                                <td>{CaseStatusName[d.status]}</td>
                                                <td>{CasePriorityName[d.priority]}</td>
                                                <td>{d.createdOn}</td>

                                                <td className="text-center text-nowrap">
                                                    <Link
                                                        to={`/detail/${d.id}`}
                                                        className="btn btn-sm btn-primary me-2"
                                                    >
                                                        Details
                                                    </Link>

                                                    <Link
                                                        to={`/update/${d.id}`}
                                                        className="btn btn-sm btn-warning"
                                                    >
                                                        Update
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCase;

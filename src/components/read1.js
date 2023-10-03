import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate} from "react-router-dom";

const Read1 = () => {
    const { id } = useParams();
    const [user, setUsers] = useState([]);
    const [detail, detailData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8090/fetchbycode/"+id)
        //axios.get("http://localhost:8090/gettools")
        .then(res => {
            console.log(res)
            setUsers(res.data);
            detailData(res.data[0]);
        })
        .catch(err => console.log(err))
    }, [id]);
    
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this data?");

        if (confirmDelete) {
            try {
            await axios.delete(`http://localhost:8090/delete2/${id}`);
            window.location.reload();
            } catch (err) {
            console.log(err);
            }
        }
      };
 
    return (
        <div className="container">
            <div className="row">
            <div className="col-md-12">
            <h1>This Icha's Read</h1>
            <Link to="/up1" className="btn btn-primary"> add new user</Link>
            <div>
            <h2>Read Data Form</h2>
            <div className="card card-body mx-auto mt-3">
                <p align="left">Id: {id}</p>
                <p align="left">Code: {detail.code}</p>
                <p align="left">Note: {detail.note}</p>
                <p align="left">Input By: {detail.input_by}</p>
            </div>
            <table className="table table-bordered mx-auto mt-3">
                <thead>
                     <tr>
                        <th>id</th>
                        <th>tools_id</th>
                        <th>qty</th>
                        <th>created_at</th>
                        <th>updated_at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {user && user.map((user,i) => (
                  <tr key={i}>
                    <td>{user.id}</td>
                    <td>{user.tools_id}</td>
                    <td>{user.qty}</td>
                    <td>{user.created_at}</td>
                    <td>{user.updated_at}</td>
                    <td>
                      <Link
                        to={`/update/${user.id}`}
                        className="btn btn-info mx-2"
                      >
                        Edit
                      </Link>
                      <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button>
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
};

export default Read1;
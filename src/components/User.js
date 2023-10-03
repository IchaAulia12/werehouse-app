import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";



const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
            const res = await axios.get("http://localhost:8090/get");
            // console.log (res.data);
            setUsers(res.data); 
            } catch (err) {
                console.log (err);
            }
        };
        fetchAllUsers();
    }, []);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this data?");

        if (confirmDelete) {
            try {
            await axios.delete(`http://localhost:8090/delete/${id}`);
            window.location.reload();
            } catch (err) {
            console.log(err);
            }
        }
      };
 return (
    <div className="container">
        <h2 className="w-100 d-flex justify-content-center p-3">This Icha's CRUD</h2>
        <div className="row">
            <div className="col-md-12">
                <p><Link to="/up1" className="btn btn-primary"> add new user</Link></p> 
                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>code</th>
                        <th>note</th>
                        <th>input by</th>
                        <th>Create at</th>
                        <th>Update at</th>
                        <th>Actions</th>
                    </tr>
                </thead> 
                <tbody>
                    {
                        users.map((user, i) => {
                            return (
                                <tr key={i}>
                                    <td>{user.id}</td>
                                    <td> {user.code} </td>
                                    <td> {user.note} </td>
                                    <td> {user.input_by} </td>
                                    <td> {user.created_at}</td>
                                    <td>{user.updated_at}</td>
                                    <td>
                                        <Link to={`/read1/${user.id}`} className="btn btn-succsess mx-2">Read</Link>  
                                        <Link to={`/update/${user.id}`} className="btn btn-info mx-2">Edit</Link>
                                    <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                        
                        )
                    }
                </tbody>
                </table>
            </div>
        </div>
    </div>   
 )
}

export default Users;


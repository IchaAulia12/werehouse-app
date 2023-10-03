import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate} from "react-router-dom";

const Read = () => {
    const { id } = useParams();
    const [user, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8090/fetchbyid/"+id)
        .then(res => {
            console.log(res)
            setUsers(res.data[0]);
        })
        .catch(err => console.log(err))
    }, [id]);

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8090/delete/${id}`); 
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      };
 
    return (
        <div className="container">
            <div className="row">
            <div className="col-md-12">
            <h1>This Icha's Read</h1>
            <Link to="/up1" className="btn btn-primary"> add new user</Link>
           <table className="table table-bordered">
                <thead>
                     <tr>
                        <th>id</th>
                        <th>code</th>
                        <th>note</th>
                        <th>input by</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.code}</td>
                        <td>{user.note}</td>
                        <td>{user.input_by}</td>
                        <td>
                            <Link to={`/update/${user.id}`} className="btn btn-info mx-2">Edit</Link>
                        <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            </div>
        </div>
    );
};

export default Read;
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
const Update = () => {
    const {id} = useParams();
    const [user, setUser] = useState({
        code: "",
        note: "",
        input_by: "",
    });
 
    const location = useLocation();
    const navigate = useNavigate();
 
    const userId = location.pathname.split("/")[2];
 
    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
 
    useEffect(() => {
        axios.get("http://localhost:8090/fetchbyid/"+id)
        .then(res => {
            console.log(res)
            setUser(res.data[0]);
        })
        .catch(err => console.log(err))
    }, [id]);
 
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8090/update/${userId}`, user);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <div className="container">
    <h1>Edit Form</h1>
        <form>
                        <div className="mb-3 mt-3">
                            <label className="form-label"> ID:</label>
                            <input type="text" className="form-control" id="id" placeholder="Enter Your Full Name" name="id" value={id} disabled />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Code :</label>
                            <input type="text" className="form-control" placeholder="code barang" name="code" value={user.code} onChange={handleChange}></input>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Note :</label>
                            <input type="text" className="form-control" placeholder="tambah keterangan" name="note" value={user.note} onChange={handleChange} required></input>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Input By :</label>
                            <input type="text" className="form-control" placeholder="isikan nama penginput" name="input_by" value={user.input_by} onChange={handleChange} required></input>
                        </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Update</button>
        </form>
        <div className='container d-flex justify-content-center'>
            <Link to="/">See all users</Link>
        </div>
    </div>
  );
};

export default Update;
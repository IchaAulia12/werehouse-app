import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Add = () => {
    const [users, setUsers] = useState({
        code: "",
        note: "",
        input_by: "",
        created_at: "",
        updated_at: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsers ((prev) => ({...prev, [e.target.name]: e.target.value}))
    };
    const handleClik = async (e) => {          
        e.preventDefault();
        try{
            await axios.post("http://localhost:8090/post", users);
            navigate("/");
            alert("Data berhasil ditambahkan");
        } catch (err) {
            console.log(err);
        }
        // alert("Data berhasil ditambahkan");
    };

    return (
        <div>
            <h2 className="w-100 d-flex justify-content-left p-3">This Icha's Add</h2>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="w-100 d-flex justify-content-left p-3">Tambah Barang</h3>
                    <form>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Code :</label>
                            <input type="text" className="form-control" placeholder="code barang" name="code" onChange={handleChange}></input>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Note :</label>
                            <input type="text" className="form-control" placeholder="tambah keterangan" name="note" onChange={handleChange} required></input>
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Input By :</label>
                            <input type="text" className="form-control" placeholder="isikan nama penginput" name="input_by" onChange={handleChange} required></input>
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={handleClik}> Tambah barang</button>
                        <Link to="/"> See all data</Link>
                    </form>
                </div>

            </div>
        </div>
    )}; 


export default Add;
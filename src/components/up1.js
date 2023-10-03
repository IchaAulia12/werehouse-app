import React, { useState } from "react";
import Select from "react-dropdown-select";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Selectdd() {

  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8090/gettools'); // Replace with the appropriate API endpoint
        const fetchedData = response.data; // Assuming the response contains an array of objects with data
        const transformedOptions = fetchedData.map((item) => ({
          value: item.id, // Replace with the property that represents the value in the database
          label: item.name, // Replace with the property that represents the label in the database
        }));
        setOptions(transformedOptions);

      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
  
    fetchData();
  }, []);

    const [selectedValue, setSelectedValue] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [tableData, setTableData] = useState([]);
    const handleChange = (selectOption) => {
      setSelectedValue(selectOption[0]);
  }
    const handleClick = () => {
        // Add the selected value to your table or perform any other action
        if (selectedValue && inputValue) {
            const newData = {
              value: selectedValue.value,
              value1: selectedValue.label,
              value2: inputValue,
              // value2: selectedValue2.value,
            };
            setTableData((prevData) => [...prevData, newData]);
            setSelectedValue(null);
            setInputValue("");
            // setSelectedValue2(null);
          }
      };

    const handleDelete = (index) => {
        setTableData((prevData) => prevData.filter((data, i) => i !== index));
    }
    const handleSubmit = async () => {
      // Gather the necessary data from the frontend
      const note = document.querySelector("textarea").value;
      const items = tableData.map((data) => ({
        id: null,
        tools_id: data.value,
        qty: data.value2,
      }));
    
      // Prepare the data to be submitted to the backend
      const postData = {
        note: note,
        items: items,
      };
    
      try {
        // Make a POST request to the backend
        const response = await axios.post("http://localhost:8090/postok", postData);
        navigate("/");
        console.log(response.data); // Handle the response from the backend
        // Reset the tableData state and any other necessary state variables
        setTableData([]);
        // Reset any other necessary input values or state variables
        setInputValue("");
        setSelectedValue(null);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    };

    return (
        <div className="row mt-3"> 
          <div className="col-md-12 mx-2"> 
            <h4 className="d-flex justify-content-left">Note :</h4>
            <textarea className="d-flex justify-content-left"></textarea>
          </div>
          <div className="col-md-12 mx mt-2">
            <h4 className="d-flex justify-content-left">ini select pertama ku</h4>
            <div className="d-flex align-items-center mt-3">
              <div className="mr-2">
                <Select 
                  options={options} 
                  value={selectedValue ? [selectedValue] : []}
                  onChange={handleChange}
                  searchable
                ></Select>
              </div>
              <div className="mr-10 mr-2">
              <input 
              type="text" 
              className="form-control" 
              placeholder="code barang" 
              name="code" 
              onChange={(e) => setInputValue(e.target.value)}></input>
              </div>
              <button className="btn btn-primary" onClick={handleClick}>Add to Table</button>
            </div>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Id </th>
                  <th>Tools</th>
                  <th>ini qty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.value}</td>
                    <td>{data.value1}</td>
                    <td>{data.value2}</td> 
                    <td><button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-info" onClick={handleSubmit}> Submit </button>
          </div>
        </div>
      )
}

export default Selectdd;



import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const BuffetPage = () => {
  const [buffetData, setBuffetData] = useState([]);

  // Function to fetch buffet data
  const fetchBuffetData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/buffet");
      setBuffetData(response.data.reverse());
    } catch (error) {
      console.error("Error fetching buffet data:", error);
    }
  };

  useEffect(() => {
    // Fetch buffet data when component mounts
    fetchBuffetData();
    const intervalId = setInterval(() => {
      fetchBuffetData(); // Fetch data at every 5 seconds interval
    }, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle deleting buffet items
  const handleDeleteItem = async (name) => {
    try {
      // Send delete request with item name
      const response = await axios.delete(`http://localhost:5000/buffet/${name}`);
      if (response.status === 200) {
        // Remove the deleted item from the state
        const updatedBuffetData = buffetData.filter(item => item.name !== name);
        setBuffetData(updatedBuffetData);
        // Show success message
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Item deleted successfully`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error("Error deleting buffet item by name:", error);
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <div className="w-90 md:w-[870px] mx-auto px-4">
      <h2 className="text-2xl font-bold text-green my-4">Catering Responses</h2>

      {/* Buffet data table */}
      <div>
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="table w-full items-center ">
            {/* Table head */}
            <thead> 
              <tr className="text-white bg-green">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Event Type</th>
                <th>Number of Guests</th>
                <th>Date</th>
                <th>Time</th>
                <th>Package</th>
                <th>Selected Items</th>
                <th>Special Requests</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {buffetData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.eventType}</td>
                  <td>{item.numberOfGuests}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.packageName}</td>
                 <b> <td   style={{ overflowY: 'hidden', whiteSpace: 'nowrap'  }}>
    <div style={{ overflowX: 'hidden', height:'150px', width:'300px', fontSize:'15px' }}>
  
    {item.selected.map((selectedItem, i) => (
      <span
        key={i}
        className={i >= item.packageQty ? 'text-red' : ''}
      >
        {i + 1+')'} {selectedItem}{i !== item.selected.length - 1 ? ', ' : ''}
        <br />
      </span>
    ))}
  </div>
</td></b>

                  <td>{item.specialRequests}</td>
                  <td>
                    {/* Button to delete item */}
                    <button
                      onClick={() => handleDeleteItem(item.name)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrashAlt className="text-red" />
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuffetPage;

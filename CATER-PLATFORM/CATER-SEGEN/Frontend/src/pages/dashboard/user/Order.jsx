import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import './order.css'

const Order = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  const [currentOrders, setCurrentOrders] = useState(true); // Initially, show current orders
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Function to get status color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "order pending":
        return { background: "red", color: "white" };
      case "confirmed":
        return { background: "#FFBF00", color: "white" };
      case "preparing":
        return { background: "#FF6347", color: "white" };
      case "dispatched":
        return { background: "#0D98ba", color: "white" };
      case "completed":
        return { background: "green", color: "white" };
      default:
        return { background: "black", color: "white" };
    }
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter orders based on status
  const filteredOrders = currentOrders
    ? orders.filter((order) => ["order pending", "confirmed", "dispatched", "preparing"].includes(order.status))
    : orders.filter((order) => order.status === "completed");

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // date format
  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString(); // You can adjust options as needed
  };

  return (
    <div>
      <div className="page-header mb-0">
        <div className="container">
          <div className="row mx-auto text-center justify-center">
            <div className="col-12">
              <h2 className="font-extrabold text-6xl text-green">TRACK YOUR ORDERS </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        {/* Buttons for filtering orders */}
        <div className="flex justify-center my-4">
          <div className="relative flex items-center">
            <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-4 w-4 rounded-full ${currentOrders ? 'bg-gold' : 'bg-transparent'}`}></div>
            <button
              id="btncurrent"
              className={`mr-4 p-2 rounded-lg border-transparent font-bold ${
                currentOrders ? "bg-green text-white" : "bg-transparent text-green"
              }`}
              onClick={() => setCurrentOrders(true)}
            >
              Current Orders
            </button>
          </div>
          <div className="relative flex items-center">
            <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-4 w-4 rounded-full ${!currentOrders ? 'bg-gold' : 'bg-transparent'}`}></div>
            <button
              id="btnprevious"
              className={`border-transparent p-2 rounded-lg font-bold ${
                !currentOrders ? "bg-green text-white" : "bg-white text-green"
              }`}
              onClick={() => setCurrentOrders(false)}
            >
              Previous Orders
            </button>
          </div>
        </div>
        {/* table content */}
        <div>
          {currentItems.length > 0 ? (
            <div>
              <div>
                <div className="overflow-x-auto">
                  <table className="table text-center">
                    {/* head */}
                    <thead className="bg-green text-white rounded-sm">
                      <tr>
                        <th>#</th>
                        <th>Order Date</th>
                        <th>Transition ID</th>
                        <th>Items Ordered</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{formatDate(item.createdAt)}</td>
                          <td className="font-medium">{item.transitionId}</td>
                          <td>
                            {item.itemsName.map((itemName, index) => (
                              <div key={index}>
                                {index + 1} {itemName}
                              </div>
                            ))}
                          </td>
                          <td>₹{item.price}</td>
                          <td style={{ padding: '0px', width: 'fit-content', textAlign: 'center' }}>
                            <div className="rounded-full py-1 px-3 text-white font-bold" style={{ color: getStatusColor(item.status).color, backgroundColor: getStatusColor(item.status).background }}>
                              {item.status}
                            </div>
                          </td>
                          <td>
                            <a href="https://wa.me/+919697798888" target="_blank" rel="noopener noreferrer">
                              <button className="btn btn-sm border-none text-orange-400 bg-transparent">
                                Contact
                              </button>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <hr />
            </div>
          ) : (
            <div className="text-center">No orders to display.</div>
          )}
        </div>
        {/* Pagination */}
        <div className="flex justify-center my-10 mb-24">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm mr-2 btn-warning"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastItem >= filteredOrders.length}
            className="btn btn-sm bg-green text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;

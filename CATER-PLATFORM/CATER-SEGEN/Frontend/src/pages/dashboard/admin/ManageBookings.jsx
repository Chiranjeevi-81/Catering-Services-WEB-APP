import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageBookings = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");
  const axiosSecure = useAxiosSecure();

  // Fetching orders
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/payments/all", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // Local state for order statuses
  const [orderStatuses, setOrderStatuses] = useState({});

  // useEffect hook to update order statuses when orders change
  useEffect(() => {
    // Update order statuses when orders change
    if (orders.length > 0) {
      const updatedOrderStatuses = {};
      orders.forEach((order) => {
        updatedOrderStatuses[order._id] = order.status;
      });
      setOrderStatuses(updatedOrderStatuses);
    }
  }, [orders]);

  // Update order status on the server
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await axiosSecure.patch(`/payments/${orderId}`, { status });
      console.log(res.data); // Log response data for debugging
      setOrderStatuses(prevStatuses => ({
        ...prevStatuses,
        [orderId]: status,
      }));
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Order status changed to ${status}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      // Handle error, show error message or retry logic
    }
  };

  // Get button text based on status
  const getButtonText = (status) => {
    switch (status) {
      case "order pending":
        return "Confirm";
      case "confirmed":
        return "Prepare";
      case "preparing":
        return "Dispatch";
      case "dispatched":
        return "Complete";
      case "completed":
        return "Completed";
      default:
        return "Confirm";
    }
  };

  // Get button color based on status
  const getButtonColor = (status) => {
    switch (status) {
      case "order pending":
        return "red";
      case "confirmed":
        return "#FFBF00";
      case "preparing":
        return "#FF6347";
      case "dispatched":
        return "blue";
      case "completed":
        return "green";
      default:
        return "red";
    }
  };

  return (
    <>
      <div className="w-full md:w-[870px] mx-auto px-4 ">
        <h2 className="text-2xl font-semibold my-4">
          Manage All <span className="text-green">Bookings!</span>
        </h2>
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Transition Id</th>
                <th>Price</th>
                <th>No of Items</th>
                <th>Items Name</th>
                <th>Date</th>
                <th>Live Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.transitionId}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td className="min-w-[230px] font-bold" style={{ whiteSpace: 'pre-line' }}>
                    {item.itemsName.map((itemName, index) => (
                      `${index + 1}. ${itemName}\n`
                    ))}
                  </td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>{orderStatuses[item._id] || item.status}</td>
                  <td className="text-center">
                    <button
                      className={`btn rounded-full btn-xs text-center text-white`}
                      style={{ backgroundColor: getButtonColor(orderStatuses[item._id] || item.status) }}
                      onClick={() => {
                        switch (orderStatuses[item._id] || item.status) {
                          case "order pending":
                            updateOrderStatus(item._id, "confirmed");
                            break;
                          case "confirmed":
                            updateOrderStatus(item._id, "preparing");
                            break;
                          case "preparing":
                            updateOrderStatus(item._id, "dispatched");
                            break;
                          case "dispatched":
                            updateOrderStatus(item._id, "completed");
                            break;
                          default:
                            break;
                        }
                      }}
                    >
                      {getButtonText(orderStatuses[item._id] || item.status)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center my-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm mr-2 btn-warning"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= orders.length}
            className="btn btn-sm bg-green text-white"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageBookings;

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const Datatable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(
          collection(db, "EventParticipants")
        );
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        // console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // delete a specific user
  const handleDelete = async (id) => {
    setData(data.filter((item) => item.id !== id));
    try {
      await deleteDoc(doc(db, "EventParticipants", id));
      alert("Item Deleted!");
    } catch (error) {
      alert(error);
    }
  };

  // view a specific user
  const handleView = (id) => {
    navigate("/user", {
      state: {
        id: id,
      },
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              // to="/users/test"
              onClick={() => handleView(params.row.user_id)}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;

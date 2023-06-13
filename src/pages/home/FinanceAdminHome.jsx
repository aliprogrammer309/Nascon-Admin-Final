import React from "react";
import Widget from "../../components/widget/Widget";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

// import Table from "../../components/table/Table";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const FinanceAdminHome = () => {
  const [rows, setRows] = useState([]);
  const { dispatch } = useContext(AuthContext);

  React.useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "event"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //     console.log(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "EventParticipants"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ docid: doc.id, ...doc.data() });
        });
        setRows(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  console.log(rows);

  const handleApprove = async (id) => {
    try {
      const docRef = doc(db, "EventParticipants", id);
      // Set the "capital" field of the city 'DC'
      await updateDoc(docRef, {
        status: "Approved",
      });
      // setRows(rows.filter((item) => item.docid !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <div className="homeContainer">
        {/* <div className="widgets">
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div> */}
        {/* <div className="charts">
        <Featured />
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
      </div> */}
        <div className="listContainer">
          <Stack spacing={2} direction="row" justifyContent="center">
            <Button
              color="error"
              variant="outlined"
              onClick={() => dispatch({ type: "LOGOUT" })}
            >
              Logout
            </Button>
          </Stack>
          <div className="listTitle">Latest Transactions</div>
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">Tracking ID</TableCell>
                  {/* <TableCell className="tableCell">User</TableCell> */}
                  <TableCell className="tableCell">User</TableCell>
                  <TableCell className="tableCell">CNIC</TableCell>
                  <TableCell className="tableCell">Event</TableCell>
                  <TableCell className="tableCell">Fee</TableCell>
                  <TableCell className="tableCell">Payment Status</TableCell>
                  <TableCell className="tableCell">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.docid}>
                    <TableCell className="tableCell">{row.id}</TableCell>
                    {/* <TableCell className="tableCell">
                      <div className="cellWrapper">
                        <img src={row.img} alt="" className="image" />
                        {row.product}
                      </div>
                    </TableCell> */}
                    <TableCell className="tableCell">{row.name}</TableCell>
                    <TableCell className="tableCell">{row.cnic}</TableCell>
                    <TableCell className="tableCell">{row.eventName}</TableCell>
                    <TableCell className="tableCell">{row.fee}</TableCell>
                    <TableCell className="tableCell">
                      <span className={`status ${row.status}`}>
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell className="tableCell">
                      {row.status === "Pending" ? (
                        <Stack direction="row" spacing={1}>
                          <Button
                            color="primary"
                            variant="outlined"
                            size="small"
                            // onClick={handleLogOut}
                          >
                            View
                          </Button>
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={() => handleApprove(row.docid)}
                          >
                            Approve
                          </Button>
                        </Stack>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default FinanceAdminHome;

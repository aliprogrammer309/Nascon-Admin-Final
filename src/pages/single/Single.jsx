import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Stack } from "@mui/material";
import QRCode from "react-qr-code";

const Single = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const id = location.state?.id;
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const q = query(collection(db, "EventParticipants"), where("user_id", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          list.push({ id: doc.id, ...doc.data() });
          console.log(doc.id, " => ", doc.data());
        });
        setData(list);
      } catch (error) {console.log(error)}
      setData(list);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="title">Information</h1>
            <div className="item">
              {/* <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              /> */}
              <div className="details">
                <h1 className="itemTitle">{data[0]?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data[0]?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data[0]?.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Cnic:</span>
                  <span className="itemValue">{data[0]?.cnic}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-container">
          {data.map((item) => (
            <Stack
              direction="row"
              spacing={5}
              alignItems="center"
              justifyContent="center"
              className="stack-item"
              key={item.id}
            >
              <h3>Event: {item.eventName}</h3>
              <h3>Fee: {item.fee}</h3>
              <h3>Status: {item.status}</h3>
              {/* <h3>id: {item.doc_id}</h3> */}

              {/* <div className="recied-qrcode"> */}
              <QRCode
                size={80}
                style={{ height: "auto", maxWidth: "80%" }}
                value={item.user_id}
                viewBox={`0 0 256 256`}
              />
            </Stack>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Single;

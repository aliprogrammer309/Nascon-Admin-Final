import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Home = () => {
  const [events, setEvents] = useState(0);
  const [competitions, setCompetitions] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [balance, setBalance] = useState(0);

  // fetch no of users
  useEffect(() => {
    const fetchData = async () => {
      const coll = collection(db, "event");
      const snapshot = await getCountFromServer(coll);
      // console.log("count: ", snapshot.data().count);
      setEvents(snapshot.data().count);
    };
    fetchData();
  }, []);

  // fetch no of event
  useEffect(() => {
    const fetchData = async () => {
      const coll = collection(db, "competition");
      const snapshot = await getCountFromServer(coll);
      // console.log("count: ", snapshot.data().count);
      setCompetitions(snapshot.data().count);
    };
    fetchData();
  }, []);

  // fetch no of competitions
  useEffect(() => {
    const fetchData = async () => {
      const coll = collection(db, "EventParticipants");
      const snapshot = await getCountFromServer(coll);
      // console.log("count: ", snapshot.data().count);
      setParticipants(snapshot.data().count);
    };
    fetchData();
  }, []);

  // fetch total amount of approved participants
  useEffect(() => {
    const fetchData = async () => {
      try {
        let total = 0;
        const q = query(
          collection(db, "EventParticipants"),
          where("status", "==", "Approved")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const fieldValue = parseInt(doc.data().fee);
          total += fieldValue;
          // doc.data() is never undefined for query doc snapshots
          // list.push({ id: doc.id, ...doc.data() });
          // console.log(doc.id, " => ", doc.data());
        });
        setBalance(total);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {/* <Navbar /> */}
        <div className="widgets">
          <div className="widget">
            <div className="left">
              <span className="title">USERS</span>
              <span className="counter">{participants}</span>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <span className="link">See all users</span>
              </Link>
            </div>
            <div className="right">
              <div className="percentage positive">
                <KeyboardArrowUpIcon />
                20%
              </div>
              {/* {data.icon} */}
            </div>
          </div>
          <div className="widget">
            <div className="left">
              <span className="title">EVENTS</span>
              <span className="counter">{events}</span>
              <Link to="/manageEvents" style={{ textDecoration: "none" }}>
                <span className="link">See all events</span>
              </Link>
            </div>
            <div className="right">
              <div className="percentage positive">
                <KeyboardArrowUpIcon />
                20%
              </div>
              {/* {data.icon} */}
            </div>
          </div>
          <div className="widget">
            <div className="left">
              <span className="title">COMPETITIONS</span>
              <span className="counter">{competitions}</span>
              <Link to="/manageCompetitions" style={{ textDecoration: "none" }}>
                <span className="link">See all competitions</span>
              </Link>
            </div>
            <div className="right">
              <div className="percentage positive">
                <KeyboardArrowUpIcon />
                20%
              </div>
              {/* {data.icon} */}
            </div>
          </div>
          <div className="widget">
            <div className="left">
              <span className="title">BALANCE</span>
              <span className="counter">{balance} PKR</span>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <span className="link">See all users</span>
              </Link>
            </div>
            <div className="right">
              <div className="percentage positive">
                <KeyboardArrowUpIcon />
                20%
              </div>
              {/* {data.icon} */}
            </div>
          </div>
          {/* <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;

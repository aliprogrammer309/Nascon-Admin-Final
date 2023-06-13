import * as React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import "./createNewEvent.scss";
import { db, storage } from "../../firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const CreateNewEvent = () => {
  const [file, setFile] = useState("");
  // const [date, setDate] = useState(new Date());
  // const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  // const handleInput = (e) => {
  //   const id = e.target.id;
  //   const value = e.target.value;

  //   setData({ ...data, [id]: value });
  // };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // const res = await createUserWithEmailAndPassword(
      //   auth,
      //   data.email,
      //   data.password
      // );
      await addDoc(collection(db, "event"), {
        ...data,
        title: {title},
        description: {description},
        ticketPrice: {ticketPrice},
        eventTime: {time},
        eventDate: {date},
        timeStamp: serverTimestamp(),
      });
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Event</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
                <div className="formInput" >
                  <label>Title</label>
                  <input type="text" placeholder="title of the event" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="formInput" >
                  <label>Description</label>
                  <input type="text" placeholder="description of the event" onChange={(e) => setDescription(e.target.value)}/>
                </div>
                
                <div className="formInput" >
                  <label>Price</label>
                  <input type="number" placeholder="ticket price" onChange={(e) => setTicketPrice(e.target.value)}/>
                </div>
                <div className="formInput" >
                  <label>Date</label>
                  <input type="date" onChange={(e) => setDate(e.target.value)}/>
                </div><div className="formInput" >
                  <label>Starting Time</label>
                  <input type="time" onChange={(e) => setTime(e.target.value)}/>
                </div>

              <button disabled={per !== null && per < 100} type="submit">Add Event</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewEvent;

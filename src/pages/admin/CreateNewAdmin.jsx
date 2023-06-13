import * as React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import "./createNewCompetition.scss";
import { auth, db, storage } from "../../firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";


const CreateNewAdmin = () => {
  //const [file, setFile] = useState("");
  // const [date, setDate] = useState(new Date());
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [adminStatus, setAdminStatus] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  
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
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addDoc(collection(db, "Admin"), {
        ...data,
        name: name,
        adminStatus: adminStatus,
        phone: phone,
        email: email,
        password: password,
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
          <h1>Add new Admin</h1>
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
                  <label>Name and surname</label>
                  <input type="text" placeholder="ali haider" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="formInput" >
                <span><label for="html">Finance_Manager</label></span>
                    <input type="radio" id="html" name="fav_language" value="Finance_Manager" onClick={(e) => setAdminStatus(e.target.value)}/>
                    <input type="radio" id="css" name="fav_language" value="Event_Manager" onClick={(e) => setAdminStatus(e.target.value)}/>
                    <label for="css">Event_Manager</label><br/>
                    <input type="radio" id="javascript" name="fav_language" value="Blog_Manager" onClick={(e) => setAdminStatus(e.target.value)}/>
                    <label for="javascript">Blog_Manager</label>                
                </div>
                <div className="formInput" >
                  <label>Phone</label>
                  <input type="tel" placeholder="+921234567890" onChange={(e) => setPhone(e.target.value)}/>
                </div>

                <div className="formInput" >
                  <label>Email</label>
                  <input type="email" placeholder="ali@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="formInput" >
                  <label>Password</label>
                  <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>

              <button disabled={per !== null && per < 100} type="submit">Add New Admin</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewAdmin;

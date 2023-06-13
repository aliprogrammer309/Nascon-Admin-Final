// import "./manageCompetition.scss";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { Button, Stack } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";


export default function ManageBlogs() {
  const [data, setData] = React.useState([]);

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
      collection(db, "blog"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  console.log(data);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "blog", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>Manage All Blogs</h1>
            <Link to="/CreateNewBlog" style={{ textDecoration: "none" }}>
              <Button variant="outlined" size="" color="success">
                Add New Blog
              </Button>
            </Link>
          </div>
          <div className="bottom">
            {data.map((blog) => (
              <div className="card" key={blog.id}>
                <Card sx={{ maxWidth: 450, minWidth: 440 }}>
                  <CardHeader title={blog.title} />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {blog.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Stack spacing={2} direction="row">
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(blog.id)}
                      >
                        delete
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

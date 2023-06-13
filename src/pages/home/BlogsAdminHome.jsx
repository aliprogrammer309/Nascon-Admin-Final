import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const BlogsAdminHome = () => {
  const { dispatch } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
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
        <div className="newContainer">
          <div className="top">
            <h1>Manage All Blogs</h1>
            <Stack spacing={2} direction="row">
              <Link to="/addBlog" style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="" color="success">
                  Add New Blog
                </Button>
              </Link>
              <Button color="error" variant="outlined" onClick={() => dispatch({ type: "LOGOUT" })}>
                Logout
              </Button>
            </Stack>
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
};

export default BlogsAdminHome;

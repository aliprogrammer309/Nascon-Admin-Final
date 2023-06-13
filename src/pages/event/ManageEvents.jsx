import "./manageEvents.scss";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function ManageEvents() {
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
      collection(db, "event"),
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
      await deleteDoc(doc(db, "event", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <div>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            {/* <h1>Manage All Events</h1> */}
            <h1>Manage All Events</h1>
            <Link to="/CreateNewEvent" style={{textDecoration: "none"}}>
            <Button variant="outlined" size="" color="success">Add New Event</Button>
            </Link>
          </div>
          <div className="bottom">
            {data.map((event) => (
              <div className="card" key={event.id}>
                <Card sx={{ maxWidth: 345 }} style={{margin: "1%"}}>
                  <CardHeader
                    title={event.title.title}
                    subheader={"Ticket Price: " + event.ticketPrice.ticketPrice + " PKR" }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={event.img}
                    alt="Paella dish"
                  />
                  <CardContent>
                  <Typography variant="body2" >
                      {"Event Date: " + event.eventDate.date}
                    </Typography><Typography variant="body2" >
                      {"Event Time: " + event.eventTime.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Stack spacing={2} direction="row">
                      {/* <Button variant="outlined" size="small" color="warning">edit</Button> */}
                      <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(event.id)}>delete</Button>
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

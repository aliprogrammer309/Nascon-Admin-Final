import "./manageCompetition.scss";
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

export default function ManageCompetitions() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {

    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "competition"),
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
      await deleteDoc(doc(db, "competition", id));
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
            <h1>Manage All Competitions</h1>
            <Link to="/CreateNewCompetition" style={{textDecoration: "none"}}>
            <Button variant="outlined" size="" color="success">Add New Competition</Button>
            </Link>
          </div>
          <div className="bottom">
            {data.map((competition) => (
              <div className="card" key={competition.id}>
                <Card sx={{ maxWidth: 345 }} style={{margin: "1%"}}>
                  <CardHeader
                    title={competition.title.title}
                    subheader={"Fee per player: " + competition.feePerPlayer.feePerPlayer + " PKR" }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={competition.img}
                    alt="Paella dish"
                  />
                  <CardContent>
                  <Typography variant="body2" >
                      {"PLayers per Team: " + competition.numberOfPlayers.numberOfPlayers}
                    </Typography><Typography variant="body2" >
                      {"Event Date: " + competition.date.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {competition.description.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Stack spacing={2} direction="row">
                      {/* <Button variant="outlined" size="small" color="warning">edit</Button> */}
                      <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(competition.id)}>delete</Button>
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

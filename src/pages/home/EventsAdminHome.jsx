import "../../pages/event/manageEvents.scss";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function EventsAdminHome() {
  const [data, setData] = React.useState([]);
  const [competitoinData, setCompetitionData] = React.useState([]);
  const { dispatch } = React.useContext(AuthContext);

  React.useEffect(() => {
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

  React.useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "competition"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setCompetitionData(list);
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

  const handleDeleteCompetition = async (id) => {
    try {
      await deleteDoc(doc(db, "competition", id));
      setCompetitionData(competitoinData.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            {/* <h1>Manage All Events</h1> */}
            <h1>Manage All Events</h1>
            <Stack spacing={2} direction="row">
              <Link to="/addEvent" style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="" color="success">
                  Add Event
                </Button>
              </Link>
              <Link to="/addCompetition" style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="" color="success">
                  Add Competition
                </Button>
              </Link>
              <Button
                color="error"
                variant="outlined"
                onClick={() => dispatch({ type: "LOGOUT" })}
              >
                Logout
              </Button>
            </Stack>
          </div>
          <div className="bottom">
            {data.map((event) => (
              <div className="card" key={event.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    title={event.title.title}
                    subheader={
                      "Ticket Price: " + event.ticketPrice.ticketPrice + " PKR"
                    }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={event.img}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2">
                      {"Event Date: " + event.eventDate.date}
                    </Typography>
                    <Typography variant="body2">
                      {"Event Time: " + event.eventTime.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Stack spacing={2} direction="row">
                      {/* <Button variant="outlined" size="small" color="warning">
                        edit
                      </Button> */}
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDelete(event.id)}
                      >
                        delete
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
          <div className="bottom">
            {competitoinData.map((competition) => (
              <div className="card" key={competition.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    title={competition.title.title}
                    subheader={
                      "Fee per player: " +
                      competition.feePerPlayer.feePerPlayer +
                      " PKR"
                    }
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={competition.img}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2">
                      {"PLayers per Team: " +
                        competition.numberOfPlayers.numberOfPlayers}
                    </Typography>
                    <Typography variant="body2">
                      {"Event Date: " + competition.date.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {competition.description.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Stack spacing={2} direction="row">
                      {/* <Button variant="outlined" size="small" color="warning">
                        edit
                      </Button> */}
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleDeleteCompetition(competition.id)}
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

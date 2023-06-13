import { Button, ButtonGroup, Rating } from "@mui/material";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  avg,
} from "firebase/firestore";
import "firebase/firestore";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../../firebase-config";
import clubs from "../../assets/clubs.svg";
import happiness from "../../assets/happiness.svg";
import internet from "../../assets/internet.svg";
import food from "../../assets/food.svg";
import reputation from "../../assets/reputation.svg";
import opportunities from "../../assets/opportunities.svg";
import social from "../../assets/social.svg";
import facilities from "../../assets/facilities.svg";
import Location from "../../assets/location.svg";
import safety from "../../assets/safety.svg";

import "./feedback.css";
import Sidebar from "../../components/sidebar/Sidebar";

const Feedback = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const item = location.state;

  const [clubsAvg, setClubsAvg] = useState(0);
  const [facilitiesAvg, setFacilitiesAvg] = useState(0);
  const [foodAvg, setFoodAvg] = useState(0);
  //   const [happinessAvg, setHappinessAvg] = useState(0);
  const [internetAvg, setInternetAvg] = useState(0);
  //   const [locationAvg, setLocationAvg] = useState(0);
  const [opportunitiesAvg, setOpportunitiesAvg] = useState(0);
  //   const [reputationAvg, setReputationAvg] = useState(0);
  const [safetyAvg, setSafetyAvg] = useState(0);
  //   const [socialAvg, setSocialAvg] = useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      let list = [];
      //   let happinessSum = 0;
      let internetSum = 0;
      let foodSum = 0;
      let clubSum = 0;
      //   let reputationSum = 0;
      let opportunitieSum = 0;
      //   let socialSum = 0;
      let facilitiSum = 0;
      //   let locationSum = 0;
      let safetySum = 0;
      let count = 0;

      try {
        const q = query(
          collection(db, "Feedback"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          //   happinessSum += doc.data().happiness;
          internetSum += doc.data().internet;
          foodSum += doc.data().food;
          clubSum += doc.data().clubs;
          //   reputationSum += doc.data().reputation;
          opportunitieSum += doc.data().opportunities;
          //   socialSum += doc.data().social;
          facilitiSum += doc.data().facilities;
          //   locationSum += doc.data().location;
          safetySum += doc.data().safety;

          count++;
          list.push({ id: doc.id, ...doc.data() });
        });
        // setHappinessAvg(happinessSum / count);
        setInternetAvg(internetSum / count);
        setFoodAvg(foodSum / count);
        setClubsAvg(clubSum / count);
        // setReputationAvg(reputationSum / count);
        setOpportunitiesAvg(opportunitieSum / count);
        // setSocialAvg(socialSum / count);
        setFacilitiesAvg(facilitiSum / count);
        // setLocationAvg(locationSum / count);
        setSafetyAvg(safetySum / count);

        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {data.length === 0 ? (
          <div>
            <h1 style={{ textAlign: "center", color: "red" }}>
              Loading Feedback
            </h1>
          </div>
        ) : (
          <div className="school-results-container">
            <div className="school-summary-container">
              <div className="school-summary-half">
                <div className="school-summary-child">
                  <div className="school-summary-child-left">
                    <img src={internet} alt="" />
                    <p>Internet</p>
                  </div>
                  <div className="school-summary-child-right">
                    <h3>{parseFloat(internetAvg).toFixed(1)}</h3>
                  </div>
                </div>
                <div className="school-summary-child">
                  <div className="school-summary-child-left">
                    <img src={food} alt="" />
                    <p>Food</p>
                  </div>
                  <div className="school-summary-child-right">
                    <h3>{parseFloat(foodAvg).toFixed(1)}</h3>
                  </div>
                </div>
                <div className="school-summary-child">
                  <div className="school-summary-child-left">
                    <img src={clubs} alt="" />
                    <p>Clubs</p>
                  </div>
                  <div className="school-summary-child-right">
                    <h3>{parseFloat(clubsAvg).toFixed(1)}</h3>
                  </div>
                </div>
              </div>

              <div className="school-summary-half">
                <div className="school-summary-child">
                  <div className="school-summary-child-left">
                    <img src={opportunities} alt="" />
                    <p>Opportunities</p>
                  </div>
                  <div className="school-summary-child-right">
                    <h3>{parseFloat(opportunitiesAvg).toFixed(1)}</h3>
                  </div>
                </div>
                <div className="school-summary-child">
                  <div className="school-summary-child-left">
                    <img src={facilities} alt="" />
                    <p>Facilities</p>
                  </div>
                  <div className="school-summary-child-right">
                    <h3>{parseFloat(facilitiesAvg).toFixed(1)}</h3>
                  </div>
                </div>
                <div className="school-summary-child">
                  <div className="school-summary-child-left">
                    <img src={safety} alt="" />
                    <p>Safety</p>
                  </div>
                  <div className="school-summary-child-right">
                    <h3>{parseFloat(safetyAvg).toFixed(1)}</h3>
                  </div>
                </div>
              </div>
            </div>
            {data.map((rating) => (
              <div className="school-rating-cell" key={rating.id}>
                <div className="rating-cell-left">
                  <p>Overall</p>
                  <h1>
                    {((rating.opportunities +
                      rating.facilities +
                      rating.internet +
                      rating.food +
                      rating.clubs +
                      rating.safety) /
                      6).toFixed(1)}
                  </h1>
                </div>
                <div className="rating-cell-right">
                  <div className="right-cell-header">
                    <h4 className="singal-word">
                      {(rating.opportunities +
                        rating.facilities +
                        rating.internet +
                        rating.food +
                        rating.clubs +
                        rating.safety) /
                        6 >
                      3
                        ? "GREAT"
                        : "AWFUL"}
                    </h4>
                    <h4>{rating.timestamp.toDate().toDateString()}</h4>
                  </div>
                  <div className="right-cell-description">
                    <p>{rating.review}</p>
                  </div>
                  <div className="right-cell-results">
                    <div className="right-cell-results-left">
                      {/* <div className="result-cell">
                        <b>Reputation</b>
                        <Rating
                          name="read-only"
                          value={rating.reputation}
                          readOnly
                        />
                      </div>
                      <div className="result-cell">
                        <b>Location</b>
                        <Rating
                          name="read-only"
                          value={rating.location}
                          readOnly
                        />
                      </div> */}
                      <div className="result-cell">
                        <b>Opportunities</b>
                        <Rating
                          name="read-only"
                          value={rating.opportunities}
                          readOnly
                        />
                      </div>
                      <div className="result-cell">
                        <b>Facilities</b>
                        <Rating
                          name="read-only"
                          value={rating.facilities}
                          readOnly
                        />
                      </div>
                      <div className="result-cell">
                        <b>Internet</b>
                        <Rating
                          name="read-only"
                          value={rating.internet}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="right-cell-results-left">
                      <div className="result-cell">
                        <b>Food</b>
                        <Rating name="read-only" value={rating.food} readOnly />
                      </div>
                      <div className="result-cell">
                        <b>Clubs</b>
                        <Rating
                          name="read-only"
                          value={rating.clubs}
                          readOnly
                        />
                      </div>
                      {/* <div className="result-cell">
                        <b>Social</b>
                        <Rating
                          name="read-only"
                          value={rating.social}
                          readOnly
                        />
                      </div>
                      <div className="result-cell">
                        <b>Happiness</b>
                        <Rating
                          name="read-only"
                          value={rating.happiness}
                          readOnly
                        />
                      </div> */}
                      <div className="result-cell">
                        <b>Safety</b>
                        <Rating
                          name="read-only"
                          value={rating.safety}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;

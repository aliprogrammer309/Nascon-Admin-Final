import { useContext, useEffect, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";

const EventsAdminLogin = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminsData, setAdminsData] = useState([]);

  const navitage = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const foundObject = adminsData.find((obj) => obj.email === email);
    if (foundObject) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch({ type: "LOGIN", payload: user });
          navitage("/eventsAdminHome", {
            state: {
              home: "Event_Manager",
            },
          });
        })
        .catch((error) => {
          setError(true);
        });
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let list1 = [];

      try {
        const q = query(
          collection(db, "Admin"),
          where("adminStatus", "==", "Event_Manager")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          list1.push({ id: doc.id, ...doc.data() });
        });
        setAdminsData(list1);
        console.log(list1);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <span>Wrong email or password!</span>}
      </form>
    </div>
  );
};

export default EventsAdminLogin;

import NavBar from "./components/NavBar/NavBar";
import Welcome from "./components/Welcome/Welcome";
import Login from "./components/Login/Login";
import Subscription from "./components/Subscription/Subscription";
import Definitions from "./components/Definitions/Definitions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./components/Context/Context";
import { useState, useEffect } from "react";
import {isExpired } from "react-jwt";
import "./App.css";
import Account from "./components/Account/Account";
import AlterPassWord from "./components/AlterPassWord/AlterPassWord"

function App() {
    const [word, setWord] = useState("");
    const [go, setGo] = useState(false);

    const [granted, setGranted] = useState(localStorage.getItem("token"));
    const [comToLogin, setComToLogin] = useState(false);
    const [userId, setUserId] = useState(0);
    const [userName,setUserName] = useState("");
    const [selected, setSelected] = useState(1);

    useEffect(
        ()=>{
            if(granted !== null && isExpired(granted)){
                setGranted(null);
                localStorage.removeItem("token");
            }
        return ()=>{}},
        [setGranted,granted]);

    return (
        <UserContext.Provider value={{ word, setWord, go, setGo, granted, setGranted,  comToLogin, setComToLogin, userId, setUserId, selected, setSelected, setUserName, userName}}>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Account" element={<Account/>}/>
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/search/:words" element={<Definitions />} />
                    <Route path="/resquet_new_password/:token" element={<AlterPassWord/>}/>
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App;

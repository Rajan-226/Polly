import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import NavigationBar from "./Components/NavigationBar";
import NotFound from "./Components/NotFound";
import Register from "./Components/Register";
import Poll from "./Components/Poll";
import Create from "./Components/Create";

function App() {
    return (
        <div className="App">
            <NavigationBar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/Register" element={<Register />} />
                <Route exact path="/Create" element={<Create />} />
                <Route exact path="/Poll/:id" element={<Poll />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
/**
 *
 * same options ka case
 *
 * expiresIn ka scene
 *
 * Private routes
 *
 * why do we even need jwt
 *
 *
 *
 *
 *
 *
 *
 *
 */

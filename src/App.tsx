import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Container from "./layout/container";
import Content from "./components/content";
import Home from "./components/home";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Container/>}>
                    <Route index element={<Home />} />
                    <Route path={":hook"} element={<Content />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

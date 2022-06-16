import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App"
import BuildRes from "./BuildRes";

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BuildRes/>}/>
                <Route path="/list" element={<App/>}/>
                <Route path="/list/:type" element={<App/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;

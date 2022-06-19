import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App"
import BuildRes from "./page/BuildRes";

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/list" element={<App/>}/>
                <Route path="/list/:type" element={<App/>}/>
                <Route path="/build/result/:pipeline_build_id" element={<BuildRes/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;

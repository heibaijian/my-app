import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from "./App"
import BuildRes from "./page/BuildRes";
import BuildPage from "./page/Build";
import Login from "./Login";
import Hellow from "./Hellow"

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/test" element={<Hellow/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/list" element={<App/>}/>
                <Route path="/list/:type" element={<App/>}/>
                <Route path="/build/result/:pipeline_build_id" element={<BuildRes/>}/>
                <Route path="/build/config/:pipeline_id" element={<BuildPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;

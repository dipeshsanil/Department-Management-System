import React from 'react';
import {API} from "../backend"
import Base from "./Base"
import '../styles.css';


export default function Home() {
    console.log("API IS", API);
    return (
        <Base title="Home page" description="Welcome to Department Management System">
          <h1 className="text-white">Hello front end</h1>
        </Base>
    )
}
import { useState } from 'react'
import './App.css';
import React from "react";
import FeedbackSystem from "./CodeReviewFeedback";


const title = "Code Review Feedback";

function App() {

  return (
    <>
      <div className="App">
      <FeedbackSystem />
    </div>
    </>
  )
}

export default App

/* eslint-disable max-len */
import React from 'react';

// const { useState } = React;

function Answers({ answers }) {
  // QUICK THOUGHT: RENDER TWO ANSWERS TO START, THEN
  // WHEN DIV IS CLICKED ON SET STATE TO CLICKED AND RENDER ONLY THAT QUESITON
  // AND ALL ANSWERS
  const answerArr = Object.entries(answers)
    .map((item) => ({
      answerer_name: item[1].answerer_name, id: item[1].id, body: item[1].body, helpfulness: item[1].helpfulness,
    }));

  return (
    <div>
      { answerArr.map((item) => (
        <div key={item.id}>
          {console.log(item)}
          <span className="answerer">
            {item.answerer_name}
          &#10;
            <p className="answerBody">
              A:
              &emsp;
              {item.body}
            </p>
            <span className="date" />
            <span className="answer-helpfulness">
              Helpfullness:
              &ensp;
              {item.helpfulness}
            </span>
          </span>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Answers;

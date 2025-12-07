import React, { useState }  from 'react'

const CodeReviewFeedback = () => {
    const [feedback, setFeedback] = useState([
        // feedback buat nyimpen data, setFeedback buat update data
    {
      reviewName: "Readability",
      upvote: 0,
      downvote: 0
    },
    {
      reviewName: "Performance",
      upvote: 0,
      downvote: 0
    },
    {
      reviewName: "Security",
      upvote: 0,
      downvote: 0
    },
    {
      reviewName: "Documentation",
      upvote: 0,
      downvote: 0
    },
    {
      reviewName: "Testing",
      upvote: 0,
      downvote: 0
    }
  ])
  const handler = (index, operatinName) => {
    // fungsi buat ngatur upvote dan downvote
    setFeedback(prev => {
      return (
        prev.map((item, i) => {
          return i === index ? operatinName === "upvote" ? 
          { ...item, upvote: item.upvote + 1 } : 
          { ...item, downvote: item.downvote + 1 } : 
          item;
        })
        // .map buat ngejalanin tiap item di array feedback
        // ...item untuk nyebarin properti item yang lama, terus upvote: item.upvote + 1 buat nambahin upvote nya
      )
    })
  }

  return (
    <div className="my-0 mx-auto text-center w-mx-1200">
        <div className="flex wrap justify-content-center mt-30 gap-30">
            {
                feedback.map(({ reviewName, upvote, downvote }, i) => {
            return (
            <div className="pa-10 w-300 card"  key={i}>
                <h2>{reviewName}</h2>
                <div className="flex my-30 mx-0 justify-content-around">
                    <button className="py-10 px-15" data-testid={"upvote-btn-" + i} onClick={() => handler(i, "upvote")}>
                        👍 Upvote
                    </button>
                    <button className="py-10 px-15 danger" data-testid={"downvote-btn-" + i} onClick={() => handler(i, "downvote")}>
                        👎 Downvote
                    </button>
                </div>
                <p className="my-10 mx-0" data-testid={"upvote-count-" + i}>
                    Upvotes: <strong>{upvote}</strong>
                </p>
                <p className="my-10 mx-0" data-testid={"downvote-count-" + i}>
                    Downvotes: <strong>{downvote}</strong>
                </p>
            </div>
            )
        })
            }
            </div>
        </div>
    );
};

export default CodeReviewFeedback
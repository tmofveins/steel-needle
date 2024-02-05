import React, { useState } from "react";
import GridItem from "./GridItem";

const TestUpdate = () => {
    const [updatedSong, setUpdatedSong] = useState();

    const todaysDate = new Date();
    const formattedDate = todaysDate.toISOString().split('T')[0];
    const id = "1r0001";

    const handleUpdateSong = () => {
        fetch(`http://localhost:3500/songs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: formattedDate,
            })
        })
          .then(res => res.json())
          .then(data => setUpdatedSong(data))
          .catch(err => console.error("Song update test failed:", err));
      }
  
    return (
        <div>
            <button onClick={handleUpdateSong}>
            Update song (check database for results)
            </button>

            <div>
                
            </div>
        </div>
    );
}

export default TestUpdate;
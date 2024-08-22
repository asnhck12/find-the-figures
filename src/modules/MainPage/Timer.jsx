import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Timer ({status}) {
    const { levelId } = useParams();
    const[time, setTime] = useState(0);
    const[playerScores, setPlayerScores] = useState([]);
    const[player,setPlayer] = useState('');

    const navigate = useNavigate();

    const DB_URL = import.meta.env.VITE_DB_URL;

    useEffect(() => {
        const scoreBoard = async () => {
            try {
                const response = await fetch(`${DB_URL}/location/${levelId}/time`);
                const responseData = await response.json();
                setPlayerScores(responseData);
            } catch (error) {
                console.log("error fetching times", error);
            }
        }
    scoreBoard();
    }, [levelId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTime = {
        player: player,
        time: time,
        image: levelId

        }
        try {
            const response = await fetch(`${DB_URL}/location/${levelId}/time/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTime)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit time');
            }

            const result = await response.json();
            console.log('Time submitted successfully:', result);

            // Clear form fields
            setPlayer('');
            setTime('');

            navigate('/');
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    }

    useEffect(() => {
        let interval = null;

        if (status) {
            interval = setInterval(() => {setTime(prevTime => prevTime + 1);}, 10);
        } 
        else {
            console.log("Time paused at: " + time);        
        }

        return () => clearInterval(interval);
    }, [status]);

    const hours = Math.floor(time/ 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);

    return (
        <div className="timerContainer">
            <p className="timer">
                {hours.toString().padStart(2, '0')}:
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
            </p>
            { !status ? (
                    <>
            <div className="scoreBoardContainer">
                <div className="scoreSubmission">
                    <p>Your time is <b>{hours.toString().padStart(2, '0')}:
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')} </b>
                    </p>
                    <form method="post"  onSubmit={handleSubmit}>
                        <div className='newPostForm'>
                            <div className="playerInputContainer">
                                <label htmlFor="player">Name</label>
                                <input className="playerInput" type="text" value={player} onChange={(e) => setPlayer(e.target.value)} required/>
                            </div>
                            <div className="submitPostButton">
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form> 
                </div>
                <div className="scoreBoard">
                    {playerScores.map((score, index) => (
                        <div key={score._id} className="score">
                            <p><b>{index + 1}</b></p>
                            <p><b>{score.player}</b></p>
                            <p>{score.time_formatted.hours}:{score.time_formatted.minutes}:{score.time_formatted.seconds}</p>
                        </div>
                        ))}
                </div>
            </div>
            </> ) : null}
        </div>
    );
}

export default Timer
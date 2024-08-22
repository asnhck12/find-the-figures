// import {useState, useEffect} from "react";
import './HomePage.css';
import { Link } from 'react-router-dom';
import level1thumbnail from '/public/assets/levels/level1/level1.jpg';
import level2thumbnail from '/public/assets/levels/level2/level2.jpg';
import level3thumbnail from '/public/assets/levels/level3/level3.jpg';
import level4thumbnail from '/public/assets/levels/level4/level4.jpg';


function HomePage () {
    return (
    <>
    <div className="mainSection">
    <div className="mainContent">
            <div className='selectLevels'>
                <h1>Please Select a Level</h1>
            </div>
            <div className='levelOptions'>
                <div className='levelOption'>
                    <Link to={`/game/level1`}>
                    <img src={level1thumbnail}/>
                    <p>Level 1</p>
                    </Link>
                </div>
                <div className='levelOption'>
                    <Link to={`/game/level2`}>
                    <img src={level2thumbnail}/>
                    <p>Level 2</p>
                    </Link>
                </div>
                <div className='levelOption'>
                    <Link to={`/game/level3`}>
                    <img src={level3thumbnail}/>
                    <p>Level 3</p>
                    </Link>
                </div>
                <div className='levelOption'>
                    <Link to={`/game/level4`}>
                    <img src={level4thumbnail}/>
                    <p>Level 4</p>
                    </Link>
                </div>
            </div>
        </div>
    </div>

    </>
    )
}

export default HomePage
import { useState } from 'react';
import {useParams} from 'react-router-dom';
import './MainPage.css';
const level = "/src/assets/levels";

function HomePage () {
    const [imgHeight, setImgHeight] = useState(0);
    const [imgWidth, setImgWidth] = useState(0);
    const [clickX, setClickX] = useState(0);
    const [clickY, setClickY] = useState(0);
    const [menuPopup, setMenuPopup] = useState(false);
    const { levelId } = useParams();

    const searchPointer = (el) => {
        if (!el) {
            console.log("No image");
        } else {

        const boundClient = el.target.getBoundingClientRect();
        const x = el.clientX + window.scrollX;
        const y = el.clientY + window.scrollY;    
        setImgWidth(boundClient.width);
        setImgHeight(boundClient.height);
        
        const xPointer = x - 8;
        const yPointer = y - 8;

        setClickX(xPointer);
        setClickY(yPointer);


        setMenuPopup(true);


        console.log(`Size: Height ${imgHeight} Width ${imgWidth} Co Ords: X: ${clickX} Y: ${clickY}`);
        console.log("level ID" + levelId);

        }
    }

    return (
    <>
    <div className="mainSection">
    <div className="homePageTitle">
        <h2>Find the figures!</h2>
    </div>
        <div className="mainContent">
            <div className='figures'>
                <div className='figure'>
                <img src={level + `/${levelId}/figures/1.jpg`}/>
                {/* description */}
                </div>
                <div className='figure'>
                <img src={level + `/${levelId}/figures/2.jpg`}/>
                {/* description */}
                </div>
                <div className='figure'>
                <img src={level + `/${levelId}/figures/3.jpg`}/>
                {/* description */}
                </div>
            </div>
            <div className='mainImg'>
                <img src={level + `/${levelId}/${levelId}.jpg`} onClick={(e) => searchPointer(e)}/>
                { menuPopup ? (
                    <>
                    <div className='dropDownSelect' style={{ left: `${clickX}px`, top: `${clickY}px`}}>
                    <div  className='imagePointer'>
                        {/* <img src=''/> */}
                    </div>
                    <div className='dropDown' onClick={(e) => e.stopPropagation()}>
                        <ul>
                            <li>A</li>
                            <li>B</li>
                            <li>C</li>
                            <li onClick={() => setMenuPopup(false)}>Close</li>
                        </ul>
                    </div>
                    </div>
                    </> ) : null}
            </div>
        </div>
    </div>
    </>
    )
}

export default HomePage
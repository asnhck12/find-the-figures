// import {useState, useEffect} from "react";
import { useState } from 'react';
import './MainPage.css';
// import { Link } from 'react-router-dom';
import icon from "/src/assets/github_icon.svg";

function HomePage () {
    const [imgHeight, setImgHeight] = useState(0);
    const [imgWidth, setImgWidth] = useState(0);
    const [clickX, setClickX] = useState(0);
    const [clickY, setClickY] = useState(0);
    const [menuPopup, setMenuPopup] = useState(false);

    // const [img, setImg] = useState()
    
    // const loadImg = (img) => {
    //     setImg(img);
    // }

    const imgSize = (el) => {
        if (!el) {
            console.log("No image");
        } else {

        const boundClient = el.target.getBoundingClientRect();
        // const x = el.clientX - boundClient.left + window.scrollX;
        // const y = el.clientY - boundClient.top + window.scrollY;
        const x = el.clientX + window.scrollX;
        const y = el.clientY + window.scrollY;    
        setImgWidth(boundClient.width);
        setImgHeight(boundClient.height);
        
        const xPointer = x - 8;
        const yPointer = y - 8;

        setClickX(xPointer);
        setClickY(yPointer);


        setMenuPopup(true);
        // coOrdinateclicks(x, y)


        console.log(`Size: Height ${imgHeight} Width ${imgWidth} Co Ords: X: ${clickX} Y: ${clickY}`);

        }
    }
    
    // const coOrdinateclicks = (posX, posY) => {
    //     setMenuPopup(true);
    //     const dropDown = document.getElementById("dropDownSelect");
    //     console.log("x: " + posX + " y: " + posY)
    //     Object.assign(dropDown.style, {
    //         left: `${posX}px`,
    //         top: `${posY}px`,
    //         // display: 'block',
    //     })
    // }
    

    return (
    <>
    <div className="mainSection">
    <div className="homePageTitle">
        <h1>Image</h1>
    </div>
        <div className="mainContent">
            <div className='mainImg' onClick={(e) => imgSize(e)}>
                <img src={icon}/>
                { menuPopup ? (
                    <>
                    <div className='dropDownSelect' style={{ left: `${clickX}px`, top: `${clickY}px`}}>
                    <div  className='imagePointer'>
                        {/* <img src=''/> */}
                    </div>
                    <div className='dropDown'>
                        <ul>
                            <li>A</li>
                            <li>B</li>
                            <li>C</li>
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
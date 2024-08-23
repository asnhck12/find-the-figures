import { useEffect, useState, useRef, useCallback } from 'react';
import {Link, useParams} from 'react-router-dom';
import './MainPage.css';
import LevelLoading from './LevelLoading';
import Timer from './Timer';
const level = "/assets/levels";

function HomePage () {
    const [imgHeight, setImgHeight] = useState(0);
    const [imgWidth, setImgWidth] = useState(0);
    const [clickX, setClickX] = useState(0);
    const [clickY, setClickY] = useState(0);
    const [menuPopup, setMenuPopup] = useState(false);
    const { levelId } = useParams();
    const [levelLoad, setLevelLoad] = useState([]);
    const [f1X, setF1X] = useState(0);
    const [f1Y, setF1Y] = useState(0);
    const [f2X, setF2X] = useState(0);
    const [f2Y, setF2Y] = useState(0);
    const [f3X, setF3X] = useState(0);
    const [f3Y, setF3Y] = useState(0);
    const mainImage = useRef(null);
    const [currentFigure, setCurrentFigure] = useState("");
    const [foundCount, setFoundCount] = useState(0);
    const [foundFigures, setFoundFigures] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [styles, setStyles] = useState({});
    const [status, setStatus] = useState(true);


    useEffect (() => {
        if (foundFigures.length === 3) {
            setCompleted(true);
        }
    }, [foundFigures]);

    useEffect(() => {
        if(completed) {
            setStatus(false);
        }
        else {
            console.log("Time continue")
        }
    }, [completed])

    useEffect(() => {
        if (!menuPopup) {
            setCurrentFigure("");
        }
    }, [menuPopup])

    useEffect(() => {
        const fetchLevelData = async () => {
            const data = await LevelLoading(levelId);
            setLevelLoad(data);            
        }
        fetchLevelData();
    }, [levelId]);

    useEffect(() => {
        if (levelLoad.length === 0) return;
        const boundClient = mainImage.current.getBoundingClientRect();
        updateFigurePositions(boundClient);   
    }, [levelLoad]);
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateFigurePositions = useCallback(
        (boundClient) => {
            if (levelLoad.length < 3) return;
    
            const yDecoder = (y) => y * imgHeight / 100;
            const xDecoder = (x) => x * imgWidth / 100;    
    
            const f1XValue = xDecoder(levelLoad[0].locationx);
            const f1YValue = yDecoder(levelLoad[0].locationy);
            const f2XValue = xDecoder(levelLoad[1].locationx);
            const f2YValue = yDecoder(levelLoad[1].locationy);
            const f3XValue = xDecoder(levelLoad[2].locationx);
            const f3YValue = yDecoder(levelLoad[2].locationy);
            const leftClient = boundClient.left;
            const topClient = boundClient.top;
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
    
            setF1X(f1XValue + leftClient + scrollX);
            setF1Y(f1YValue + topClient + scrollY);
            setF2X(f2XValue + leftClient + scrollX);
            setF2Y(f2YValue + topClient + scrollY);
            setF3X(f3XValue + leftClient + scrollX);
            setF3Y(f3YValue + topClient + scrollY);

    }, [imgHeight, imgWidth, levelLoad])

    const collectValues = useCallback(
        () => {
        if (mainImage.current) {
            const boundClient = mainImage.current.getBoundingClientRect();
            setImgWidth(boundClient.width);
            setImgHeight(boundClient.height);
            setMenuPopup(false);
            updateFigurePositions(boundClient);
        }
    } , [updateFigurePositions]);

    const figureSelect = (menuOption) => {
        if (menuOption === currentFigure) {
            if (!foundFigures.includes(menuOption)) {
                setFoundCount(foundCount+1);
                setFoundFigures([...foundFigures, currentFigure]);
                const styleUpdate = {};
                styleUpdate[menuOption] = { border: "3px green solid"};
                setStyles(prevStyles => ({ ...prevStyles, ...styleUpdate}))                            
            }
            else {
                console.log("Already selected");
            }
        }
        else {
            console.log("doesnt match");
        }
        setMenuPopup(false);
    }

    useEffect(() => {
        const handleResize = () => {
            collectValues();
        };
        window.addEventListener('resize', handleResize);
        collectValues();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [collectValues]);

    const searchPointer = (el) => {
        if (!el) {
            console.log("No image");
        } else {
        const x = el.clientX + window.scrollX;
        const y = el.clientY + window.scrollY;    
        const xPointer = x - 8;
        const yPointer = y - 8;
        setClickX(xPointer);
        setClickY(yPointer);
        setMenuPopup(true);

        }
    }

    const handleImageLoad = () => {
        collectValues();
    };

    return (
    <>
    <div className="mainSection">
    <div className="homePageTitle">
        <h2>Find the figures!</h2>
        <div className='timer'>
            <Timer status={status}/>
        </div>
    </div>
        <div className="mainContent">
            <div className='figures'>
                <div className='figure' style={styles.figure1}>
                <img src={level + `/${levelId}/figures/1.jpg`}/>
                {levelLoad[0]?.description}
                </div>
                <div className='figure' style={styles.figure2}>
                <img src={level + `/${levelId}/figures/2.jpg`}/>
                {levelLoad[1]?.description}
                </div>
                <div className='figure' style={styles.figure3}>
                <img src={level + `/${levelId}/figures/3.jpg`}/>
                {levelLoad[2]?.description}
                </div>
            </div>
            <div className='mainImg' onClick={(e) => searchPointer(e)} >
                <img src={level + `/${levelId}/${levelId}.jpg`}  ref={mainImage} onLoad={handleImageLoad}/>
                    { menuPopup ? (
                    <>
                    <div className='dropDownSelect' style={{ left: `${clickX}px`, top: `${clickY}px`}}>
                    <div  className='imagePointer'>
                    </div>
                    <div className='dropDown' onClick={(e) => e.stopPropagation()}>
                        <ul>
                            <Link onClick={() => {figureSelect("figure1")}}><li className={levelLoad[0]?.character}>{levelLoad[0]?.description}</li></Link>
                            <Link onClick={() => {figureSelect("figure2")}}><li className={levelLoad[1]?.character}>{levelLoad[1]?.description}</li></Link>
                            <Link onClick={() => {figureSelect("figure3")}}><li className={levelLoad[2]?.character}>{levelLoad[2]?.description}</li></Link>
                            <Link onClick={() => setMenuPopup(false)}><li className='closeOption'>Close</li></Link>
                        </ul>
                    </div>
                    </div>
                    </> ) : null}
                    <div className='figureLocations'>
                        <div className={"figureLocation"}  style={{ ...styles.figure1, left: `${f1X}px`, top: `${f1Y}px`}} onClick={() => (setCurrentFigure("figure1"))}>
                        </div>
                        <div className={"figureLocation"}  style={{ ...styles.figure2, left: `${f2X}px`, top: `${f2Y}px`}} onClick={() => (setCurrentFigure("figure2"))}>
                        </div>
                        <div className={"figureLocation"}  style={{ ...styles.figure3, left: `${f3X}px`, top: `${f3Y}px`}} onClick={() => (setCurrentFigure("figure3"))}>
                        </div>

                    </div>
                    
            </div>
        </div>
    </div>
    </>
    )
}

export default HomePage
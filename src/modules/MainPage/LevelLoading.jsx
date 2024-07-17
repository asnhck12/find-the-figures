function LevelLoading (level) {
    
    const currentLevel = async () => {
        try {
            const response = await fetch(`http://localhost:3000/location/${level}`);
            const responseData = await response.json();
            console.log("Fetched locations:", responseData);
            return responseData;
        } catch (error) {
            console.log("error fetching locations", error);
        }
    }

    return currentLevel();
}

export default LevelLoading
const DB_URL = import.meta.env.VITE_DB_URL;

function LevelLoading (level) {
    
    const currentLevel = async () => {
        try {
            const response = await fetch(`${DB_URL}/location/${level}`);
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log("error fetching locations", error);
        }
    }

    return currentLevel();
}

export default LevelLoading
import axios from 'axios';
// import config from "./config.json"


const baseUrl = `https://65846b674d1ee97c6bcfb65f.mockapi.io/TravelPackages`;

// Gets all travel packages from the API
const getTravelPackageAPI = () => {
    const request = axios.get(`${baseUrl}/TravelPackages`);   
    console.log("RetrieveTravelPackages", request)
    return request.then(response => {
        console.log("RetrieveTravelPackages", response.data);
        return response.data;
    }).catch(error => {
        console.error("Error retrieving travel packages:", error);
        throw error;
    });
}

// Deletes a travel package from the API based on id passed
const deleteTravelPackageAPI = (id) => {
    const request = axios.delete(`${baseUrl}/TravelPackages/${id}`);
    return request.then(response => {
        console.log("DeletedTravelPackage", response.data);
        return response.data;
    }).catch(error => {
        console.error("Error deleting travel package:", error);
        throw error;
    });
}

// Adds a travel package into the API
const addTravelPackageAPI = (travelPackage) => {
    const request = axios.post(`${baseUrl}/TravelPackages`, travelPackage);
    return request.then(response => {
        console.log("AddTravelPackages", response.data);
        return response.data;
    }).catch(error => {
        console.error("Error posting travel packages:", error);
        throw error;
    });
}


export default { getTravelPackageAPI, deleteTravelPackageAPI, addTravelPackageAPI };
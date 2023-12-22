import axios from 'axios';
// import config from "./config.json"


const baseUrl = `https://65846b674d1ee97c6bcfb65f.mockapi.io/TravelPackages`;

// Gets all travel packages from the API
const getTravelPackageAPI = () => {
    const request = axios.get(`${baseUrl}/TravelPackages`);   
    
    return request.then(response => response.data)
}

// Deletes a travel package from the API based on id passed
const deleteTravelPackageAPI = (id) => {
    const request = axios.delete(`${baseUrl}/TravelPackages/${id}`);
    return request.then(response => response.data)
}

// Adds a travel package into the API
const addTravelPackageAPI = (travelPackage) => {
    const request = axios.post(`${baseUrl}/TravelPackages`, travelPackage);
    return request.then(response => response.data);
}


export default { getTravelPackageAPI, deleteTravelPackageAPI, addTravelPackageAPI };
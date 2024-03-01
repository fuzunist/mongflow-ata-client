import {
  getDistrictsOfEachCity,
  getDistrictsAndNeighbourhoodsOfEachCity,
  getCityNames,
  getCities,
  getDistrictsAndNeighbourhoodsByCityCode
} from "turkey-neighbourhoods";

export const getCityOptions2 = () => {
    const cities = getCityNames();
    const neighbourhoods = {};
    
    cities.forEach(cityName => {
      const districtsAndNeighbourhoods = getDistrictsAndNeighbourhoodsOfEachCity(cityName);
      neighbourhoods[cityName] = Object.keys(districtsAndNeighbourhoods).map(districtName => {
        const neighbourhoodsArray = districtsAndNeighbourhoods[districtName];
        return {
          value: districtName,
          label: districtName,
          children: Array.isArray(neighbourhoodsArray)
            ? neighbourhoodsArray.map(neighbourhood => ({
                value: neighbourhood,
                label: neighbourhood
              }))
            : [] // If neighbourhoodsArray is not an array, return an empty array
        };
      });
    });
  
    return neighbourhoods;
  };

  export const getCityOptions = () => {
    const cities = getCities();
    const neighbourhoods = [];
  
    cities.forEach(city => {
      const districts = getDistrictsAndNeighbourhoodsByCityCode(city.code);
      const cityObject = {
        value: city.name,
        label: city.name,
        children: []
      };
  
      Object.entries(districts).map(([key, value]) => {
        cityObject.children.push({
          value: key,
          label: key
        });
      });
  
      neighbourhoods.push(cityObject);
    });
  
    return neighbourhoods;
  };
  
  

  
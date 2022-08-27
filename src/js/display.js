import { apiController, unitConversion } from "./weather";

const displayController = (() => {
    

    const updateData = async () => {
        const data = await apiController.getWeatherData();
        updateHeader(data);
        updateBody(data);
        updateFooter(data);
    };

    const updateHeader = (data) => {
        
        let city = document.querySelector(".city");
        let desc = document.querySelector(".weatherDesc");

        city.innerHTML = data.locationName;
        desc.innerHTML = data.weatherDesc;

    };

    const updateBody = (data) => {
        let temp = document.querySelector(".temp");
        let feelsLike = document.querySelector(".feelsLike");
        let high = document.querySelector(".high");
        let low = document.querySelector(".low");
        let humidity = document.querySelector(".humidity");


        temp.innerHTML = data.temp;
        high.innerHTML = data.tempHigh;
        low.innerHTML = data.tempLow;
        humidity.innerHTML = data.humidity;
        //remove if theyre the same
        feelsLike.innerHTML = data.feelsLike;
    };

    const updateFooter = (data) => {
        let clouds = document.querySelector(".clouds");
        let vis = document.querySelector(".vis");
        let wind = document.querySelector(".wind");

        clouds.innerHTML = data.clouds;
        vis.innerHTML = data.visibility;
        wind.innerHTML = data.windSpeed;
    };


    
    
    return {
        updateData
    }
})();

const eventController = (() => {

    

})();

export {displayController}
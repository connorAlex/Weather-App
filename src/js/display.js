import { apiController, unitConversion } from "./weather";

const displayController = (() => {
    
    //let unit = (apiController.getMeasurement() === "metric")? "C": "F";
    let unit = "F";

    const updateData = async () => {
        let data = await apiController.getWeatherData();
        if (unit === "F"){
            data = convertDegreeUnit(data);
        };
        
        updateHeader(data);
        updateBody(data);
        updateFooter(data);
    };

    const convertDegreeUnit = (data) => {

        const temps = [
            "temp",
            "feelsLike",
            "tempHigh",
            "tempLow"
        ];

        temps.forEach((e) => {
            data[e] = unitConversion.cToF(data[e]);
        });
        
        return data;
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


        temp.innerHTML = data.temp + " " + unit;
        high.innerHTML = "H: " + data.tempHigh + unit;
        low.innerHTML = "L: " + data.tempLow;
        humidity.innerHTML = "humidity: " + data.humidity + "%";
        //remove if theyre the same
        feelsLike.innerHTML = "feels like: " + data.feelsLike;
    };

    const updateFooter = (data) => {
        let clouds = document.querySelector(".clouds");
        let vis = document.querySelector(".vis");
        let wind = document.querySelector(".wind");

        clouds.innerHTML = "clouds" + data.clouds + "%";
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
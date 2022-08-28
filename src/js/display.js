import { apiController, unitConversion } from "./weather";

const displayController = (() => {
    
    let unit = (apiController.getMeasurement() === "metric")? "ºC": "ºF";
    let speed = (unit === "ºC") ? "mps" : "mph";

    const updateData = async (city) => {
        let data = await apiController.getWeatherData(city);
        if (unit === "ºF"){
            data = convertDegreeUnit(data);
        };
        
        updateHeader(data);
        updateBody(data);
        updateFooter(data);
    };

    const updateUnit = () => {
        unit = (apiController.getMeasurement() === "metric")? "ºC": "ºF";
        speed = (unit === "ºC") ? "mps" : "mph";
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

        data.windSpeed = unitConversion.mpsToMph(data.windSpeed);
        
        return data;
    };

    const returnLocationInput = () => {
        const location = document.querySelector("input");
        return location;
    }

    const updateHeader = (data) => {
        
        let city = document.querySelector(".city");
        let desc = document.querySelector(".weatherDesc");

        city.value = data.locationName;
        desc.innerHTML = data.weatherDesc;

    };

    const updateBody = (data) => {
        let temp = document.querySelector(".temp");
        let feelsLike = document.querySelector(".feelsLike");
        let high = document.querySelector(".high");
        let low = document.querySelector(".low");
        let humidity = document.querySelector(".humidity");
        let btn = document.querySelector(".degree");
        if (btn != null) {
            btn.remove();
        }

        temp.innerHTML = data.temp + " ";
        temp.parentNode.insertBefore(createDegreeBtn(unit),temp.nextSibling);
        high.innerHTML = "H" + data.tempHigh + "º";
        low.innerHTML = "L" + data.tempLow + "º";
        humidity.innerHTML = "humidity: " + data.humidity + "%";
        //remove if theyre the same
        feelsLike.innerHTML = "feels like: " + data.feelsLike + "º";
    };

    const updateFooter = (data) => {
        let clouds = document.querySelector(".clouds");
        let vis = document.querySelector(".vis");
        let wind = document.querySelector(".wind");

        clouds.innerHTML = "clouds: " + data.clouds + "%";
        vis.innerHTML = "visibility: " + (data.visibility / 10000) * 100 + "%";
        wind.innerHTML = "windspeed: " + data.windSpeed + " " + speed;
    };

    const createDegreeBtn = (text) => {
        const btn = document.createElement("div");
        btn.classList.add("degree");
        btn.style.cursor = "pointer";
        btn.innerHTML = text;

        eventController.addBtnListener(btn);

        return btn;
    };

    const getBtn = () => document.querySelector(".degree");
    
    
    return {
        updateData,
        returnLocationInput,
        getBtn,
        updateUnit
    }
})();

const eventController = (() => {
    const input = displayController.returnLocationInput();
    
    

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            displayController.updateData(input.value);
        }
    });

    const addBtnListener = (element) => {
        
        element.addEventListener("click",(e)=> {
            
            apiController.toggleMeasurement();
            displayController.updateUnit()
            displayController.updateData(input.value)
        });
    };
   
    return {addBtnListener};

})();

export {displayController}
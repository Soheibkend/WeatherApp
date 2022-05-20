const container = document.querySelector(".container"),
sectionInput = document.querySelector(".input"),
infoTxt = document.querySelector(".info-txt"),
inputField = document.querySelector("input"),
locationButton = document.querySelector("button");


const arrowBack = document.querySelector(".container header i");

arrowBack.addEventListener("click", ()=>{
    document.querySelector(".container").classList.remove("active");
});


let api;

locationButton.addEventListener("click", ()=> {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSucces,onError);
    } else {
        alert("your browser doesnt support geolocation");
    }
});

function onSucces (positon) {
    const {latitude, longtitude} = positon.coords;
    api = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longtitude+'&appid=66668db41e707bc0617c7edd02cef3ed';
    fetchData();

}

function onError (error) {
    document.querySelector(".info-txt").innerHTML = error.message;
    document.querySelector(".info-txt").classList.add("error");   
}


function fetchData () {
    document.querySelector(".info-txt").innerHTML = 'Getting Weather details....';
   
    //infoTxt.innerHTML("Getting Weather details .....");
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

inputField.addEventListener("keyup", e=>{
    //if enter button is pressed and inputField is not empty then
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});


function requestApi (cityName) {
    api = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=66668db41e707bc0617c7edd02cef3ed";
    fetchData();
}

function weatherDetails (info) {
    document.querySelector(".info-txt").classList.replace("pending","error");
    if (info.cod == "404") {
        document.querySelector(".info-txt").innerHTML = inputField.value+" is not a valid city name";
    } else {
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humididty, temp} = info.main;


        if (id == 800) {
            document.querySelector(".Weather img").src = "icons/clear.svg";
        } else if (id >= 200 && id<= 232) {
            document.querySelector(".Weather img").src = "icons/storm.svg";

        } else if (id >= 600 && id <= 622) {
            document.querySelector(".Weather img").src = "icons/snow.svg";

        } else if (id >= 701 && id <= 781) {
            document.querySelector(".Weather img").src = "icons/haze.svg";

        } else if (id >=801 && id<=804) {
            document.querySelector(".Weather img").src = "icons/cloud.svg";

        } else if ((id>=300 && id<=321) || (id >=500 && id<= 531)) {
            document.querySelector(".Weather img").src = "icons/rain.svg";

        }

        document.querySelector("input").value = "";
        document.querySelector(".temp .number").innerHTML = Math.floor(temp);
        document.querySelector(".weather").innerHTML = description;
        document.querySelector(".location span").innerHTML = city+", "+country;
        document.querySelector(".temp .number-2").innerHTML = Math.floor(feels_like);
        document.querySelector(".humidity span").innerHTML = humididty+"%";
        document.querySelector(".info-txt").classList.remove("pending","error");
        document.querySelector(".container").classList.add("active");
    }
    console.log(info);
}

AOS.init();   // starting animation 


const apiKey = "d693f079f33e713716fdc8de71f63891";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";   // api link (half)
                                                                                    //it will complete at time of featching    
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".wind");
const humidity =document.querySelector(".humidity");
let card = document.querySelector(".card");
let weatherIcon = document.querySelector(".weather-icon");              // changing color,link with const is not suitable
let weatherIcon1 = document.querySelector(".weather-icon1");
let weatherInfo = document.querySelector(".weather-info");

const cheackWeather = async(cityname) =>{
        let responce = await fetch(apiUrl + cityname + `&appid=${apiKey}`);    //fetching json info from link

        if(responce.status == 400){                                             //types of error 
            document.querySelector(".error").innerText = "No city given";       //400 - when we not fill info in (inputBox)
            document.querySelector(".error").style.display = "block";          
            weatherIcon.src = "";
            temp.innerHTML = "0" + "°C";
            wind.innerHTML = "0" + " km/h";                                      //setting data 0 when problem
            document.querySelector(".city").innerHTML = "city" ;
            humidity.innerHTML = "0" + "%";  
        }else if(responce.status == 404){                                        //404 - file not found 
            document.querySelector(".error").innerText = "Invalid city name";
            document.querySelector(".error").style.display = "block"; 
            weatherIcon.src = "";
            
            temp.innerHTML = "0" + "°C";                                         //setting data 0 when problem
            wind.innerHTML = "0" + " km/h";
            document.querySelector(".city").innerHTML = "city" ;
            humidity.innerHTML = "0" + "%";
        }
        else{

            document.querySelector(".error").style.display = "none";    //we have responce in the form json 
                                                                        //by using json() method we get js formate(nedded info)
        let data = await responce.json();                               //it is important

        let windSpeedData = data.wind.speed ;
        let tempData = data.main.temp;                                  //assining the data in veriables
        let humidityData = data.main.humidity;
        let weatherData = data.weather[0].main;

            temp.innerHTML = tempData + "°C";
            wind.innerHTML = windSpeedData + " km/h";
            document.querySelector(".city").innerHTML = data.name ;     // assining data in html elements
            humidity.innerHTML = humidityData + "%";

        // console.log(weatherData);

        let weatherInfoChange = () =>{
            weatherInfo.innerHTML = weatherData;            //function to add weather name in the html elment
        } 
   
        if(weatherData == "Clear"){
            weatherIcon.src = "images/clear.png";           
            weatherInfoChange()                             //assining images path in the src of img according to weather
           
        }
        else if(weatherData == "Clouds"){
            weatherIcon.src = "images/clouds.png";
            weatherInfoChange()

        }
        else if(weatherData == "Drizzle"){
                weatherIcon.src = "images/drizzle.png";
                weatherInfoChange()
        }
        else if(weatherData == "Mist"){
            weatherIcon.src = "images/mist.png";
            weatherInfoChange()
        }
        else if(weatherData == "Rain"){
            weatherIcon.src = "images/rain.png";
            weatherInfoChange()
        }
        else if(weatherData == "Snow"){
            weatherIcon.src = "images/snow.png";
            weatherInfoChange()
        }
        else if(weatherData == "Haze"){
            weatherIcon.src = "images/haze.png";
            weatherInfoChange()
        }


        }

        
}

searchBtn.addEventListener("click", () =>{                     //calling whole function on clicking search button
    cheackWeather(searchBox.value);                            //giving the city name to function which find data           
                                                               // from the the link of wether API                                                             //    
})                                                             //and perform oparations
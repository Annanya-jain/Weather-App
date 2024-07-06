let showlocation=document.getElementById("location");
let showtemp=document.getElementById("temp");
let showdate=document.getElementById("date");
let showhumidity=document.getElementById("humidity");
let showwind=document.getElementById("wind");
let showsun=document.getElementById("desc");
let icon=document.getElementsByClassName("icn")[0];
let searchButton = document.getElementById("submit-btn");
let searchInput = document.getElementById("name");

let fetchloca= async ()=>{
    navigator.geolocation.getCurrentPosition(//doesnt return promise so we dont use .then.catch
    (coordinate)=>{
    let lat= coordinate.coords.latitude;
    let long=coordinate.coords.longitude;
    console.log(coordinate);
    currentloc(lat,long);},
    (e)=>{
        console.log(e);
    });
}

let currentloc=async(lat,long)=>{
    try{let res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=58c6006b510a8febb835e50d261be55b`)
        let data= await res.json();
        enterdata(data);
        setimg(data);
        
    }
    catch(e){showlocation.innerText="Allow Current Location Please";

    }

}
let enterloc=async(name)=>{
    try{let res=await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=58c6006b510a8febb835e50d261be55b`)
        let data=await res.json();
        enterdata(data);
        setimg(data);
    }
    catch(e){
        showlocation.innerText="Enter correct Location"
    }
}

let enterdata=(data)=>{
    showlocation.innerText = data.name;
    showtemp.innerHTML = `${Math.floor(data.main.temp-273)}°C`;
    showdate.innerHTML = `${new Date().toLocaleDateString()}`;
    showhumidity.innerHTML = `Humidity:<br> <br>  ${data.main.humidity}%`;
    showwind.innerHTML = `Wind:<br><br> ${data.wind.speed} m/s`;
    showsun.innerHTML = `Description:<br><br>${data.weather[0].description}`;
}
function setimg(data){
    const now = new Date();
    const currentHour= now.getHours();
    if(["few clouds", "scattered clouds", "broken clouds"].includes( data.weather[0].description.toLowerCase()))
    {
        if (currentHour >= 6 && currentHour < 18) {
            icon.src="animated/cloudy-day.svg";
          } else {
            icon.src="animated/cloudy-night.svg";
          }
    }
   
    else if( ["shower rain", "rain", "light rain", "moderate rain", "heavy intensity rain", "very heavy rain", "extreme rain", "freezing rain", "light intensity shower rain", "heavy intensity shower rain", "ragged shower rain", "drizzle"].includes( data.weather[0].description.toLowerCase()))
    {  
            icon.src="animated/rainy.svg";
    }
   else if(["snow", "light snow", "heavy snow", "sleet", "light shower sleet", "shower sleet", "light rain and snow", "rain and snow", "light shower snow", "shower snow", "heavy shower snow"].includes( data.weather[0].description.toLowerCase()))
    {  
            icon.src="animated/snowy.svg";
    }
   else if(["thunderstorm", "squall", "tornado"].includes( data.weather[0].description.toLowerCase()))
    {  
            icon.src="animated/thunder.svg";
    }
    else{
        if (currentHour >= 6 && currentHour < 18) {
            icon.src="animated/day.svg";
          } else {
            icon.src="animated/night.svg";
          }
    }

}
searchButton.addEventListener("click", () => {
    let locationName = searchInput.value;
    if (locationName) {
        enterloc(locationName);
    }
});

fetchloca();


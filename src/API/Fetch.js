const URL = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

const Fetch = async (city) => {

  let queryParameters = `q=${city}&units='metric'&APPID=${API_KEY}`

  const data = await fetch(`${URL}?${queryParameters}`).then((res) => {

    return res.json();

  }).catch((err) => {

    console.log('some err happend in fetch ;');

    let offlineWeather = localStorage.getItem('city');
    return JSON.parse(offlineWeather)

  })

  return data;

}

export default Fetch
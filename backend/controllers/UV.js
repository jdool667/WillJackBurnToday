const axios = require("axios");

exports.getUV = async (req, res) => {
  try {
    const { lat, long } = req.body;

    const key = process.env.API_KEY;

    const { data } = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${key}`
    );

    const { data: addy } = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${key}`
    );

    const cityName = addy[0].name; // Extract the city name from addy

    const uv = data.current.uvi;
    return res.status(200).json({ uv, cityName }); // Include only the cityName in the response
  } catch (err) {
    console.log(err);
  }
};

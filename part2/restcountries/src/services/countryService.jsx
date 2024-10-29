import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export default {
  getAllCountries,
};

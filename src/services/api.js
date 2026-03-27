import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export const fetchDummyJobs = async () => {
  const res = await axios.get(`${BASE_URL}/products?limit=20`);
  return res.data.products;
};

export const getCompanyLogoUrl = (domain) =>
  `https://logo.clearbit.com/${domain}`;

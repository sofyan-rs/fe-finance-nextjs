import axios from "axios";
import { apiURL } from "@/config/base-url";

// Fetch API using Axios
const ApiClient = axios.create({
  baseURL: apiURL,
  // timeout: 10000,
  // timeoutErrorMessage: 'Please check your internet connection',
});

export default ApiClient;

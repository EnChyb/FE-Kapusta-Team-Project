import axios from "axios";
import API_URL from "../config/apiConfig";

export const changeBalanceApi = async (data) => {
	const response = await axios.patch(`${API_URL}/user/balance`, data);
	return response.data;
};

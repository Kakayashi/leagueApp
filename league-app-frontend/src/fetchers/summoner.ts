import axios from "axios";

export const fetchSummoner = async (summoneName: any, region: any) => {
	const response = await axios
		.get(`http://localhost:4000/getSummoner/${summoneName}/${region}`)
		.catch((error) => {
			return error;
		});

	if (response.data.name === "AxiosError") {
		throw 400;
	} else {
		console.log("responseSum", response);
		return response.data;
	}
};

export const fetchMaestry = async (
	summoneName: any,
	region: any,
	count: number
) => {
	console.log("fetchMaestry");

	const response = await axios
		.get(
			`http://localhost:4000/getSummonerMastery/${summoneName}/${region}/${count}`
		)
		.catch((error) => {
			return error;
		});

	if (response.data.name === "AxiosError") {
		throw 400;
	} else {
		console.log("responseMaes", response.data);
		return response.data;
	}
};

export const fetchHistory = async (
	summoneName: any,
	region: any,
	count: number
) => {
	console.log("fetchHistory");

	const response = await axios
		.get(`http://localhost:4000/getHistory/${summoneName}/${region}/${count}`)
		.catch((error) => {
			return error;
		});

	if (response.data.name === "AxiosError") {
		throw 400;
	} else {
		console.log("responseMaes", response.data);
		return response.data;
	}
};

export const fetchGame = async (gameId: any, region: any) => {
	console.log("fetchGame");
	const response = await axios
		.get(`http://localhost:4000/getGame/${gameId}/${region}`)
		.catch((error) => {
			return error;
		});

	if (response.data.name === "AxiosError") {
		throw 400;
	} else {
		console.log("responseGame", response.data);
		return response.data;
	}
};

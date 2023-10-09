import axios from "axios";

export const fetchChampions = async () => {
	console.log("fetchChampions");
	const version = await axios.get(
		"https://ddragon.leagueoflegends.com/api/versions.json"
	);
	const lastVersion = version.data[0];

	const response = await axios.get(
		`http://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/en_US/champion.json`
	);

	console.log("Response Data:", response.data);

	return response.data;
};

export const fetchChampion = async (name: string) => {
	console.log("fetchChampion1");
	const version = await axios.get(
		"https://ddragon.leagueoflegends.com/api/versions.json"
	);
	const lastVersion = version.data[0];

	const response = await axios.get(
		`http://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/en_US/champion/${name}.json`
	);

	return response.data.data[name];
};

export const fetchLastVersion = async () => {
	const version = await axios.get(
		"https://ddragon.leagueoflegends.com/api/versions.json"
	);
	const lastVersion = version.data[0];
	return lastVersion;
};

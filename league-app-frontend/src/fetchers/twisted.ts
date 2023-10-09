import { LolApi, Constants } from "twisted";

const api = new LolApi({
	rateLimitRetry: true,
	key: "RGAPI-b4beb94f-1cfa-4345-8e11-71365d59a01b",
});

export async function summonerByNameExample() {
	return await api.Summoner.getByName(
		"Silny Karolek",
		Constants.Regions.EU_WEST
	);
}

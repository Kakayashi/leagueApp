export function formatString(inputString: string, desiredLength: number) {
	// Sprawdź, czy długość stringa jest większa lub równa pożądanej długości
	if (inputString.length >= desiredLength) {
		return inputString; // Zwróć niezmieniony string
	} else {
		// Oblicz liczbę zer, które trzeba dodać do początku
		const numberOfZerosToAdd = desiredLength - inputString.length;
		const zeros = "0".repeat(numberOfZerosToAdd);
		return zeros + inputString; // Dodaj zera na początek
	}
}

export function getWindowSize() {
	const { innerWidth, innerHeight } = window;
	return { innerWidth, innerHeight };
}

export function addSpacesEveryNChars(inputNumber: number, n: number): string {
	const numString = inputNumber.toString(); // Konwertuj liczbę na string
	let result = "";
	let charCount = 0;

	for (let i = numString.length - 1; i >= 0; i--) {
		if (charCount > 0 && charCount % n === 0) {
			result = " " + result; // Dodaj spację co n znaków z prawej strony
		}
		result = numString.charAt(i) + result;
		charCount++;
	}

	return result;
}

export function convertMillisecondsToMinutesSeconds(milliseconds: number) {
	// Konwertuj milisekundy na sekundy
	const seconds = Math.floor(milliseconds);

	// Oblicz minuty i sekundy
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	console.log("minutes", minutes);

	// Formatuj wynik
	const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
	const formattedSeconds =
		remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

	return `${formattedMinutes}:${formattedSeconds}`;
}

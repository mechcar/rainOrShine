// Stretch goals for portfolio week
// Add 3 day weather info from weather API
// Add sports page with Route/Link using weather API sports JSON option

import "../../src/styles/_styles.scss"
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import MainWeatherCard from "./MainWeatherCard";
import RandomWeatherCard from "./RandomWeatherCard";
import randomCities from "../randomCities";
import Form from "./Form";

function App() {
	// useState to track keystrokes
	const [userInput, setUserInput] = useState("");
	// useState to track location searched in text input
	const [searchCity, setSearchCity] = useState("Toronto");
	// useState to track when submit is hit, to repopulate the random weather cards
	const [submitStatus, setSubmitStatus] = useState(false);
	// useState to track the JSON object returned from the main search axios call
	const [weatherData, setWeatherData] = useState([]);
	// useState to track the JSON objects returned from the random weather cards
	const [randomWeatherData, setRandomWeatherData] = useState([]);

	// creates an array of 5 cities randomly selected from the imported array randomCities, which includes the 30 most populous cities in the world
	const selectRandomCities = () => {
		let randomlySelectedCities = [];
		let duplicateCityCheck = [...randomCities];

		while (randomlySelectedCities.length < 5) {
			let randomCity =
				duplicateCityCheck[
					Math.floor(Math.random() * duplicateCityCheck.length)
				];
			randomlySelectedCities.push(randomCity);
			duplicateCityCheck.splice(
				duplicateCityCheck.indexOf(randomCity),
				1
			);
		}
		return randomlySelectedCities;
	};

	// Handles input from keyboard into text search
	const handleChange = (e) => {
		setUserInput(e.target.value);
	};

	// handles the submission of the form and handles the error thrown by an empty search query
	const handleSubmit = (e) => {
		e.preventDefault();
		if (userInput === "") {
			setSubmitStatus(false);
			Swal.fire({
				title: "Error!",
				text: "Please enter a location!",
				icon: "error",
				confirmButtonText: "OK",
				confirmButtonColor: "#002442",
			});
		} else {
			setSearchCity(userInput);
			setSubmitStatus(true);
		}
	};

	// Axios call for main weather card
	useEffect(() => {
		// creating an empty array to store an individual weather object
		const weatherObjectArray = [];
		const apiKey = "9f1f728baaff4fa5a3714622212207";
		const targetCity = searchCity;
		axios({
			url: `https://api.weatherapi.com/v1/forecast.json`,
			params: {
				key: apiKey,
				q: targetCity,
				days: 3,
			},
		})
			// pushing the weather data from the JSON object to the created array, setting weatherData to that array so that it can be mapped on display in component
			.then((res) => {
				weatherObjectArray.push(res.data);
				setWeatherData(weatherObjectArray);
				setUserInput("");
			})
			// error handling for locations that don't return any data, including gibberish queries
			.catch(() => {
				setUserInput("");
				setSearchCity("Toronto");
				setSubmitStatus(false);
				Swal.fire({
					title: "Error!",
					text: "Unable to find that location. Please try again!",
					icon: "error",
					confirmButtonText: "OK",
					confirmButtonColor: "#002442",
				});
			});
		// useEffect dependent on a new searchCity being registered in handleSubmit
	}, [searchCity]);

	// Axios call for random weather cards
	useEffect(() => {
		setSubmitStatus(false);
		// creating an empty array to store random weather objects
		let randomWeatherObjectArray = [];
		const apiKey = "9f1f728baaff4fa5a3714622212207";
		let randomlySelectedCities = selectRandomCities();

		randomlySelectedCities.map(async (city) => {
			const res = await axios({
				url: `https://api.weatherapi.com/v1/current.json`,
				params: {
					key: apiKey,
					q: city,
				},
			});
			// pushing the random weather data from the JSON object to the created array, setting randomWeatherData to that array so that it can be mapped on display in component
			randomWeatherObjectArray.push(res.data);
			// checking that arrays are equal length before rendering, to avoid error of displaying fewer cards than intended
			if (
				randomWeatherObjectArray.length ===
				randomlySelectedCities.length
			) {
				setRandomWeatherData(randomWeatherObjectArray);
			}
		});
		// useEffect is dependent on submitStatus being set to true
	}, [submitStatus]);

	return (
		<div className="App">
			<header>
				<div className="wrapper">
					<h1>Rain or Shine?</h1>
					<p>
						Enter the name of a city, a postal code or a zip code to
						see whether you should venture out your front door:
					</p>
				</div>
			</header>
			<main>
				<Form
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					userInput={userInput}
				/>
				<section className="results">
					<h2 className="subHeading">Outside your door...</h2>
					<div className="wrapper cardContainer">
						{weatherData.map((i) => {
							return (
								<MainWeatherCard
									currentConditions={i.current}
									location={i.location}
									forecast = {i.forecast}
									key={i.location}
								/>
							);
						})}
					</div>
				</section>
				<section className="randomResults">
					<h2 className="subHeading">Elsewhere in the world...</h2>
					<div className="wrapper randomCardContainer">
						{randomWeatherData.map((i, index) => {
							return (
								<RandomWeatherCard
									currentConditions={i.current}
									location={i.location}
									key={`${i.location.name}${index}`}
								/>
							);
						})}
					</div>
				</section>
			</main>
			<footer>
				<div className="footerContent">
					<p>
						Created at{" "}
						<a href="https://junocollege.com/">
							Juno College of Technology
						</a>
					</p>
					<p>
						Powered by{" "}
						<a href="https://www.weatherapi.com/">Weather API</a>
					</p>
				</div>
			</footer>
		</div>
	);
}

export default App;

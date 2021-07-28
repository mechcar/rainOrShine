import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MainWeatherCard from "./MainWeatherCard";
import RandomWeatherCard from "./RandomWeatherCard";

function App() {
	const [userInput, setUserInput] = useState("");
	const [searchCity, setSearchCity] = useState("Toronto");
	const [submitStatus, setSubmitStatus] = useState(false);
	const [weatherData, setWeatherData] = useState([]);
	const [randomWeatherData, setRandomWeatherData] = useState([]);

	const selectRandomCities = () => {
		const randomCities = [
			"Tokyo",
			"Delhi",
			"Shanghai",
			"Sao Paulo",
			"Mexico City",
			"Cairo",
			"Mumbai",
			"Beijing",
			"Dhaka",
			"Osaka-Shi",
			"New York",
			"Karachi",
			"Buenos Aires",
			"Chongqing",
			"Istanbul",
			"Kolkata",
			"Manila",
			"Lagos",
			"Rio de Janeiro",
			"Tianjin",
			"Kinshasa",
			"Guangzhou",
			"Los Angeles",
			"Moscow",
			"Shenzhen",
			"Lahore",
			"Bangalore",
			"Paris",
			"Bogota",
			"Jakarta",
		];

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

	const handleChange = (e) => {
		setUserInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearchCity(userInput);
		setSubmitStatus(true);
	};

	// Axios call for main weather card
	useEffect(() => {
		const weatherObjectArray = [];
		const apiKey = "9f1f728baaff4fa5a3714622212207";
		const targetCity = searchCity;
		axios({
			url: `https://api.weatherapi.com/v1/current.json`,
			params: {
				key: apiKey,
				q: targetCity,
			},
		}).then((res) => {
			weatherObjectArray.push(res.data);
			setWeatherData(weatherObjectArray);
			setUserInput("");
		});
	}, [searchCity]);

	// Axios call for random weather cards
	useEffect(() => {
		setSubmitStatus(false);
		let randomWeatherObjectArray = [];
		const apiKey = "9f1f728baaff4fa5a3714622212207";
		let randomlySelectedCities = selectRandomCities();

		randomlySelectedCities.map((city) => {
			return axios({
				url: `https://api.weatherapi.com/v1/current.json`,
				params: {
					key: apiKey,
					q: city,
				},
			}).then((res) => {
				randomWeatherObjectArray.push(res.data);
				setRandomWeatherData(randomWeatherObjectArray);
			});
		});
	}, [submitStatus]);

	return (
		<div className="App">
			<header>
				<div className="wrapper">
					<h1>Rain or Shine?</h1>
					<p>
						Enter the name of a city to return some weather data and
						see whether you should venture out your front door:
					</p>
				</div>
			</header>
			<main>
				<section className="search">
					<div className="wrapper">
						<label htmlFor="weatherSearch"></label>
						<form action="submit" onSubmit={handleSubmit}>
							<input
								type="text"
								id="cityName"
								onChange={handleChange}
								value={userInput}
								autoComplete="off"
								placeholder="Search for a city..."
							/>
							<button type="submit">Search</button>
						</form>
					</div>
				</section>
				<section className="results">
					<h2 className="subHeading">Outside your door...</h2>
					<div className="wrapper cardContainer">
						{weatherData.map((i) => {
							return (
								<MainWeatherCard
									currentConditions={i.current}
									location={i.location}
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
				Created at <a href="https://junocollege.com/">Juno College</a>
			</footer>
		</div>
	);
}

export default App;

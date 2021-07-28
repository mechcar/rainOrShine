function MainWeatherCard(props) {
	return (
		<div className="weatherCard">
			<div className="cardHeader">
				<h2>
					{props.location.name}, {props.location.country}
				</h2>
				<img
					src={props.currentConditions.condition.icon}
					alt={props.currentConditions.condition.text}
				/>
			</div>
			<div className="wrapper data">
				<div className="leftColumn">
					<p>Local Time: {props.location.localtime.slice(10)}</p>
					<p>{props.currentConditions.feelslike_c}°C</p>
					<p>{props.currentConditions.condition.text}</p>
				</div>
				<div className="rightColumn">
					<p>Humidity: {props.currentConditions.humidity}%</p>
					<p>Wind Speed: {props.currentConditions.wind_kph} km/h</p>
					<p>Wind Direction: {props.currentConditions.wind_dir}</p>
				</div>
			</div>
		</div>
	);
}

export default MainWeatherCard;

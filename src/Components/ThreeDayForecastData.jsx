const ThreeDayForecastData = (props) => {
	console.log(props);
	return (
		<div className="threeDayCard">
			<h2>{props.date}</h2>
			<img src={props.icon} alt="a" />
			<p>PoP: {props.pop}%</p>
			<p>Humidity: {props.humidity}%</p>
			<p>Avg: {props.avgTemp}°C</p>
			<p>Max: {props.maxTemp}°C</p>
			<p>Min: {props.minTemp}°C</p>
		</div>
	);
};
export default ThreeDayForecastData;

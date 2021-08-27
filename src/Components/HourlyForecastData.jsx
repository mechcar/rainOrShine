const HourlyForecastData = (props) => {
	return (
		<div className="hourlyCard">
			<div className="hourlyData">
				<h2>{props.time.slice(10)}</h2>
				<p>{props.temp}°C</p>
				<p>PoP: {props.pop}%</p>
			</div>
				<img src={props.icon} alt="a" />
		</div>
	);
};
export default HourlyForecastData;

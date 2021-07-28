function RandomWeatherCard(props){
    return (
		<div className="randomWeatherCard">
			<div className="cardHeader">
				<h2>
					{props.location.name}, {props.location.country}
				</h2>
			</div>
			<div className="wrapper randomData">
				<img
					src={props.currentConditions.condition.icon}
					alt={props.currentConditions.condition.text}
				/>
					<p>Local Time: {props.location.localtime.slice(10)}</p>
					<p>{props.currentConditions.feelslike_c}°C</p>
					<p>{props.currentConditions.condition.text}</p>
			</div>
		</div>
	)
}

export default RandomWeatherCard;
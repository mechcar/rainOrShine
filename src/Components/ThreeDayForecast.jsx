import { useState } from "react";
import Modal from "react-modal";
import ThreeDayForecastData from "./ThreeDayForecastData";

Modal.setAppElement("#root");

const ThreeDayForecast = (props) => {
	const [modalOpenStatus, setModalOpenStatus] = useState(false);

	const openModal = (e) => {
		e.preventDefault();
		setModalOpenStatus(true);
	};

	const closeModal = () => {
		setModalOpenStatus(false);
	};

	const handleEscKey = (e) => {
		
			setModalOpenStatus(false);
		
	};

	const days = props.forecast;
	return (
		<div className="threeDayForecast">
			<button className="openModal" onClick={openModal}>
				3 Day Forecast
			</button>
			<Modal
				isOpen={modalOpenStatus}
				className={"threeDayModal"}
				onEscapeKeyDown={() => handleEscKey}
			>
				<h1>Next 3 Days:</h1>
				<div className="threeDayForecastContainer wrapper">
					{days.map((i) => {
						return (
							<ThreeDayForecastData
								date={i.date}
								icon={i.day.condition.icon}
								maxTemp={i.day.maxtemp_c}
								avgTemp={i.day.avgtemp_c}
								minTemp={i.day.mintemp_c}
								humidity={i.day.avghumidity}
								pop={i.day.daily_chance_of_rain}
								key={i.date_epoch}
							/>
						);
					})}
				</div>

				<button className="closeModal" onClick={closeModal}>
					X
				</button>
			</Modal>
		</div>
	);
};
export default ThreeDayForecast;

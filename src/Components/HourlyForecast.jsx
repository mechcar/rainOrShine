import { useState } from "react";
import Modal from "react-modal";
import HourlyForecastData from "./HourlyForecastData";

Modal.setAppElement("#root");

const HourlyForecast = (props) => {
	const [modalOpenStatus, setModalOpenStatus] = useState(false);

	const openModal = (e) => {
		e.preventDefault();
		setModalOpenStatus(true);
	};

	const closeModal = () => {
		setModalOpenStatus(false);
	};

	const hours = props.forecast.hour;
	return (
		<div className="hourlyForecast">
			<button className="openModal" onClick={openModal}>
				Hourly Forecast
			</button>
			<Modal isOpen={modalOpenStatus} className={"hourlyModal"}>
				<h1>Today's weather</h1>
				<div className="hourlyForecastContainer wrapper">
					{hours.map((i) => {
						return (
							<HourlyForecastData
								time={i.time}
								icon={i.condition.icon}
								temp={i.feelslike_c}
								pop={i.chance_of_rain}
								key={i.time_epoch}
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
export default HourlyForecast;

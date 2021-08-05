const Form = (props) => {
	return (
		<section className="search">
			<div className="wrapper">
				<label htmlFor="weatherSearch"></label>
				<form
					action="submit"
					id="weatherSearch"
					onSubmit={props.handleSubmit}
				>
					<input
						type="text"
						id="weatherSearch"
						onChange={props.handleChange}
						value={props.userInput}
						autoComplete="off"
						placeholder="Search here..."
					/>
					<button type="submit" id="weatherSearch">
						Search
					</button>
				</form>
			</div>
		</section>
	);
};
export default Form;

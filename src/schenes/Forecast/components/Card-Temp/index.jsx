import React from 'react';
import style from './style.module.scss';

const Forecast = (props) => {
		const { list } = props;
		
		const getDayInfo = data => {
			const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			return daysOfWeek[new Date(data.dt * 1000).getDay()];
		};

		const getDateInfo = data => {
			var d = new Date(new Date(data.dt * 1000)),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

				if (month.length < 2) 
						month = '0' + month;
				if (day.length < 2) 
						day = '0' + day;

    	return [year, month, day].join('-')
		}

		// Fetches the icon using the icon code available in the forecast data.
		const getIcon = data => {
			return `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
		}

		const forecastTiles = list && list.length > 5 ? list.slice(0, 5) : list;

    return (
			<React.Fragment>
				<div className={style.container}>
					{ forecastTiles !== undefined && forecastTiles.length > 1 ? forecastTiles.map((item, i) => (
						<div
							className={style.wrapper}
							key={i}
						>
							<div className={style.primaryInfo}>
								<div className="icon">
									<img src={getIcon(item)} className={style.icon} alt="" />
									<div>{item.weather[0].main} ({item.weather[0].description})</div>
									<div className={style.date}>
										{getDayInfo(item)}
										<br />
										{getDateInfo(item)} 
									</div>
								</div>
								<div className="weather-info">
									<div className="min-max">
										Temp. today: <strong>{item.temp.day}°C</strong>
									</div>
									<div className="more-info">
										{`Avg. Humidity: ${item.humidity}%`}
									</div>
									<div>
										{`Avg. Min-Max: ${Math.round(item.temp.max-item.temp.min)}°C`}
									</div>
								</div>
							</div>
						</div>
					)) : <div>Loading....</div>}
				</div>
			</React.Fragment>
    )
}

export default Forecast

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchForecast } from '../../actions/weather';
import Forecast from './components/Card-Temp';
import SelectCity from './components/Select-City';
import style from './style.module.scss';

const Weather = () => {
	const card = useSelector(state => state.weather);
	const [city, setcity] = useState('Jakarta')
	const dispatch = useDispatch();
	const { item } = card;
	const { daily } = item;

	useEffect(() => {
		const defaultCity = { lat: -6.200000, long: 106.816666 } //Jakarta
		dispatch(fetchForecast(defaultCity));
	}, [])

	const onchange = (data) => {
		setcity(data.label)
		setTimeout(() => {
			dispatch(fetchForecast(data.value))
		}, 1000);
	}

	const forecastTiles = daily && daily.length > 5 ? daily.slice(0, 5) : daily;

	const findAverageAge = (forecastTiles) => {
		const { length } = forecastTiles;
		return forecastTiles.reduce((acc, val) => {
			return Math.ceil(acc + (val.temp.day/length));
		}, 0);
	};

	const findAverage = (forecastTiles) => {
		const { length } = forecastTiles;
		return forecastTiles.reduce((acc, val) => {
			return Math.ceil(acc + (Math.round(val.temp.max-val.temp.min)/length));
		}, 0);
	};

	return (
		<div id="container" className={style.container}>
			<div className={style.select}>
				<SelectCity onchange={(e) => {onchange(e)}} />
			</div>
			<div className={style.row}>
				<Forecast list={item.daily} />
			</div>
			<div className={style.rowAvg}>
				<div className={style.wrapperAvg}>
					<h2>{city}</h2>
					Avg. temperature 5 daily: { daily ? findAverageAge(forecastTiles) : ''}°C
					<br />
					Avg. difference in temperature 5 daily: { daily ? findAverage(forecastTiles) : ''}°C
				</div>
			</div>
		</div>
	)

}

export default Weather;

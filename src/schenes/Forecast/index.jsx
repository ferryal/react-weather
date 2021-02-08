import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchForecast } from '../../actions/weather';
import Forecast from './components/Card-Temp';
import SelectCity from './components/Select-City';
import style from './style.module.scss';

const Weather = () => {
	const card = useSelector(state => state.weather);
	console.log(card)
	const dispatch = useDispatch();
	const { item } = card;
	const { daily } = item;

	useEffect(() => {
		dispatch(fetchForecast('Jakarta'));
	}, [dispatch])

	const forecastTiles = daily && daily.length > 5 ? daily.slice(0, 5) : daily;

	const findAverageAge = (forecastTiles) => {
		const { length } = forecastTiles;
		return forecastTiles.reduce((acc, val) => {
			return acc + (val.temp.day/length);
		}, 0);
	};

	const findAverage = (forecastTiles) => {
		const { length } = forecastTiles;
		return forecastTiles.reduce((acc, val) => {
			return acc + (Math.round(val.temp.max-val.temp.min)/length);
		}, 0);
	};


	return (
		<div id="container" className={style.container}>
			<div className={style.select}>
				<SelectCity />
			</div>
			<div className={style.row}>
				<Forecast list={item.daily} />
			</div>
			<div className={style.rowAvg}>
				<div className={style.wrapperAvg}>
					Avg. temperature 5 daily: { daily ? findAverageAge(forecastTiles) : ''}°C
					<br />
					Avg. difference in temperature 5 daily: { daily ? findAverage(forecastTiles) : ''}°C
				</div>
			</div>
		</div>
	)

}

export default Weather;

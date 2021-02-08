import React, { useState } from 'react'
import Select from 'react-select'
import style from './style.module.scss'

const SelectCity = (props) => {
    const [selected, setselected] = useState(null);

    const options = [
        { value: {lat: -6.200000, long: 106.816666}, label: 'Jakarta' },
        { value: {lat: -8.650000, long: 115.216667}, label: 'Bali' },
        { value: {lat: -7.797068, long: 110.370529}, label: 'Yogyakarta' },
        { value: {lat: -7.250445, long: 112.768845}, label: 'Surabaya' },
        { value: {lat: -6.914864, long: 107.608238}, label: 'Bandung' },
        { value: {lat: -6.966667, long: 110.416664}, label: 'Semarang' },
        { value: {lat: 33.441792, long: -94.037689}, label: 'London' },
        { value: {lat: 1.290270, long: 103.851959}, label: 'Singapore' },
        { value: {lat: 13.736717, long: 100.523186}, label: 'Bangkok' },
        { value: {lat: 39, long: 55}, label: 'China' },
    ]

    const handleChange = selected => {
        setselected(selected)
        props.onchange(selected);
    };


    return (
        <div className={style.wrapper}>
            <Select
                value={selected}
                onChange={handleChange}
                options={options}
            />
        </div>
    )
}

export default SelectCity;
import React from 'react';
import styles from './selectInput.module.scss';

type Region = {
    name: string;
    code: string;
}

type SelectInputProps = {
    data: Array<Region | string>;
    setVal: (value: string) => void;
    isRole?: boolean;
    isSmall?: boolean;
};

function SelectInput(props: SelectInputProps) {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.setVal(e.target.value);
    };

    return (
        <select className={props.isSmall ? `${styles.regionSelect} ${styles.regionSelect__small}` : styles.regionSelect} onChange={handleSelectChange} name="cars" id="cars">
            {props.data.map((el, index) => (
                <option key={index} value={typeof el === 'string' ? el : el.code}>
                    {typeof el === 'string' ? el : el.name}
                </option>
            ))}
        </select>
    );
}

export default SelectInput;

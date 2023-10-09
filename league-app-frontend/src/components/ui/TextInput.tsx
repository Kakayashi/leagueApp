import React from 'react';
import styles from './texInput.module.scss';

type TextInputProps = {
  val: string;
  setVal: (value: string) => void;
  isSmall?: boolean;
  placeholder?: string;
};

function TextInput(props: TextInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setVal(e.target.value);
  };

  return <input placeholder={props.placeholder ? props.placeholder :'Summoner Name...'} className={ props.isSmall ? `${styles.inputSummonersName} ${styles.inputSummonersName__small}` : `${styles.inputSummonersName}` } type="text" value={props.val} onChange={handleInputChange} />;
}

export default TextInput;
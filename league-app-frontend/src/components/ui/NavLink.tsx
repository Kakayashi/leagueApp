import React from 'react'
import { Link } from "react-router-dom";
import styles from './navLink.module.scss';

type NavLinkProps = {
    text:string;
    path:string;
}

function NavLink(props:NavLinkProps) {
  return (
    <Link className={styles.navLink} to={props.path}>{props.text}</Link>
  )
}

export default NavLink
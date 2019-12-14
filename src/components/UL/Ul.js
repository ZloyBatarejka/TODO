import React, { Component } from "react";
import classes from "./ul.module.css"
import { Li } from "../Li/Li"
export class Ul extends Component {

    renderItem = () => {

        return this.props.list.map((item, id) => {
            return (
                <Li item={item} key={id + Math.random()} />
            )
        })
    }
    render() {
        return (
            <ul className={classes.ul}>
                {this.renderItem()}
            </ul>
        )
    }
}

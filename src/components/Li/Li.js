import React, { Component } from "react";
import classes from "./Li.module.css";
import { Button } from "../Button/Button";
import axios from "axios";
export class Li extends Component {
  state = {
    value: this.props.item[1].value,
    url: this.props.item[0],
    input: false,
    title: true,
    show: true,
    done: false
  };

  changeHandler = () => {
    this.state.done
      ? console.log("Its done")
      : this.setState({
          input: true,
          title: false
        });
  };
  deleteHandler = async () => {
    await axios.delete(
      `https://todo-eb35e.firebaseio.com/list/${this.state.url}.json`
    );
    this.setState({
      show: false
    });
  };
  saveHandler = event => [
    this.setState({
      input: false,
      title: true
    })
  ];
  changeStateHandler = async event => {
    this.setState({
      value: event.target.value
    });
    await axios.patch(
      `https://todo-eb35e.firebaseio.com/list/${this.state.url}.json`,
      { value: event.target.value }
    );
  };
  doneHandler = () => {
    this.setState({
      done: this.state.done ? false : true
    });
  };
  render() {
    const toDo = [classes.toDo, this.state.done ? classes.opacity : null];
    const inputStatus = [
      classes.textfield,
      this.state.input ? classes.show : classes.hide
    ];
    const valueStatus = [
      classes.title,
      this.state.title ? classes.show : classes.hide
    ];
    return (
      <>
        {this.state.show ? (
          <li className={toDo.join(" ")}>
            {this.state.title ? (
              <input
                className={classes.checkbox}
                type="checkbox"
                onInput={this.doneHandler}
              />
            ) : null}
            <label className={valueStatus.join(" ")}> {this.state.value}</label>
            <input
              className={inputStatus.join(" ")}
              type="text"
              value={this.state.value}
              onChange={this.changeStateHandler}
            />
            {this.state.title ? (
              <Button
                props={{
                  text: "fas fa-pencil-alt",
                  onClick: this.changeHandler
                }}
              />
            ) : (
              <Button
                props={{ text: "fas fa-save-alt", onClick: this.saveHandler }}
              />
            )}

            <Button
              props={{ text: "fas fa-trash-alt", onClick: this.deleteHandler }}
            />
          </li>
        ) : null}
      </>
    );
  }
}

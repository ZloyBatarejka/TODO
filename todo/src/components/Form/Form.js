import React, { Component } from "react";
import classes from "./Form.module.css"
import { Ul } from "../UL/Ul"
import { Button } from "../Button/Button"
import { Header } from "../Header/Header"
import axios from "axios";
import Loader from "../Loading/Loading"
export class Form extends Component {
    addHandler = () => {
        console.log("added")
    }
    state = {
        serverList: "",
        inputValue: "",
        id: 0,
        loading: true,
        list: [

        ]
    }
    async getList() {
        try {
            const response = await axios.get('https://todo-eb35e.firebaseio.com/list.json')
            const responseList = Array.from(Object.entries(response.data))
            this.setState({
                list: responseList,
                loading: false
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    async componentDidMount() {
        this.getList()
    }
    submitHandler = event => {
        event.preventDefault()
    }

    changeHandler = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }
    addHandler = async () => {
        try {
            await axios.post("https://todo-eb35e.firebaseio.com/list.json", { value: this.state.inputValue })
            this.setState({
                inputValue: ""
            })
            this.getList()
        } catch (e) {
            console.log(e)
        }

    }

    render() {
        return (
            <>
                {this.state.loading
                    ? <Loader />
                    : <div onSubmit={this.submitHandler} className={classes.app}>

                        <Header />
                        <Ul list={this.state.list} />

                        <div className={classes.todoForm}>
                            <input type="text" className={classes.input} onChange={this.changeHandler} value={this.state.inputValue} />
                            <Button props={{ text: "Добавить", onClick: this.addHandler }} />
                        </div>
                    </div>
                }

            </>
        )
    }
}

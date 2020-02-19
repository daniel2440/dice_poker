import React from "react";
import styles from './dice.module.css'


class Dice extends React.Component {
    state = {
        value: this.props.val,
        active: this.props.act,
        k: this.props.id
    };

    componentDidUpdate(prevProps) {
        if (prevProps.val !== this.props.val) {
            this.setState({value: this.props.val});
        }
        if (prevProps.act !== this.props.act) {
            this.setState({active: this.props.act});
        }

    }

    // changeDice=()=>{
    //   let stan=!this.state.active;
    //   this.setState({active:stan});
    // };


    handleActive = () => {
        let result = [this.state.k, this.state.active];
        this.props.onActiveChange(result);
    };

    handleActiveChange = () => {
        let actState = !this.state.active;
        this.setState({active: actState}, this.handleActive)
    };


    render() {
        return (
            <div className={this.state.active ? styles.DiceChange : styles.Dice} onClick={this.handleActiveChange}>
                <img src={require(`../../../assets/images/dices_images/dice_${this.state.value}.jpg`)} alt={`dice`}/>
            </div>
        )
    }
}

export default Dice;

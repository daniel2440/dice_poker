import React from "react";
import styles from './modal.module.css'
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Backdrop from '../backdrop/backdrop'


class Modal extends React.Component{
    state={
        newGame:this.props.newGam,
        winner: this.props.winner
    };
    handleNewGameChange=()=>{
        let ng=!this.state.newGame;
        this.setState({newGame:ng},this.handleNewGame)
    };

    handleNewGame=()=>{
        this.props.onNewGameChange(this.state.newGame);
    };

    componentDidUpdate(prevProps,prevState) {
        if (prevProps.winner !== this.props.winner) {
            this.setState({winner: this.props.winner});
        }
        if (prevState.winner!==this.state.winner){
            this.setState({winner:this.props.winner})
        }
    }

    render() {
        return(
            <Auxiliary>
                <div className={styles.Modal}

                     style={{
                         transform:this.props.show?'translateY(0)':'translateY(-100vh)',
                         opactity: this.props.show?'1':'0'
                     }}>
                    {this.props.children}
                    <p>The winner is <strong> Player {this.state.winner+1}</strong> with <strong>{this.props.pointsWin} points</strong></p>
                    <button onClick={this.handleNewGameChange}>Nowa gra</button>
                </div>
                <Backdrop show={this.props.show}/>
            </Auxiliary>
        )
    }
}
export default Modal;
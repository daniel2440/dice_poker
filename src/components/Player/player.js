import React from "react";
import Dices from "../dices/dices";
import styles from './player.module.css'
class Player extends React.Component{

    state={
        over:this.props.ove,
        points:this.props.points
    };
    handleOver=()=>{
        this.props.onOverChange(this.state.over)
    };

    handleOverChange=p=>{
        this.setState({over:p},this.handleOver)

    };
    componentDidUpdate(prevProps) {
        if (prevProps.ove !== this.props.ove) {
            this.setState({over: this.props.ove});
        }
    }

    handlePoints=()=>{
        this.props.onPointsChange([this.state.points,this.props.num])
    };

    handlePointsChange=p=>{
        this.setState({points:p},this.handlePoints)
    };
    render() {
        return(
            <div className={styles.Player}>
            <p className={styles.pla}>Player {this.props.num+1}</p>
                <Dices
                    onOverChange={this.handleOverChange}
                    ov={this.state.over}
                    ng={this.props.ng}
                    points={this.state.points}
                    onPointsChange={this.handlePointsChange}
                />

            </div>

        )
    }
}

export default Player;
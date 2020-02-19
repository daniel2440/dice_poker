import React from "react";
import Dice from "./dice/dice";
import styles from './dices.module.css'

class Dices extends React.Component {
    state = {
        diceArray: ['0', '0', '0', '0', '0'],
        figure: 'None',
        points: this.props.points,
        active: [false, false, false, false, false],
        firstMove: true,
        secondMove: false,
        over:this.props.ov
    };

    componentDidUpdate(prevProps) {
        if (prevProps.ov !== this.props.ov) {
            this.setState({over: this.props.ov});
        }
        if (prevProps.ng !== this.props.ng) {
            let da=['0', '0', '0', '0', '0'];
            let a=[false, false, false, false, false];
            this.setState({active:a});
            this.setState({figure: 'None'});
            this.setState({diceArray:da});
            this.handlePointsChange(0)
            this.setState({firstMove:true});
            this.setState({secondMove:false});


        }

    }

    handlePoints=()=>{
        this.props.onPointsChange(this.state.points)
    };

    handlePointsChange=p=>{
        this.setState({points:p},this.handlePoints)
    };
    changeActiveDice = (pro) => {
        let activeCopy = this.state.active;
        activeCopy[pro[0]] = pro[1];
        this.setState({active: activeCopy});
    };

    handleDiceChange = () => {
        const diceCop = ['1', '1', '1', '1', '1'];
        for (let i = 0; i < diceCop.length; i++) {
            diceCop[i] = Math.floor(Math.random() * 6 + 1).toString();
        }
        this.setState({diceArray: diceCop}, this.figureSearch);
        this.setState({firstMove: false});
        this.setState({secondMove: true});
    };
    handleDiceChangeDouble = () => {
        const diceCop = this.state.diceArray;
        for (let i = 0; i < diceCop.length; i++) {
            if (this.state.active[i]) {
                diceCop[i] = Math.floor(Math.random() * 6 + 1).toString();
            }
        }
        this.setState({diceArray: diceCop}, this.figureSearch);
        this.setState({secondMove: false});
        let a=[false, false, false, false, false];
        this.setState({active:a});
        this.handleOverChange();

    };

    handleOver=()=>{
        this.props.onOverChange(this.state.over)
    };

    handleOverChange=()=>{
        let o=this.state.over+1;
        this.setState({over:o},this.handleOver)

    };


    //counting values apperance
    figureSearch = () => {
        const mapOfVal = new Map();
        mapOfVal.set('1', 0);
        mapOfVal.set('2', 0);
        mapOfVal.set('3', 0);
        mapOfVal.set('4', 0);
        mapOfVal.set('5', 0);
        mapOfVal.set('6', 0);
        let pairs = 0;
        let pairVal = [];
        let threes = 0;
        let threesVal = 0;
        let fours = 0;
        let fourVal = 0;
        let fives = 0;
        let fiveVal = 0;
        for (let i = 0; i < this.state.diceArray.length; i++) {
            mapOfVal.set(this.state.diceArray[i], mapOfVal.get(this.state.diceArray[i]) + 1)
        }
        for (let [k, v] of mapOfVal) {
            if (v === 2) {
                pairs += 1;
                pairVal.push(k)
            }
            if (v === 3) {
                threes += 1;
                threesVal = k;
            }
            if (v === 4) {
                fours += 1;
                fourVal = k;
            }
            if (v === 5) {
                fives += 1;
                fiveVal = k;
            }
        }
        //sum of dices +30
        if (fives) {
            this.setState({figure: `Five of a kind (${fiveVal})`});
            //this.setState({points: fiveVal * 5 + 30});
            this.handlePointsChange(fiveVal * 5 + 30);
            return;
        }
        //sum of dices +20
        if (fours === 1) {
            this.setState({figure: `Four of a kind (${fourVal})`});
            //this.setState({points: fourVal * 4 + 20});
            this.handlePointsChange(fourVal * 4 + 20);
            return;
        }
        //sum of dices +10
        if (pairs === 1 && threes === 1) {
            this.setState({figure: `Full House (${pairVal[0]},${threesVal})`});
            //this.setState({points: pairVal * 2 + threesVal * 3 + 10});
            this.handlePointsChange(pairVal * 2 + threesVal * 3 + 10);
            return;
        }


        //sum of every dice in pair
        if (pairs === 2) {
            this.setState({figure: `Two pairs (${pairVal[0]},${pairVal[1]})`});
            //this.setState({points: pairVal[0] * 2 + pairVal[1] * 2});
            this.handlePointsChange(pairVal[0] * 2 + pairVal[1] * 2);
            return;
        }

        //sum of three dices
        if (threes === 1) {
            this.setState({figure: `Three of a kind (${threesVal})`});
            //this.setState({points: threesVal * 3});
            this.handlePointsChange(threesVal * 3);
            return;
        }

        //sum of dices
        if (pairs === 1) {
            this.setState({figure: `One Pair (${pairVal[0]})`});
            //this.setState({points: pairVal[0] * 2});
            this.handlePointsChange(pairVal[0] * 2);
            return;
        }


        //big strit (2,3,4,5,6) 20 pkt
        if (mapOfVal.get('1') === 0) {
            this.setState({figure: `Big Strit`});
            //this.setState({points: 20});
            this.handlePointsChange(20);
            return;
        }

        //small strit (1,2,3,4,5) 15pkt
        if (mapOfVal.get('6') === 0) {
            this.setState({figure: `Small Strit`});
            //this.setState({points: 15});
            this.handlePointsChange(15);
            return;
        }
        this.setState({figure: 'None'});
        //this.setState({points: 0})
        this.handlePointsChange(0);

    };


    render() {
        return (
            <div>

                <div className={styles.Dices}>
                    <div className={styles.Info}>
                        <p>Hand: {this.state.figure}</p>
                        <p>Points: <strong>{this.state.points}</strong></p>
                    </div>
                    <div className={styles.RealDices}>
                        <Dice
                            val={this.state.diceArray[0]}
                            id={0}
                            onActiveChange={this.changeActiveDice}
                            act={this.state.active[0]}
                        />
                        <Dice
                            val={this.state.diceArray[1]}
                            id={1}
                            onActiveChange={this.changeActiveDice}
                            act={this.state.active[1]}
                        />
                        <Dice
                            val={this.state.diceArray[2]}
                            id={2}
                            onActiveChange={this.changeActiveDice}
                            act={this.state.active[2]}
                        />
                        <Dice
                            val={this.state.diceArray[3]}
                            id={3}
                            onActiveChange={this.changeActiveDice}
                            act={this.state.active[3]}
                        />
                        <Dice
                            val={this.state.diceArray[4]}
                            id={4}
                            onActiveChange={this.changeActiveDice}
                            act={this.state.active[4]}
                        />
                    </div>



                    <div className={this.state.firstMove ? styles.ActiveBtn : styles.NonActiveBtn}>
                        <button className={styles.Fm} onClick={this.state.firstMove ? this.handleDiceChange : console.log()}>First Move
                        </button>
                    </div>
                    <div className={this.state.secondMove ? styles.ActiveBtn : styles.NonActiveBtn}>
                        <button className={styles.Sm} onClick={this.state.secondMove ? this.handleDiceChangeDouble : console.log()}>Second
                            Move
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dices;
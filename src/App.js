import React from 'react';
import './App.css';
import Player from "./components/Player/player";
import Modal from './components/UI/modal/modalOver'



class App extends React.Component {

    state = {
        over: 0,
        newGame: false,
        pointsTable: [0, 0, 0],
        cosik: 'hej',
        show: false,
        send: [0, 0],
        k:false
    };

    handlePointsChange = p => {
        let table = this.state.pointsTable;
        table[p[1]] = p[0];
        this.setState({pointsTable: table});
    };

    handleOverChange = p => {
        this.setState({over: p});

    };
    handleNewGameChange = p => {
        this.setState({newGame: p});
        this.setState({over: 0});
    };

    overGame=()=>{
        let pointsModal = this.state.pointsTable;
        let res = 0;
        let ii=0;
        for (let i = 0; i < pointsModal.length; i++) {
            if (pointsModal[i] > res) {
                res = pointsModal[i];
                ii=i;
            }
        }
        this.setState({send: [ii,res]});
        let newOver=this.state.over+1;
        this.setState({over:newOver});

    };

    render() {
        return (
            <div className="App">
                <Modal
                    newGam={this.state.newGame}
                    winner={this.state.send[0]}
                    pointsWin={this.state.send[1]}
                    show={this.state.over === 4}
                    onNewGameChange={this.handleNewGameChange}

                />
                <Player num={0}
                        ove={this.state.over}
                        onOverChange={this.handleOverChange}
                        ng={this.state.newGame}
                        points={this.state.pointsTable[0]}
                        onPointsChange={this.handlePointsChange}
                />
                <Player num={1}
                        ove={this.state.over}
                        onOverChange={this.handleOverChange}
                        ng={this.state.newGame}
                        points={this.state.pointsTable[1]}
                        onPointsChange={this.handlePointsChange}
                />
                <Player num={2}
                        ove={this.state.over}
                        onOverChange={this.handleOverChange}
                        ng={this.state.newGame}
                        points={this.state.pointsTable[2]}
                        onPointsChange={this.handlePointsChange}
                />
                <div className={this.state.over===3?"Appe":"Appen"}>
                    <button onClick={this.state.over===3?this.overGame:console.log()}>Over</button>
                </div>
            </div>
        );
    }


}

export default App;

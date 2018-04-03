import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Game as GameModel} from '../modules/Game'
import {GamePhase, Stringifier} from '../modules/RollTTAges'

import DiceZone from './DiceZone'
import City from './City'
import Stocks from './Stocks'
import Developements from './Developements'
import Monuments from './Monuments'
import Scores from './Scores'
import HelpAndInfos from './HelpAndInfos'

import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';


interface GameProps extends DefaultProps {
}
interface GameState {
}

@inject(injector)
@observer
class Game extends React.Component <GameProps, GameState> {

    constructor(props: GameProps){
        super(props)
        this.state = {
        }
    }

    handleEndTurn = () => {
        if(this.props.game.stock.isLegalAtEndOfTurn()){
            this.props.game.step5()
        }
        else {
            throw "try to end turn but not working";
            
        }
    }

    render() {
        let game = this.props.game
        
        return (
            <div className="game">
                {/* <HelpAndInfos /> */}
                {/* <Scores /> */}
                <div className='game-main-zone'>
                    <div className='game-phase'>
                        <div className='game-phase-stepper'>
                            <Stepper activeStep={game.phase}>
                            {Object.keys(GamePhase).map(key => GamePhase[key]).filter(v => typeof v !== "string").map((index) =>
                                <Step key={index}>
                                    <StepLabel>{Stringifier.getGamePhaseName(index)}</StepLabel>
                                </Step>
                            )}
                            </Stepper>
                        </div>
                        <div className='game-phase-current-desciption'>
                            {Stringifier.getGamePhaseDescription(game.phase)}
                        </div>
                        {/* <Button onClick={() => game.goToNextPhase()}>Increase Phase</Button> */}
                    </div>
                    {game.phase === GamePhase.Phase_1_Dices && <DiceZone />}
                    {game.phase === GamePhase.Phase_3_City_And_Monuments && 
                        <div>
                            Free Workers : {this.props.ui.availableWorkers}
                        </div>
                    }
                    {game.phase === GamePhase.Phase_4_Developement && 
                        <div>
                            Gold : {this.props.ui.currentMoney}
                            <Button onClick={() => this.props.game.step4()}>Skip</Button>
                        </div>
                        
                    }
                    {game.phase === GamePhase.Phase_5_Discard_Resources && 
                        <div>
                            stock size: {game.stock.nbResources}
                            <Button 
                                disabled={!game.stock.isLegalAtEndOfTurn()}
                                onClick={this.handleEndTurn}
                            >
                                End turn
                            </Button>
                        </div>
                    }
                </div>
                <div className='game-parts'>
                    <div className='game-parts-elt'>                
                        <Stocks />
                    </div>
                    <div className='game-parts-elt'>
                        <City />                                
                        <Monuments />
                    </div>
                    <div className='game-parts-elt'>                
                        <Developements />
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;

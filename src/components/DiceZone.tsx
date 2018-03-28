import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Dice as DiceModel} from '../modules/Dice'
import {RollOfDice as RollOfDiceModel} from '../modules/RollOfDice'

import Dice from './Dice';
import Button from 'material-ui/Button';
import { DevelopementType } from '../modules/Developements';

interface DiceZoneProps extends DefaultProps {
}

interface DiceZoneState {
    rollOneMore: boolean
}

@inject(injector)
@observer
export default class DiceZone extends React.Component<DiceZoneProps, DiceZoneState> {
    constructor(props: DiceZoneProps) {
        super(props);
        this.state = {
            rollOneMore: false
        };
    }

    componentWillReceiveProps(newProps){
        console.log('newProps', newProps)
    }

    get diceRoll(){
        return this.props.ui.diceRoll
    }

    roll = () => {
        let diceRoll = this.props.ui.diceRoll
        diceRoll.roll()
        // if(diceRoll.)
    }

    validate = () => {
        this.props.ui.diceRoll.validate()
        // .handleFoodAndDisastersFromResult(this.diceRoll.getResult())
    }

    rollAgain = () => {
        this.setState({ rollOneMore: !this.state.rollOneMore })
    }

    renderResults(){
        console.log('render result')
        const res = this.props.ui.diceRoll.getResult()
        const gameRes = this.props.game.getResult(res)

        return <div className="dice-roll-result">
            <div className='dice-roll-result-description'>
                food: {gameRes.food}, 
                money: {gameRes.money},
                resource: {gameRes.resources},
                worker: {gameRes.workers},
                disaster: {gameRes.disasters}
            </div>
            <div className='dice-roll-result-actions'>
                {this.props.game.developements.isValidate(DevelopementType.Conduite) && !this.props.ui.diceRoll.isValidate() &&
                    <Button onClick={this.rollAgain}>{this.state.rollOneMore ? 'Cancel' : 'Roll one again'}</Button>
                }
                {!this.props.ui.diceRoll.isValidate() && 
                    <Button onClick={this.validate}>Validate</Button>
                }
            </div>
        </div>
    }

    render() {
        let diceRoll = this.props.ui.diceRoll

        return <div className="dice-roll-zone">
            <div className="dice-roll-zone-dices">
                {diceRoll.dices.map((d, k) => <Dice 
                    key={k} 
                    dice={d} 
                    rollOneMore={this.state.rollOneMore} 
                />)}
            </div>
            <div className="dice-roll-zone-action">            
                {!diceRoll.isOver() && <Button onClick={this.roll}>Roll</Button>}
            </div>
            <div className="dice-roll-zone-results">            
                {diceRoll.isOver() && this.renderResults()}
            </div>
        </div>
    }
}
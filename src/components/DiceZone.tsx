import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Dice as DiceModel} from '../modules/Dice'
import {RollOfDice as RollOfDiceModel} from '../modules/RollOfDice'

import Dice from './Dice';
import Button from 'material-ui/Button';

interface DiceZoneProps extends DefaultProps {
}

interface DiceZoneState {
    selectedDices: number[],
}

@inject(injector)
@observer
export default class DiceZone extends React.Component<DiceZoneProps, DiceZoneState> {
    constructor(props: DiceZoneProps) {
        super(props);
        this.state = {
            selectedDices : [],
        };
    }

    componentWillReceiveProps(newProps){
        console.log('newProps', newProps)
    }

    get diceRoll(){
        return this.props.ui.diceRoll
    }

    roll = () => {
        console.log('roll')
        this.props.ui.diceRoll.roll()
    }

    validate = () => {
        // this.props.game.handleFoodAndDisastersFromResult(this.diceRoll.getResult())
    }

    renderResults(){
        console.log('render result')
        const res = this.props.ui.diceRoll.getResult()

        return <div className="dice-roll-result">
            food: {res.food}, 
            money: {res.money},
            resource: {res.resources},
            worker: {res.workers},
            disaster: {res.disasters}
        </div>
    }

    render() {
        let diceRoll = this.props.ui.diceRoll

        return <div className="dice-roll-zone">
            <div className="dices">
                {diceRoll.dices.map((d, k) => <Dice key={k} dice={d} />)}
            </div>
            
            {!diceRoll.isOver() && <Button onClick={this.roll}>Roll</Button>}
            {!diceRoll.isOver() && diceRoll.needResolution() && <Button onClick={this.validate}>Validate</Button>}
            
            {diceRoll.isOver() && this.renderResults()}
        </div>
    }
}
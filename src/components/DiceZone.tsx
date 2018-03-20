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

    get diceRoll(){
        return this.props.ui.diceRoll
    }

    roll = () => {
        console.log('roll')
        this.props.ui.diceRoll.roll()
    }

    render() {
        return <div className="dice-roll-zone">
            <div className="dices">
                {this.props.ui.diceRoll.dices.map((d, k) => <Dice key={k} dice={d} />)}
            </div>
            {!this.props.ui.diceRoll.finished && <Button onClick={this.roll}>Roll</Button> }
        </div>
    }
}
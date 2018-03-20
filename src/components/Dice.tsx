import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {Dice as DiceModel} from '../modules/Dice'

interface DiceProps extends DefaultProps {
    dice: DiceModel
}

interface DiceState {
    frozen: boolean
}

@inject(injector)
@observer
export default class Dice extends React.Component<DiceProps, DiceState> {
    constructor(props: DiceProps) {
        super(props);
        this.state = {
            frozen: this.props.dice.frozen
        };
    }

    onClick = () => {
        if(this.props.ui.diceRoll.turn > 0 && !this.props.ui.diceRoll.finished){    
            this.setState({ frozen: !this.state.frozen })
            if(this.props.dice.frozen){
                this.props.dice.unFreeze()
            }
            else{
                this.props.dice.freeze()
            }
        }
    }

    render() {
        let dice = this.props.dice
        
        return <div className={'dice' + (!this.props.ui.diceRoll.finished && dice.frozen ? ' dice-frozen' : '')}
            onClick={this.onClick}
        >
            Face : {dice.currentFaceName}  
        </div>
    }
}
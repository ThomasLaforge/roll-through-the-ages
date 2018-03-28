import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {Dice as DiceModel, DiceFace} from '../modules/Dice'

interface DiceProps extends DefaultProps {
    dice: DiceModel,
    rollOneMore: boolean
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
        let diceRoll = this.props.ui.diceRoll 

        if(!diceRoll.isOver()){    
            this.setState({ frozen: !this.state.frozen })
            if(this.props.dice.frozen){
                this.props.dice.unFreeze()
            }
            else{
                this.props.dice.freeze()
            }
        }
        if(diceRoll.isOver() && !diceRoll.isValidate()){
            if(this.props.rollOneMore){
                this.props.dice.unFreeze()
                this.props.dice.roll()
                // this.props.onRollOneMore()
                // this.props.ui.diceRoll.validate()
            }
            else if(this.props.dice.isSwitchable()){
                this.props.dice.switchSpecialFace()
            }
        }
    }

    render() {
        let dice = this.props.dice
        let className = ''
        className += ' dice-' + dice.currentFaceIndex
        if(!this.props.ui.diceRoll.isOver() && dice.frozen){
            className += ' dice-frozen'
        }
        else if(this.props.ui.diceRoll.isOver() && dice.isSwitchable()){
            if(!dice.specialFace){
                className += ' dice-special-need-resolution'                
            }
            else{
                if(dice.specialFace === DiceFace.FoodOrWorker_Food){
                    className += ' dice-special-face-food'
                }
                if(dice.specialFace === DiceFace.FoodOrWorker_Worker){
                    className += ' dice-special-face-worker'
                }
            }
        }
        
        
        return <div className={'dice' + className}
            onClick={this.onClick}
        />
    }
}
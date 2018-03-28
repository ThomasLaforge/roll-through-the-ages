import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Game as GameModel} from '../modules/Game'

import DiceZone from './DiceZone'
import City from './City'
import Stocks from './Stocks'
import Developements from './Developements'
import Monuments from './Monuments'
import Scores from './Scores'
import RoundCounter from './RoundCounter'
import HelpAndInfos from './HelpAndInfos'

interface GameProps extends DefaultProps {
}

@inject(injector)
@observer
class Game extends React.Component <GameProps> {

    constructor(props: GameProps){
        super(props)
        this.state = {
        }
    }

    render() {
        let game = this.props.game
        return (
            <div className="game">
                <RoundCounter />
                <HelpAndInfos />
                <Scores />
                <City />
                <DiceZone />
                <Stocks />
                <Developements />
                <Monuments />
            </div>
        );
    }
}

export default Game;

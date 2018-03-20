import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Game as GameModel} from '../modules/Game'

import DiceZone from './DiceZone'

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
                <DiceZone />
            </div>
        );
    }
}

export default Game;

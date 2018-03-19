import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import {Game as GameModel} from '../modules/Game'

import GameDangerChoice from './GameDangerChoice'

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

    // get gsm : function() { return this.gamesavemanager }, 
    // get game : function() { return this.gsm.game },
    // get pirateList : function(){ return this.game.getListOfPirateToFight() }

    render() {
        let game = this.props.game
        return (
            <div className="game">
                Game
            </div>
        );
    }
}

export default Game;

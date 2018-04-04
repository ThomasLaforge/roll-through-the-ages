import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {HistoryLine} from '../modules/History'
import {Game} from '../modules/Game'

import Button from 'material-ui/Button';

interface EndGameProps extends DefaultProps {
}

interface EndGameState {
}

@inject(injector)
@observer
export default class EndGame extends React.Component<EndGameProps, EndGameState> {
    constructor(props: EndGameProps) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        console.log('endGame loading...')
        const g = this.props.game
        this.props.history.add({
            total: g.score,
            developements: g.getDevelopmentsScore(),
            monuments: g.getMonumentsScore(), 
            bonus: g.getBonusScore(),
            disasters: g.disasterCounter, 
            date: Date.now()
        })
    }

    renderHistoryLines(){        
        console.log('history lines', this.props.history.lines.reduce( (s, o) => o + ' ,', ''))
        return this.props.history.getFiveBests().map( (l: HistoryLine, i) => 
            <tr key={i}>
                <td>{l.total}</td>
                <td>{l.developements}</td>
                <td>{l.monuments}</td>
                <td>{l.bonus}</td>
                <td>{l.disasters}</td>
                <td>{l.date}</td>
            </tr>
        )
    }

    render() {
        return <div className='end-game'>
            <div className='end-game-info'>
                <h1 className='end-game-title'>The game is finished!</h1>
                <div className='end-game-history-actions'>
                    <Button onClick={() => this.props.game.reset()}>New game</Button>
                </div>
            </div>

            <div className='end-game-score-board'>
                <div className='score-board-description'></div>
                <div className='score-board-content'>
                    <div className='score-board-elt score-board-developements'>
                        <div className='score-board-elt-title'>Developements</div>
                        <div className='score-board-elt-value'>{this.props.game.getDevelopmentsScore()}</div>                        
                    </div>
                    <div className='score-board-elt score-board-monuments'>
                        <div className='score-board-elt-title'>Monuments</div>
                        <div className='score-board-elt-value'>{this.props.game.getMonumentsScore()}</div>                        
                    </div>
                    <div className='score-board-elt score-board-bonus'>
                        <div className='score-board-elt-title'>Bonus</div>
                        <div className='score-board-elt-value'>{this.props.game.getBonusScore()}</div>                                            
                    </div>
                    <div className='score-board-elt score-board-disasters'>
                        <div className='score-board-elt-title'>Disasters</div>
                        <div className='score-board-elt-value'>{this.props.game.disasterCounter}</div>                                            
                    </div>
                    <div className='score-board-elt score-board-total'>
                        <div className='score-board-elt-title'>Total</div>
                        <div className='score-board-elt-value'>{this.props.game.score}</div>                                            
                    </div>
                </div>
            </div>

            <div className='end-game-leader-board'>
                { this.props.history.getFiveBests().length === 0 ?
                    <table className='leader-board-table'>
                        <thead>
                            <tr>
                                <th>Score total</th>
                                <th>Developements</th>
                                <th>Monuments</th>
                                <th>Bonus</th>
                                <th>Disasters</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderHistoryLines()}
                        </tbody>
                    </table>
                : 
                    <div className='leader-board-empty'>
                        Pas de données d'historique
                    </div>
                }
            </div>

            <div className='end-game-history-actions'>
                <Button onClick={() => this.props.history.reset()}>Reset</Button>
            </div>
        </div>

    }
}

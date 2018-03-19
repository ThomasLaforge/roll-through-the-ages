import * as React from 'react';
import {observer, inject} from 'mobx-react';
import { DefaultProps, injector } from '../lib/mobxInjector'

import Button from 'material-ui/Button';

interface GameDangerChoiceProps extends DefaultProps {
}

interface GameDangerChoiceState {
    currentSelected: number;
}

@inject(injector)
@observer
export default class GameDangerChoice extends React.Component<GameDangerChoiceProps, GameDangerChoiceState> {
    constructor(props: GameDangerChoiceProps) {
        super(props);
        this.state = {
            currentSelected : 0            
        };
    }

    render() {
        return <div className="game-danger-choice" id="zone-danger-choice">
            danger choice
        </div>
    }
}
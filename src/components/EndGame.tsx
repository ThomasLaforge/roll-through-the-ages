import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

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

    render() {
        return <div className='end-game'>
            Over
        </div>
    }
}

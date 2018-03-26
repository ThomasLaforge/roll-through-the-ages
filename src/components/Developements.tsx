import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {Developements as DevelopementssMode, Developement as DevelopementModel} from '../modules/Developements'

import Button from 'material-ui/Button'

interface DevelopementssProp extends DefaultProps {
}

interface DevelopementssStat {
}

@inject(injector)
@observer
export default class Developements extends React.Component<DevelopementssProp, DevelopementssStat> {
    constructor(props: DevelopementssProp) {
        super(props);
        this.state = {
        };
    }

    renderDevelopements(){
        return this.props.game.developements.developements.map(d => <Dev dev={d} />)
    }

    render() {
        return <div className={'Developements'}>
            {this.renderDevelopements()}
            {/* <Button onClick={() => {this.props.game.Developements.nbJobsDone++}}>Add</Button> */}
        </div>
    }
}

// --------------------------------------------------------------------------------

interface DevProps extends DefaultProps {
    dev: DevelopementModel
}

interface DevState {
}

@inject(injector)
@observer
class Dev extends React.Component<DevProps, DevState> {
    constructor(props: DevProps) {
        super(props);
        this.state = {

        };
    }

    render() {
        const dev = this.props.dev
        const devDoneClass = dev.validate ? ' dev-done' : ''

        return <div className={'dev' + devDoneClass}> 
                <div className="dev-population">
                    {dev.cost} : {dev.definition} {dev.validate ? ' validé' : ' to validate'}
                </div>
            }
        </div>
    }
}
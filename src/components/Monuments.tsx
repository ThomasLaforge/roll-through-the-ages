import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {Monuments as MonumentsModel, Building as BuildingModel} from '../modules/Monuments'

import Button from 'material-ui/Button'

interface MonumentsProps extends DefaultProps {
}

interface MonumentsState {
}

@inject(injector)
@observer
export default class Monuments extends React.Component<MonumentsProps, MonumentsState> {
    constructor(props: MonumentsProps) {
        super(props);
        this.state = {
        };
    }

    renderMonuments(){
        return this.props.game.monuments.buildings.map(b => <Building 
            building={b} 
        />)
    }

    render() {
        return <div className={'monuments'}>
            {this.renderMonuments()}
            {/* <Button onClick={() => {this.props.game.Monuments.nbJobsDone++}}>Add</Button> */}
        </div>
    }
}

// --------------------------------------------------------------------------------

interface BuildingProps extends DefaultProps {
    building: BuildingModel
}

interface BuildingState {
}

@inject(injector)
@observer
class Building extends React.Component<BuildingProps, BuildingState> {
    constructor(props: BuildingProps) {
        super(props);
        this.state = {

        };
    }

    render() {
        const b = this.props.building
        const BuildingDoneClass = b.isBuilt() ? ' building-done' : ''

        return <div className={'building' + BuildingDoneClass}>
            {b.nbNeededWorker && 
                <div className="building-population">
                    {b.nbWorker || 0} / {b.nbNeededWorker}
                </div>
            }
        </div>
    }
}
import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {City as CityModel} from '../modules/City'

import Button from 'material-ui/Button'

interface CityProps extends DefaultProps {
}

interface CityState {
}

@inject(injector)
@observer
export default class City extends React.Component<CityProps, CityState> {
    constructor(props: CityProps) {
        super(props);
        this.state = {
        };
    }

    renderDistricts(){
        let districts = []
        const nbDiceToRender = this.props.game.city.maxDices
        let nbWorks = this.props.game.city.nbJobsDone

        for (let i = 0; i < nbDiceToRender; i++) {
            let maxWorks, worksDone;
            if(i > this.props.game.city.freeDices - 1){
                maxWorks = i
                worksDone = nbWorks > i ? maxWorks : nbWorks 
                nbWorks = nbWorks - worksDone
            }
            districts.push(<District key={i} maxWorks={maxWorks} worksDone={worksDone} />)            
        }
        return districts
    }

    render() {
        return <div className={'city'}>
            {this.renderDistricts()}
            {/* <Button onClick={() => {this.props.game.city.nbJobsDone++}}>Add</Button> */}
        </div>
    }
}

// --------------------------------------------------------------------------------

interface DistrictProps extends DefaultProps {
    maxWorks: number,
    worksDone: number
}

interface DistrictState {
}

@inject(injector)
@observer
class District extends React.Component<DistrictProps, DistrictState> {
    constructor(props: DistrictProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        const districtDone = !this.props.maxWorks || this.props.maxWorks === this.props.worksDone
        const districtDoneClass = districtDone ? ' district-done' : ''

        return <div className={'district' + districtDoneClass}>
            {this.props.maxWorks && 
                <div className="district-population">
                    {this.props.worksDone || 0} / {this.props.maxWorks}
                </div>
            }
        </div>
    }
}
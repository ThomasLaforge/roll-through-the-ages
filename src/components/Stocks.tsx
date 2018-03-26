import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {GlobalStock as GlobalStockModel} from '../modules/GlobalStock'

import Button from 'material-ui/Button'

interface GlobalStockProps extends DefaultProps {
}

interface GlobalStockState {
}

@inject(injector)
@observer
export default class GlobalStock extends React.Component<GlobalStockProps, GlobalStockState> {
    constructor(props: GlobalStockProps) {
        super(props);
        this.state = {
        };
    }

    renderIndividualStocks(){
        return this.props.game.stock.orderedResourcesStocks.map(s => <IndividualStock steps={s.maxPos} />)
    }

    render() {
        return <div className='global-stock'>
            {this.renderIndividualStocks()}
        </div>
    }
}

// --------------------------------------------------------------------------------

interface IndividualStockProps extends DefaultProps {
    steps
}

interface IndividualStockState {
}

@inject(injector)
@observer
class IndividualStock extends React.Component<IndividualStockProps, IndividualStockState> {
    constructor(props: IndividualStockProps) {
        super(props);
        this.state = {
        };
    }

    render() {
        return <div className={'individual-stock'}>
            {/* {this.render} */}
        </div>
    }
}
import * as React from 'react';
import { DefaultProps, injector } from '../lib/mobxInjector'
import {observer, inject} from 'mobx-react';

import {GlobalStock as GlobalStockModel} from '../modules/GlobalStock'
import {Stock as StockModel} from '../modules/Stock'

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
        return this.props.game.stock.orderedResourcesStocks.map(s => <IndividualStock stock={s} />)
    }

    renderFoodStock(){
        return <IndividualStock stock={this.props.game.stock.foodStock} />
    }

    render() {
        return <div className='global-stock'>
            <h2>Stocks</h2>
            {this.renderIndividualStocks()}
            {this.renderFoodStock()}
        </div>
    }
}

// --------------------------------------------------------------------------------

interface IndividualStockProps extends DefaultProps {
    stock: StockModel
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
        let stock = this.props.stock
        return <div className={'individual-stock'}>
            type: {stock.constructor.name }, length : {stock.maxPos}, current: {stock.position}
        </div>
    }
}
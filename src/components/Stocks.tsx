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
        return this.props.game.stock.reversedOrderedResourcesStocks.map( (s, k) => <IndividualStock key={k} stock={s} />)
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
    selected: boolean
}

@inject(injector)
@observer
class IndividualStock extends React.Component<IndividualStockProps, IndividualStockState> {
    constructor(props: IndividualStockProps) {
        super(props);
        this.state = {
            selected: false
        };
    }

    renderLine(){
        let line = []
        for(let i = 0; i <= this.props.stock.maxPos; i++){
            let isCurrentPosition = this.props.stock.position === i
            let bonusClass = isCurrentPosition ? ' line-point-current-position' : ''
            line.push(
                <div className={'line-point' + bonusClass} key={i}>
                    <div className="point" />
                    <div className="point-value">{this.props.stock.getValueByPosition(i)}</div>
                </div>
            )
        }
        
        return <div className='line'>
            {line}
        </div>
    }

    onSelect = () => {
        console.log('select a stock line')
        
        this.setState({selected: !this.state.selected })
    }

    render() {
        let stock = this.props.stock
        return <div className={'individual-stock individual-stock-' + this.props.stock.constructor.name}
            onClick={this.onSelect}    
        >
            {/* type: {stock.constructor.name }, length : {stock.maxPos}, current: {stock.position} */}
            {this.renderLine()}
        </div>
    }
}
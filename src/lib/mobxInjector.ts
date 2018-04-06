import {Store, UIStore} from '../modules/Store'
import {Game} from '../modules/Game'
import {History} from '../modules/History'

export interface InjectedStores {
    store?: Store
}

export interface DefaultProps {
    game?: Game
    ui?: UIStore
    store?: Store
}

export const injector = (injectContent: InjectedStores) : DefaultProps => ({
    game: injectContent.store.gameStore as Game,
    ui: injectContent.store.uiStore as UIStore,
    store: injectContent.store
})
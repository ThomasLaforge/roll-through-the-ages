import { City } from '../modules/City'

let c = new City()

describe('City', () => {
  describe('dices', () => {      
    test('0 jobs', () => {
      c.nbJobsDone = 0
      expect(c.getNbDiceAccessible()).toEqual(3);
    })
    test('2 jobs', () => {
      c.nbJobsDone = 2
      expect(c.getNbDiceAccessible()).toEqual(3);
    })
    test('3 jobs', () => {
      c.nbJobsDone = 3
      expect(c.getNbDiceAccessible()).toEqual(4);
    })
    test('5 jobs', () => {
      c.nbJobsDone = 5
      expect(c.getNbDiceAccessible()).toEqual(4);
    })
    test('7 jobs', () => {
      c.nbJobsDone = 7
      expect(c.getNbDiceAccessible()).toEqual(5);
    })
    test('12 jobs', () => {
      c.nbJobsDone = 12
      expect(c.getNbDiceAccessible()).toEqual(6);
    })
  })
})
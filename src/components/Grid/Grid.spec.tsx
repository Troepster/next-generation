import React from 'react';
import renderer from 'react-test-renderer';
import { Grid, stayingAlive } from './';
import { RecoilRoot } from 'recoil';

it('should render Grid and match snapshot', () => {
  const tree = renderer
    .create(
      <RecoilRoot>
        <Grid />
      </RecoilRoot>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const grid = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

describe('staying Alive Function', () => {
  it('should be 1', () => {
    expect(1).toEqual(1);
  });
  it('should return true for x:1 and y:2', () => {
    const result = stayingAlive(grid, 1, 2);
    expect(result).toEqual(true);
  });
  it('should return false for x:2 and y:1', () => {
    const result = stayingAlive(grid, 2, 1);
    expect(result).toEqual(false);
  });
});

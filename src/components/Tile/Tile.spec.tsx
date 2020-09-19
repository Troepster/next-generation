import React from 'react';
import renderer from 'react-test-renderer';
import { Tile } from './';

it('should render Tile and match snapshot', () => {
  const tree = renderer.create(<Tile alive={true} x={0} y={0} onClick={() => null} />).toJSON();
  expect(tree).toMatchSnapshot();
});

import styled from 'styled-components';
import React, { FC } from 'react';

const StyledTile = styled.div`
  display: flex;
  width: 10px;
  height: 10px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: #282c34;
`;

interface Props {
  x: number;
  y: number;
}

const Tile: FC<Props> = (props) => {
  const { x, y } = props;
  console.log(x, y);
  return <StyledTile />;
};

export default Tile;

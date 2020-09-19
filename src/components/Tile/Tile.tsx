import styled from 'styled-components';
import React from 'react';
import { blue } from '@material-ui/core/colors';

const StyledTile = styled.div<{ alive: boolean }>`
  display: flex;
  width: 20px;
  height: 20px;
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: #ccc;
  background-color: ${({ alive }) => (alive ? blue.A100 : 'transparent')};
  transition: background-color 0.2s;
`;
type OnClickFunction = (alive: boolean, x: number, y: number) => void;

interface Props {
  x: number;
  y: number;
  alive: boolean;
  onClick: OnClickFunction;
}

const Tile: React.FC<Props> = React.memo((props) => {
  const { x, y, alive, onClick } = props;
  return <StyledTile alive={alive} onClick={() => onClick(!alive, x, y)} />;
});

export default Tile;

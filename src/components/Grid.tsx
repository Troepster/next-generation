import styled from 'styled-components';
import React, { useCallback } from 'react';
import Tile from './Tile';
import { useRecoilState } from 'recoil';
import { boardAtom } from '../state/atoms';
import { replaceItemAtIndex } from '../utils/replace';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  border-top: 1px solid;
  border-left: 1px solid;
  border-color: #282c34;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Grid: React.FC = () => {
  const [board, setBoard] = useRecoilState(boardAtom);

  console.log(board);
  const changeTileState = useCallback(
    (alive: boolean, x: number, y: number) => {
      setBoard((prevBoard) => {
        console.log(prevBoard[y][x]);
        const newBoard = prevBoard.slice(0);
        newBoard[y] = replaceItemAtIndex(newBoard[y], x, alive ? 1 : 0) as [number];
        return newBoard as [[number]];
      });
    },
    [setBoard]
  );
  return (
    <Wrapper>
      <Container>
        {board.map((v, y) => (
          <Row key={y}>
            {v.map((vv, x) => (
              <Tile key={x} x={x} y={y} onClick={changeTileState} alive={!!vv} />
            ))}
          </Row>
        ))}
      </Container>
    </Wrapper>
  );
};

export default Grid;

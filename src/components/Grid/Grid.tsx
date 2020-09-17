import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import Tile from '../Tile';
import { useRecoilState } from 'recoil';
import { boardAtom } from '../../state/atoms';
import { replaceItemAtIndex } from '../../utils/replace';
import { stayingAlive } from './Grid.utils';
import { Button } from '@material-ui/core';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
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
  const [playing,setPlaying] = useState(false);

  const changeTileState = useCallback(
    (alive: boolean, x: number, y: number) => {
      setBoard((prevBoard) => {
        const newBoard = prevBoard.slice(0);
        newBoard[y] = replaceItemAtIndex(newBoard[y], x, alive ? 1 : 0) as [number];
        return newBoard as [number][];
      });
    },
    [setBoard]
  );

  const calculateNextGeneration = useCallback(() => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.slice(0);
      prevBoard.forEach((row, y) => {
        row.forEach((cell, x) => {
          newBoard[y] = replaceItemAtIndex(newBoard[y], x, stayingAlive(prevBoard, x, y) ? 1 : 0);
        });
      });
      return newBoard as [number][];
    });
  }, [setBoard]);

  const togglePlay = ()=> {

  }

  useEffect(() => {
    changeTileState(true, 8, 8);
    changeTileState(true, 9, 9);
    changeTileState(true, 9, 10);
    changeTileState(true, 8, 10);
    changeTileState(true, 7, 10);
  }, [changeTileState]);
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
      <Button onClick={calculateNextGeneration}>Next Generation</Button>
      <Button onClick={togglePlay}>Next Generation</Button>
    </Wrapper>
  );
};

export default Grid;

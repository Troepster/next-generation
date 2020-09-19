import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import Tile from '../Tile';
import { useRecoilState } from 'recoil';
import { boardAtom, savedBoardAtom } from '../../state/atoms';
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
  border-color: #ccc;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonWrapper = styled(Row)`
  justify-content: space-evenly;
`;

const StyledButton = styled(Button)`
  width: 200px;
`;

const Grid: React.FC = () => {
  const [board, setBoard] = useRecoilState(boardAtom);
  const [savedBoard, setSavedBoard] = useRecoilState(savedBoardAtom);
  const [hasStarted, setHasStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const changeTileState = useCallback(
    (alive: boolean, x: number, y: number) => {
      !hasStarted &&
        setBoard((prevBoard) => {
          const newBoard = prevBoard.slice(0);
          newBoard[y] = replaceItemAtIndex(newBoard[y], x, alive ? 1 : 0) as [number];
          return newBoard as [number][];
        });
    },
    [hasStarted, setBoard]
  );

  const calculateNextGeneration = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
      setSavedBoard(board.slice(0));
    }
    setBoard((prevBoard) => {
      const newBoard = prevBoard.slice(0);
      prevBoard.forEach((row, y) => {
        row.forEach((cell, x) => {
          newBoard[y] = replaceItemAtIndex(newBoard[y], x, stayingAlive(prevBoard, x, y) ? 1 : 0);
        });
      });
      return newBoard as [number][];
    });
  }, [board, hasStarted, setBoard, setSavedBoard]);

  const resetBoard = useCallback(() => {
    setHasStarted(false);
    setPlaying(false);
    setBoard(savedBoard.slice(0));
  }, [savedBoard, setBoard]);
  useEffect(() => {
    const interval =
      playing &&
      setInterval(() => {
        calculateNextGeneration();
      }, 50);
    return () => {
      typeof interval !== 'boolean' && clearInterval(interval);
    };
  }, [calculateNextGeneration, playing]);

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
      <ButtonWrapper>
        <StyledButton onClick={calculateNextGeneration} disabled={playing}>
          Next Generation
        </StyledButton>
        <StyledButton onClick={() => setPlaying(!playing)}>
          {playing ? 'Stop' : 'Evolve'}
        </StyledButton>
        <StyledButton onClick={() => resetBoard()} disabled={!hasStarted}>
          Reset
        </StyledButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Grid;

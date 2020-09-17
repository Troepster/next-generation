import styled from 'styled-components';
import { makeSequence } from '../utils/seqGenerator';
import React from 'react';
import Tile from './Tile';

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

const Grid = () => {
  const seq = [...makeSequence(16, 2)];
  console.log(seq);
  return (
    <Wrapper>
      <Container>
        {seq.map((v, x) => (
          <Row key={x}>
            {v.map((vv, y) => (
              <Tile key={y} x={x} y={y} />
            ))}
          </Row>
        ))}
      </Container>
    </Wrapper>
  );
};

export default Grid;

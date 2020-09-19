import { atom } from 'recoil';
import { makeSequence } from '../utils/seqGenerator';

export const boardAtom = atom<[number][]>({
  key: 'board',
  default: makeSequence(40, 2),
});

export const savedBoardAtom = atom<[number][]>({
  key: 'savedBoard',
  default: [[0]],
});

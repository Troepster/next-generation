import { atom } from 'recoil';
import { makeSequence } from '../utils/seqGenerator';

export const boardAtom = atom<[[number]]>({
  key: 'board',
  default: makeSequence(16, 2),
});

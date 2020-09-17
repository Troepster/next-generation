function* makeSequenceFn(max: number, dimensionCount = 1): Generator<[number], any, [number]> {
  for (let i = 0; i < max; i++) {
    yield (dimensionCount <= 1
      ? 0
      : [...((makeSequenceFn(max, dimensionCount - 1) as unknown) as [number])]) as [number];
  }
}

export const makeSequence = (max: number, dimensionCount = 1) => {
  return (makeSequenceFn(max, dimensionCount) as unknown) as [[number]];
};

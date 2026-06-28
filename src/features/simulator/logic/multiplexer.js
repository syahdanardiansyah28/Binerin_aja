import { isBit } from '../../../utils/binary';

export function calculateMultiplexer(inputs, selector) {
  const selectedIndex = parseInt(selector, 2);

  return {
    selectedInput: `I${selectedIndex}`,
    output: inputs[selectedIndex],
    selectedIndex,
  };
}

export function evaluateMultiplexer(inputs, selector) {
  const normalizedInputs = inputs.map((input) => String(input).trim());
  const selected = selector.trim();

  if (normalizedInputs.some((input) => !isBit(input)) || !/^[01]{2}$/.test(selected)) {
    return {
      isValid: false,
      errorMessage: 'Multiplexer 4:1 membutuhkan I0-I3 berisi 0/1 dan selector 2 bit.',
      selectedInput: '-',
      output: '-',
      rows: [],
    };
  }

  return {
    isValid: true,
    errorMessage: '',
    ...calculateMultiplexer(normalizedInputs.map(Number), selected),
    rows: normalizedInputs.map((input, index) => ({
      input: `I${index}`,
      value: input,
      active: index === parseInt(selected, 2),
    })),
  };
}

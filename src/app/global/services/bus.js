import { makeBus } from '@davestewart/extension-bus';

export const BusFactory = (source) => {
  return makeBus(source, {
    external: true,
  });
};

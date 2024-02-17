export const getLogger = (source) => {
  return {
    log: (message, ...args) => {
      console.log(`[${source}] ${message}`, ...args);
    },

    error: (message, ...args) => {
      console.error(`[${source}] ${message}`, ...args);
    },

    warn: (message, ...args) => {
      console.warn(`[${source}] ${message}`, ...args);
    },

    info: (message, ...args) => {
      console.info(`[${source}] ${message}`, ...args);
    },
  };
};

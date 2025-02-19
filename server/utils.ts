export const errorHandler = (error: unknown) => {
  if (error instanceof Error) {
    return `Error: ${error.message}`;
  } else if (typeof error === "string") {
    return `Error: ${error}`;
  } else {
    return `Unknown error: ${JSON.stringify(error)}`;
  }
};

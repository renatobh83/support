export const ClearValues = (...state) => {
  state.forEach((a) => {
    a({});
  });
};

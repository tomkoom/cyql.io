import { css } from "styled-components"

export const modalStyles = css`
  color: var(--primaryColor);
  background-color: var(--background);
  padding: 1rem 1rem 4rem 1rem;

  /* ... */
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  /* ... */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  /* overflow */
  max-height: calc(100vh);
  overflow-y: auto;
`

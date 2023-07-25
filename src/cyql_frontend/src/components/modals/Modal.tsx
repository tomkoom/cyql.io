import React, { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import CrossIcon from "@/components/icons/CrossIcon";

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectTheme } from "@/state/ui/theme";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }): JSX.Element => {
  if (!isOpen) return null;
  const theme = useAppSelector(selectTheme);

  return createPortal(
    <ModalStyled theme={theme} className={theme}>
      <div>
        <CrossIcon onClick={onClose} />
        {children}
      </div>
    </ModalStyled>,
    document.getElementById("modal")
  );
};

const bgColors = {
  light: "#fff",
  dark: "#121619",
};

const ModalStyled = styled.div<{ theme: string }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => bgColors[p.theme]};
  padding: 1rem;
  z-index: 1;
`;

export default Modal;

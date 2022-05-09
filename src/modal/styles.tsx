import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const XMarkComponent = ({ handleClick, className }: {
  handleClick?: () => void,
  className?: string
}) => <FontAwesomeIcon className={className} onClick={handleClick} icon={faXmarkCircle} size='2x' />

export const ModalContainer = styled.div`
  position: absolute;
  top: calc(50% - 250px);
  left: calc(50% - 250px);
  bottom: 0;
  right: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  width: 500px;
  max-width: 100%;
  height: fit-content;
  max-height: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: -5px 5px 5px 0px rgba(0,0,0,0.75);
  padding: 1em
`;

export const CloseButton = styled(XMarkComponent)`
  position: absolute;
  right: -15px;
  top: -15px;
  background: white;
  border-radius: 100%;
`
export const ModalContent = styled.div`
  overflow: auto;
  padding: 0px 2em;
`;

export const ModalShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;

export const ModalBanner = styled.div`
  margin-bottom: 20px;
  background-color: blue;
  color: white;
  padding: 10px;
`;

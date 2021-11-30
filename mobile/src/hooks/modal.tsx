import React, { createContext, ReactNode, useContext, useState } from 'react';

type ModalContextData = {
  showModal: boolean;
  titleModal: string;
  messageModal: string;
  setTitleModal: (titleModal: string) => void;
  setMessageModal: (messageModal: string) => void;
  closeModal: () => void;
  openModal: (title: string, message: string) => void;
};

type ModalProvider = {
  children: ReactNode;
};

const ModalContext = createContext({} as ModalContextData);

function ModalProvider({ children }: ModalProvider) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<string>('Erro');
  const [messageModal, setMessageModal] = useState<string>(
    'Algo inesperado aconteceu!',
  );

  function openModal(title: string, message: string) {
    setTitleModal(title || 'Erro');
    setMessageModal(message || 'Algo inesperado aconteceu!');
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setTitleModal('Erro');
    setMessageModal('Algo inesperado aconteceu!');
  }

  return (
    <ModalContext.Provider
      value={{
        showModal,
        titleModal,
        messageModal,
        setTitleModal,
        setMessageModal,
        openModal,
        closeModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Erro ao usar contexto do Modal(ModalContext)');
  }

  return context;
}

export { ModalProvider, useModal };

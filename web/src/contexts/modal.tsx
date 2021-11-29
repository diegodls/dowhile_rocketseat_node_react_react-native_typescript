import { createContext, ReactNode, useEffect, useState } from "react";

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

export const ModalContext = createContext({} as ModalContextData);

export function ModalProvider(props: ModalProvider) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<string>("Erro");
  const [messageModal, setMessageModal] = useState<string>(
    "Algo inesperado aconteceu!"
  );

  function openModalWeb(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    title: string,
    message: string
  ) {
    e.preventDefault();
    setTitleModal(title);
    setMessageModal(message);
    setShowModal(true);
  }

  function openModal(title: string, message: string) {
    setTitleModal(title);
    setMessageModal(message);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setTitleModal("Erro");
    setMessageModal("Algo inesperado aconteceu!");
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
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}

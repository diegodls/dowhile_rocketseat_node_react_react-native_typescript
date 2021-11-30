import { createContext, ReactNode, useContext, useState } from "react";

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

function ModalProvider(props: ModalProvider) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<string>("Erro");
  const [messageModal, setMessageModal] = useState<string>(
    "Algo inesperado aconteceu!"
  );

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

function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Erro ao usar contexto do Modal(ModalContext)");
  }

  return context;
}

export { ModalProvider, useModal };

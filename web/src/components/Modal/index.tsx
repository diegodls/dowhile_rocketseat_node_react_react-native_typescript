import React, { useContext, useEffect } from "react";

import styles from "./styles.module.scss";

import { ModalContext } from "../../contexts/modal";

export function Modal() {
  const { showModal, closeModal, titleModal, messageModal } =
    useContext(ModalContext);

  useEffect(() => {
    let x = window.scrollX;
    let y = window.scrollY;
    showModal
      ? (window.onscroll = function () {
          window.scrollTo(x, y);
        })
      : (window.onscroll = function () {});
  }, [showModal]);

  return (
    <>
      {showModal && (
        <div className={styles.backDrop} onClick={closeModal}>
          <div
            className={styles.container}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              e.stopPropagation()
            }
          >
            <strong>{titleModal}</strong>
            <p>{messageModal}</p>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
}

import React from 'react';
import { View, Text, Modal } from 'react-native';

import { useModal } from '../../hooks/modal';

import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function CustomModal() {
  const { showModal, titleModal, messageModal, closeModal } = useModal();

  function handleCloseModal() {
    closeModal();
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {}}>
      <View style={styles.backDrop}>
        <View style={styles.container}>
          <Text style={styles.title}>{titleModal}</Text>
          <Text style={styles.message}>{messageModal}</Text>
          <Button
            title="Fechar"
            backgroundColor={COLORS.PINK}
            color={COLORS.WHITE}
            onPress={handleCloseModal}
          />
        </View>
      </View>
    </Modal>
  );
}

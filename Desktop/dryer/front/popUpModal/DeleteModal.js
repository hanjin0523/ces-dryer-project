import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const DeleteButton = ({isvisible, handleDeleteConfirm, handleDeleteCancel}) => {
    
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  return (
    <View>
      <Modal visible={isvisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>레시피 삭제</Text>
            <Text style={styles.modalMessage}>정말 레시피를 삭제 하시겠습니까?(삭제시 복구가 불가능합니다)</Text>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleDeleteConfirm}>
                <Text style={styles.text}>네.삭제해주세요</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={handleDeleteCancel}>
                <Text style={styles.text}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default DeleteButton;

const styles = StyleSheet.create({
    text: {
      color:"#fff",
      fontSize:20
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBox: {
      width: '45%',
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    modalMessage: {
      fontSize: 16,
      marginBottom: 16,
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 16,
    },
    modalButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 4,
      backgroundColor: '#753CEF',
      marginLeft: 16,
    },
    modalButtonCancel: {
      backgroundColor: '#753CEF',
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
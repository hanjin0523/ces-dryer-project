import { template } from '@babel/core';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

const StageAddModal = ({visible, onSubmit, onClose}) => {

  const [addInputValue, setAddInputValue] = useState([]);

  const handleSubmit = () => {
      onSubmit(addInputValue);
      setAddInputValue({temperature: '', humidity: '', time: ''});
  };
  return (
        <View>
            <Modal visible={visible} animationType="fade" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalInner}>
                        <Text style={styles.modalTitle}>추가스테이지입력</Text>
                        <Text>온도형식은 숫자두자리</Text>
                        <TextInput
                        style={styles.input}
                        value={addInputValue.temperature}
                        onChangeText={(text) => setAddInputValue(prev =>({...prev, temperature: text}))}
                        placeholder="온도를 입력하세요"
                        />
                        <Text>습도형식은 숫자두자리</Text>
                        <TextInput
                        style={styles.input}
                        value={addInputValue.humidity}
                        onChangeText={(text) => setAddInputValue(prev =>({...prev, humidity: text}))}
                        placeholder="습도를 입력하세요"
                        />
                        <Text>시간은 00:00:00형식으로 입력</Text>
                        <TextInput
                        style={styles.input}
                        value={addInputValue.time}
                        onChangeText={(text) => setAddInputValue(prev =>({...prev, time: text}))}
                        placeholder="시간을 입력하세요"
                        />
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.text1}>입력 완료</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.text1}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default StageAddModal;

const styles = StyleSheet.create({
    text1: {
        color: '#fff'
    },
    submitButton: {
        backgroundColor: '#753CEF',
        width: 80,
        height: 40, 
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },  
    closeButton: {
        backgroundColor: '#753CEF',
        width: 80,
        height: 40, 
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },  
    input: {
        borderRadius: 10,
        borderBottomColor: 'black',
        borderWidth: 1,
    },
    modalInner: {
        backgroundColor: '#fff',
        width: '30%',
    },

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBox: {
      width: '100%',
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
    text: {
      color:"#fff",
      fontSize:20
    },
  });
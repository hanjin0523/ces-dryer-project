import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Dimensions, Image, StyleSheet, TextInput, Modal, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios"

import config, { FRONT_URL, PORT, SERVER_IP, SERVER_PORT } from './config'
import DeleteButton from './popUpModal/DeleteModal'
import ModalInput from './popUpModal/ModifyModal'
import AddModal from "./popUpModal/AddModal";
import DetailRecipeSetting from "./DetailRecipeSetting";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RecipeCustum = () => {

    const [dryList, setDryList] = useState([]);
    const [getDryRecipe, setGetDryRecipe] = useState([]);
    const [btnActive, setBtnActive] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [delModalVisible, setDelModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [addInputValue, setAddInputValue] = useState('');
    const [startIndex, setStartIndex] = useState(0); // 추가된 상태 변수
    const [serverNum, setServerNum] = useState('');
    const [detailRecipeList, setdetailRecipeList] = useState([]);


    const handleInputSubmit = async (inputValue) => {
        try {
            // 입력값 처리 로직
            const response = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/recipeModify?inputValue=${inputValue}&recipeNum=${serverNum}`);
        
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            // 서버의 응답 처리 로직
            const responseData = await response.json();
            await fetchDryList1();
            setModalVisible(false);
            } catch (error) {
                console.error(error);
            }
    };

    const handleAddSubmit = async (addInputValue) => {
        try {
            // 입력값 처리 로직
            const response = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/recipeAdd?addInputValue=${addInputValue}`);
        
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            // 서버의 응답 처리 로직
            const responseData = await response.json();
            await fetchDryList1();
            setAddModalVisible(false);
            } catch (error) {
                console.error(error);
            }
    };

    const plusNum = () => {
        if (btnActive < dryList.length) {
            setBtnActive(btnActive + 1);
            if (btnActive - startIndex >= MAX_ITEMS) {
                setStartIndex(startIndex + 1);
            }
        }
    };
    
    const minusNum = () => {
        if (btnActive > 1) {
            setBtnActive(btnActive - 1);
            if (btnActive - startIndex <= 1) {
                setStartIndex(Math.max(0, startIndex - 1));
            }
        }
    };

    const handleDelete = () => {
        setDelModalVisible(true);
    };
    
    const handleDeleteConfirm = async() => {
        //삭제 로직 처리
        try {
            const response = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/recipeDelete?recipeNum=${serverNum}`);
        
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            // 서버의 응답 처리 로직
            const responseData = await response.json();
            setAddModalVisible(false);
            await fetchDryList1();
            } catch (error) {
                console.error(error);
            }
        console.log("삭제완료")
        setDelModalVisible(false);
    };
    
    const handleDeleteCancel = () => {
        setDelModalVisible(false);
    };

    const fetchDryList1 = async () => {
        const dryListResponse = await axios.get(`http://${SERVER_IP}:${SERVER_PORT}/dryList1`);
        setDryList(dryListResponse.data);
        setServerNum(dryListResponse.data[0][0])
    };
    useEffect(() => {
        fetchDryList1();
    }, []);

let dryListElements = [];
const MAX_ITEMS = 3;
if (dryList.length > 0) {
    dryListElements = dryList.slice(startIndex, startIndex + MAX_ITEMS).map((item, idx) => (
        <TouchableOpacity
            key={item[0]}
            style={btnActive === startIndex + idx +1 ? styles.dayBtn : styles.dayBtnAct}
            onPress={() => { setBtnActive(startIndex + idx+1); setServerNum(item[0]);}}>
            <Text style={btnActive != startIndex + idx+1 ? styles.BoxText : styles.BoxTextAct}>{item[1]}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button}
                    onPress={() => { setModalVisible(true); setBtnActive(startIndex+idx+1); setServerNum(item[0])}}>
                    <Icon name="pencil" size={17} color="#DDDDDD" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => { handleDelete(); setBtnActive(startIndex+idx+1); setServerNum(item[0]);}}>
                    <Icon name="trash-o" size={17} color="#DDDDDD" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    ));
} else {
    dryListElements.push(
        <TouchableOpacity key={"loading"}
            style={styles.dayBtn}
            disabled={true}>
            <Text style={styles.BoxText}>loading...</Text>
        </TouchableOpacity>
    );
}

if (dryList.length < 100) {
    dryListElements.push(
        <TouchableOpacity
            key="a"
            style={styles.dayBtnAdd}
            onPress={() => { setAddModalVisible(true) }}>
            <Image source={require("./assets/image/addRecipe.png")} style={{height:32, width:32}}/>
        </TouchableOpacity>
    );
}

    return(
        <View>
            <View style={{flexDirection:"row", marginLeft: width/45.430,alignItems:"center"}}>
                    <DeleteButton 
                        isvisible={delModalVisible} 
                        handleDeleteConfirm={handleDeleteConfirm} 
                        handleDeleteCancel={handleDeleteCancel} />
                    <ModalInput
                        visible={modalVisible}
                        onSubmit={handleInputSubmit}
                        onClose={() => setModalVisible(false)}/>
                    <AddModal
                        visible={addModalVisible}
                        onSubmit={handleAddSubmit}
                        onClose={() => setAddModalVisible(false)}/>
                <TouchableOpacity 
                    style={{marginRight: width/100.2926, width:30, height:30, alignItems:"center", justifyContent:"center"}}
                    onPress={minusNum}>
                    <Image 
                        source={require('./assets/image/listbtn.png')} 
                        style={styles.listbtn}
                        resizeMode="contain"/>
                </TouchableOpacity>
                        {dryListElements}
                <TouchableOpacity 
                    style={{marginLeft: -width/120 , width:30, height:30, alignItems:"center", justifyContent:"center"}}
                    onPress={plusNum}>
                    <Image 
                        source={require('./assets/image/listbtnR.png')} 
                        style={styles.listbtn1}
                        resizeMode="contain"/>
                </TouchableOpacity>
            </View> 
            <DetailRecipeSetting  props={detailRecipeList} num={serverNum} />
        </View>
    )
}

export default RecipeCustum;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '30%',
        height: '10%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#2f95dc',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    listbtn1: {
        height:height/40.8,
        width: width/70,
        position: 'absolute',
        marginLeft: 0,
        marginTop: -10,
    },
    listbtn: {
        height:height/40.8,
        width: width/70,
    },
    container: {
        padding: 10,
    },
    box: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 13,
        color:'#DDDDDD'
    },
    buttons: {
        flexDirection: 'row',
        marginRight: 0,
        marginTop: 20,
    },
    button: {
        marginLeft: 2,
        marginTop: 10,
        width: 30,
        height: 22,
        alignItems:'center',
    },
    dayBtnAct: {
        backgroundColor:"#FFFFFF",
        alignItems: "center",
        justifyContent:"center",
        padding : 0,
        height: height/8.7191,
        width: width/17.9645,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        marginRight: width/52.8301
    },
    dayBtnAdd: {
        backgroundColor:"#E9DCFC3A",
        alignItems: "center",
        justifyContent:"center",
        padding : 0,
        height: height/8.7191,
        width: width/17.9645,
        borderWidth: 1,
        borderColor: "#B5B3B9",
        borderRadius: 5,
        borderStyle: 'dashed',
        marginRight: width/52.8301,
        // position: 'absolute'
    },
    dayBtn: {
        backgroundColor:"#753CEF",
        alignItems: "center",
        justifyContent:"center",
        padding : 0,
        height: height/8.7191,
        width: width/18.0645,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        marginRight: width/52.8301,
        textAlign: 'center'
    },
    BoxText : {
        fontSize: 14.1,
        fontWeight: "bold",
        color: "#D0D0D4",
    },
    BoxTextAct : {
        fontSize: 14.1,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
}); 
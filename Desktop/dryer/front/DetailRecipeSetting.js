import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import ScrollViewIndicator from 'react-native-scroll-indicator';

import config, { FRONT_URL, PORT, SERVER_IP, SERVER_PORT } from './config';
import StageAddModal from './popUpModal/StageAddModal';



const DetailRecipeSetting = (props) => {
    const [stage, setState] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [settingTime, setSettingTime] = useState('');
    const [isActive, setIsActive] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);

    console.log(isActive,"isActive")

    const handlePress = (idx) => {
        const newIsActive = [...isActive];
        newIsActive[idx] = !newIsActive[idx];
        setIsActive(newIsActive);
    }

    useEffect(() => {
        setIsActive([]);
    },[props.num])

    const handleAddSubmit = async () => {
        try {
            // 입력값 처리 로직
            const response = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/stageAdd?addInputValue=${props.num}`);
        
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            // 서버의 응답 처리 로직
            const responseData = await response.json();
            setAddModalVisible(false);
            } catch (error) {
                console.error(error);
            }
    };

    const timeConversion =(seconds) => {
        var hour = parseInt(seconds/3600) < 10 ? '0'+ parseInt(seconds/3600) : parseInt(seconds/3600);
        var min = parseInt((seconds%3600)/60) < 10 ? '0'+ parseInt((seconds%3600)/60) : parseInt((seconds%3600)/60);
        var sec = seconds % 60 < 10 ? '0'+seconds % 60 : seconds % 60;

        return hour+":"+min+":"+sec;
    }

    const test = props.props.map((item, idx) => (
        <TouchableOpacity key={idx} style={styles.stageBtn} onPress={()=>handlePress(idx)}>
            <View style={isActive[idx] ? styles.stageBox : styles.stageBoxDis}>
                <Image source={isActive[idx] ? require('./assets/image/stageClick.png') : require('./assets/image/stageBtnDisable.png') } style={styles.stageActive}/>
                <Text style={isActive[idx] ? styles.stageText: styles.stageTextDisabled}>Stage{item[2]}</Text>
            </View>
            <View style={styles.leftBox}>
                <View style={styles.leftInnerBox}>
                    <View style={styles.tempHumBox}>
                        <Text style={isActive[idx] ? styles.tempText : styles.tempTextDisabled}>{item[3]}
                            <Text style={{fontSize:17}}>°C</Text>
                        </Text>
                        <View style={styles.divider}/>
                        <Text style={isActive[idx] ? styles.tempText1 : styles.tempText1Disabled}>{item[4]}
                            <Text style={{fontSize:17}}>%</Text>
                        </Text>
                        <View style={styles.stageTime}>
                            <Image source={require('./assets/image/stageTime.png')} style={isActive[idx] ? styles.stageTimeImg : styles.stageTimeImgDisable} />
                            <Text style={isActive[idx] ? styles.timeText : styles.timeTextDisable}>{timeConversion(item[5])}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>))

    return (
        <View style={styles.mainBox}>
            <View style={styles.secondsBox}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                    {/* <View> */}
                    {test}
                    {/* </View> */}
                </ScrollView>
            </View>
            <View style={styles.stageAddOutBox}>
                <StageAddModal visible={addModalVisible}
                        onSubmit={handleAddSubmit}
                        onClose={() => setAddModalVisible(false)}/>
                <TouchableOpacity style={styles.addBox} onPress={handleAddSubmit}>
                    <Image style={styles.stageAddBoxImg} source={require('./assets/image/stageAddBtn.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.stageSettingBtn} onPress={() => {console.log('OPERaitng')}}>
                    <Text style={styles.stageSettingBtnText}>설정완료</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
} 


export default DetailRecipeSetting;

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        minHeight: 800,
    },
    secondsBox: {
        borderColor: 'gray',
        // borderWidth: 1,
        height: '63%',
        width: '80%',
    },
    stageSettingBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16
    },
    stageSettingBtn: {
        width: '92%',
        height: '65%',
        borderRadius: 5, 
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#753CEF',
        marginLeft: 15,
    },
    stageAddBoxImg: {
        width: '92%',
        height: '100%',
        resizeMode: 'center',
    }, 
    addBox: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    stageAddOutBox: {
        width: '80%',
        height: '18%',
    },
    timeText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    timeTextDisable: {
        fontSize: 18,
        color: '#EEEFF0',
        fontWeight: 'bold',
    },  
    stageTimeImg: {
        width: '17%',
        height: '33%',
        marginRight: 5,
        marginTop: 1,
    },
    stageTimeImgDisable: {
        width: '17%',
        height: '33%',
        marginRight: 5,
        marginTop: 1,
        tintColor: '#EEEFF0',
    },
    stageTime: {
        // borderColor: 'gray',
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
    },
    tempText: {
        borderColor: '#DCDCDC',
        borderRightWidth: 1,
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        width : '28%',
        height: '100%',
        marginLeft: 5,
    },
    tempTextDisabled:{
        borderColor: '#EEEFF0',
        borderRightWidth: 1,
        color: '#EEEFF0',
        fontSize: 30,
        fontWeight: 'bold',
        width : '28%',
        height: '100%',
        marginLeft: 5,
    },
    tempText1: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        width : '28%',
        height: '100%',
        marginLeft: 5,
    },
    tempText1Disabled: {
        color: '#EEEFF0',
        fontSize: 30,
        fontWeight: 'bold',
        width : '28%',
        height: '100%',
        marginLeft: 5,
    },
    tempHumBox: {
        flexDirection: 'row',
        height: '100%',
    },
    leftInnerBox: {
        // borderColor: 'gray',
        // borderWidth: 1,
        width : '80%',
        height: '60%',
        },
    leftBox: {
        width: '77%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },  
    stageText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    stageTextDisabled: {
        color: '#E7E7EC',
        fontWeight: 'bold'
    },
    mainBox: {
        width: '100%',
        height: '74%', 
        alignItems:'center',
        marginTop: 10,
    },
    stageBtn: {
        width: '86%',
        height: '8.7%',
        borderRadius: 5, 
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 19,
        backgroundColor: 'white',
        marginTop: 5,
    },
    stageBox: {
        // borderColor: 'gray',
        // borderWidth: 1,
        width: '29%',
        height: '100%',
        backgroundColor: '#753CEF',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5, 
        borderBottomLeftRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 10,
    },  
    stageBoxDis: {
        width: '29%',
        height: '100%',
        backgroundColor: '#F5F6FA',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5, 
        borderBottomLeftRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 10,
    },
    stageActive: {
        width:'27.5%',
        height: '40.0%',
    },
})
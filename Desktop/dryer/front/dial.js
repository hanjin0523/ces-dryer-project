import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';

const RadialVariant = () => {
  
  const [speed, setSpeed] = useState(0);

  return (
    <View style={styles.container}>
      <Text>11</Text>
      <RadialSlider
        variant={'radial-circle-slider'}
        value={speed}
        valueStyle={{fontSize:100,color:"black"}}
        min={1}
        max={100}
        onChange={setSpeed}
        radius={170}
        isHideSubtitle={Boolean}
        isHideTitle={Boolean}
        unit={'°C'}
        unitStyle={{marginLeft:-5,fontWeight:"bold",marginTop:40}}
        centerContentStyle={{backgroundColor:"#FFFFFF"}}
        thumbColor={'#FF7345'}
        thumbRadius={18}
        thumbBorderWidth={8}
        sliderWidth={9}
        linearGradient ={[ { offset: '0%', color:'#FFD76F' }, 
                        { offset: '100%', color: '#FF7345' }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:300,
    marginLeft:190,
    flex: 1,
    justifyContent: 'center',
  },
});

export default RadialVariant;
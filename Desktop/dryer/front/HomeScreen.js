import * as React from 'react';
import { Button, Dimensions, View, Image } from 'react-native';
import 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EFEAFF' }}>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="test"
        />
      </View>
    );
  }
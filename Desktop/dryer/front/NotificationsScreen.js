import * as React from 'react';
import { Button, Dimensions, View, Text } from 'react-native';
import 'react-native-gesture-handler';

export default function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EFEAFF' }}>
        <Button
          onPress={() => navigation.navigate('Home')}
          title="test"
        />
      </View>
    );
  }
import * as React from 'react';
import { Button, View } from 'react-native';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CustomSidebarMenu from './front/CustomSidebarMenu';

import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
const myIcon = <Icon name="home" size={30} color="#900"/>;



function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="test"
      />

    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="testBack" />
    </View>
  );
}

function NotificationsScreen1({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="testBack" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home"
        drawerContent={( props ) => <CustomSidebarMenu {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: "#E9DCFC", 
          drawerActiveTintColor: "#763AFF",
          
        }}
        >
        <Drawer.Screen
        name="Home" 
        component={HomeScreen}
        options={{ 
          drawerLabel: 'Home',
          headerStyle: {
            backgroundColor: '#763AFF',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          drawerIcon: (({focused}) => <Icon name="home" size={25} color="#67656E" />),
          
        }}
        />
        <Drawer.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{drawerLabel: '건조기 관리',
        drawerIcon: (({focused}) => <Icon name="hard-drive" size={25} color="#67656E" />),
        }}
        
        
        />
        <Drawer.Screen 
        name="Notifications1" 
        component={NotificationsScreen1} 
        options={{drawerLabel: '프로그램 설정',
        drawerIcon: (({focused}) => <Icon1 name="stopwatch-outline" size={25} color="#67656E" />),
        }}
        
        />
        <Drawer.Screen 
        name="Notifications2" 
        component={NotificationsScreen1} 
        options={{drawerLabel: '데이터 관리',
        drawerIcon: (({focused}) => <Icon2 name="chart" size={25} color="#67656E" />),
        }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
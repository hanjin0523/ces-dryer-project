import * as React from 'react';
import { Button, Dimensions, View, Image } from 'react-native';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomSidebarMenu from './front/CustomSidebarMenu';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EFEAFF' }}>
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

  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

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
            backgroundColor: '#49319E',
            height: height / 27.375
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          drawerIcon: () => (
            <Image 
            source={require('./front/assets/image/homebtn.png')}
            style={{width:20,height:20}}
            />)
        }}
        />
        <Drawer.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{drawerLabel: '건조기 관리',
        }}
        
        
        />
        <Drawer.Screen 
        name="Notifications1" 
        component={NotificationsScreen1} 
        options={{drawerLabel: '프로그램 설정',
        }}
        
        />
        <Drawer.Screen 
        name="Notifications2" 
        component={NotificationsScreen1} 
        options={{drawerLabel: '데이터 관리',
        }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
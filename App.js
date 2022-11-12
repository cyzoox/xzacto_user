import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import SigninScreen from "./src/screens/SigninScreen";
import { AuthProvider } from "./src/context/AuthContext";
import { StoreProvider } from "./src/context/StoreContext";
import HomeScreen from "./src/screens/HomeScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import ArchiveScreen from "./src/screens/ArchiveScreen";
import ExpensesScreen from "./src/screens/ExpensesScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import CustomerScreen from "./src/screens/CustomerScreen";
import ReportScreen from "./src/screens/ReportsScreen";
import AttendanceScreen from "./src/screens/AttendanceScreen";
import { Provider as PaperProvider } from 'react-native-paper';
import { DrawerContent } from "./src/components/DrawerContent";
import TransactionScreen from "./src/screens/TransactionsScreen";
import StoreLogin from "./src/screens/StoreLoginScreen";
import { StoreSelectProvider } from "./src/context/StoreSelectContext";
import TransactionSetailsScreen from "./src/screens/TransactionDetailScreen";
import  PrinterScreen  from "./src/screens/PrinterScreen";
import ArchiveDetailsScreen from "./src/screens/ArchiveDetailScreen";
import CreditTransaction from "./src/screens/CreditTransactions";
import LoadingScreen from "./src/screens/LoadingScreen";
import CreditTransactionSetailsScreen from "./src/screens/CreditTransactionDetailScreen";
import ReturnScreen from "./src/screens/ReturnScreen";
import ZReadReport from "./src/screens/ZReadReport";

import Fastfood from "./src/screens/FastfoodScreen";
import HomeScreenII from "./src/screens/HomeScreenII";
import SignupScreen from "./src/screens/SignupScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function DrawerScreen2() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props}/>}>
    
    <Drawer.Screen name="Home" component={Fastfood} />
    <Drawer.Screen name="Checkout" component={CheckoutScreen} />
    <Drawer.Screen name="Archive" component={Archives} />
    <Drawer.Screen name="Expenses" component={ExpensesScreen} />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="Customer" component={CustomerScreen} />
    <Drawer.Screen name="Transactions" component={Transactions} />
    <Drawer.Screen name="ZReadReport" component={ZReadReport} />
    <Drawer.Screen name="Attendance" component={AttendanceScreen} />
    <Drawer.Screen name="Credits" component={Credits} />
    <Drawer.Screen name="Return" component={ReturnScreen} />
  </Drawer.Navigator>
  );
}

function DrawerScreen() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props}/>}>
    
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Checkout" component={CheckoutScreen} />
    <Drawer.Screen name="Archive" component={Archives} />
    <Drawer.Screen name="Expenses" component={ExpensesScreen} />
    <Drawer.Screen name="Settings" component={Settings} />
    <Drawer.Screen name="Customer" component={CustomerScreen} />
    <Drawer.Screen name="Transactions" component={Transactions} />
    <Drawer.Screen name="ZReadReport" component={ZReadReport} />
    <Drawer.Screen name="Attendance" component={AttendanceScreen} />
    <Drawer.Screen name="Credits" component={Credits} />
    <Drawer.Screen name="Return" component={ReturnScreen} />
  </Drawer.Navigator>
  );
}

function Settings() {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="SettingScreen"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Printer"
          component={PrinterScreen}
          options={{headerShown: false}}
        />
  </Stack.Navigator>
  );
}


function Credits() {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="Credit"
          component={CreditTransaction}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="CreditTransactionDetailsScreen"
          component={CreditTransactionSetailsScreen}
          options={{headerShown: false}}
        />
  </Stack.Navigator>
  );
}


function Transactions() {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="TransactionScreen"
          component={TransactionScreen}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="TransactionDetailsScreen"
          component={TransactionSetailsScreen}
          options={{headerShown: false}}
        />
  </Stack.Navigator>
  );
}

function Archives() {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="Archive"
          component={ArchiveScreen}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="ArchiveInfo"
          component={ArchiveDetailsScreen}
          options={{headerShown: false}}
        />
  </Stack.Navigator>
  );
}

function StoreSelected() {
  return (
    <Stack.Navigator>
      <Stack.Screen
          name="StoreLogin"
          component={StoreLogin}
          options={{headerShown: false}}
        />
  </Stack.Navigator>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <PaperProvider>
        
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SigninScreen"
            component={SigninScreen}
            options={{headerShown: false}}
          />
         <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{headerShown: false}}
          />
       <Stack.Screen
            name="StoreSelect"
            options={{headerShown: false}}
          >
        {(props) => {
              const { navigation, route } = props;
              const { user, projectPartition } = route.params;
            return(
              <StoreSelectProvider user={user} projectPartition={projectPartition}>
                <StoreSelected navigation={navigation} route={route}/>
              </StoreSelectProvider>
              );
            }
            }
        </Stack.Screen>
          <Stack.Screen name="Dashboard" options={{headerShown: false}}>
          {(props) => {
              const { navigation, route } = props;
              const { user, projectPartition, store_info } = route.params;
            return(
              <StoreProvider user={user} projectPartition={projectPartition} store_info={store_info}>
              <DrawerScreen store_info={store_info} navigation={navigation} route={route} />
            </StoreProvider>
              );
            }
            }
          </Stack.Screen>
       
          </Stack.Navigator>
      </NavigationContainer>

      </PaperProvider>
    </AuthProvider>
  );
};

export default App;

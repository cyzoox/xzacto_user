import React, { useEffect, useState, useCallback } from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, TouchableWithoutFeedback , Dimensions, RefreshControl} from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";
import { ListItem, Avatar, Overlay , Button} from "react-native-elements";
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { useAuth } from "../context/AuthContext";
import { useStoreSelect } from "../context/StoreSelectContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import CurrencyPicker from "react-native-currency-picker"
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { FlatGrid } from 'react-native-super-grid';
import Feather from 'react-native-vector-icons/Feather'
import FastImage from 'react-native-fast-image'
const windowWidth = Dimensions.get('window').width;
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const StoreLogin = ({navigation}) => {
  
let currencyPickerRef = undefined;

  const {
      store,
      projectPartition, 
      loading,
      getCustomStore
  } = useStoreSelect();

    const [selectedLanguage, setSelectedLanguage] = useState();
    const [visible, setVisible] = useState(false);
    const [code, setCode] = useState('');
    const [info, setInfo] = useState([]);
    const [error, setError] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [alert, setAlert] = useState(false);
    const [text, setText] = useState('');
    const hasUnsavedChanges = Boolean(text);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      getCustomStore()
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const [demo, setDemo] = useState([]);

    const readItemFromStorage = async () => {
        const item =  await AsyncStorage.getItem('@store')
        const currency =  await AsyncStorage.getItem('@currency')
        if(item != null && currency != null){
       
            navigation.navigate("Dashboard", {
              name: "My Project",
              projectPartition: projectPartition ,
              store_info : JSON.parse(item),
              currency : JSON.parse(currency)
            });
        
          }
      };

      useEffect(
        () =>
         {  navigation.addListener('beforeRemove', (e) => {
          e.preventDefault();
          return
      })    
      readItemFromStorage();
          },
        [navigation, hasUnsavedChanges]
      );

    

    const onClickStore = (item) => {
        setVisible(true)
        setInfo(item)
    }



    const onCheckPassword = async() => {
      
        if(info.password === code){
            let infos = {
                _id : info._id,
                _partition: info._partition,
                branch: info.branch,
                name: info.name,
                owner: info.owner,
                password: info.password,
                attendant: info.attendant,
                attendant_id: info.attendant_id,
                store_type: info.store_type
            }
            
         

              const storeValue = JSON.stringify(infos)
              const currencyValue = JSON.stringify(currency)

              await AsyncStorage.setItem('@store', storeValue)
              await AsyncStorage.setItem('@currency', currencyValue)

              setVisible(false)

                navigation.navigate("Dashboard", {
                  name: "My Project",
                  projectPartition: projectPartition ,
                  store_info : JSON.parse(storeValue),
                  currency : JSON.parse(currencyValue)
                });
           
             

            
      
        }else{
            setCode('')
            setError('Incorrect password, please try again!')
        }
    }

    const renderItem = ({ item }) => (
     {/*   <ListItem bottomDivider underlayColor="gray" containerStyle={{ margin: 5, borderRadius: 5}} onPress={()=> onClickStore(item)}>
          <Avatar title={item.name[0]} source={'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' && { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }}/>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.branch}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
    </ListItem> */}
   
      )

     const onCancel = () => {
        setAlert(false)
      }

  return (
    <View style={styles.Container}>
       <Loader loading={loading}/>
        <Alert visible={alert} onCancel={onCancel} onProceed={onCancel} title="No currency selected." content="Please select currency." confirmTitle="OK"/>
         <AppHeader 
            centerText="Select Store"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
                </TouchableOpacity>
            } 
        
        />
          <FlatGrid
      itemDimension={100}
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
      }
      data={store}
      // staticDimension={300}
      // fixed
      style={{marginBottom: 50}}
      keyExtractor={item => item._id}
      spacing={10}
      renderItem={({ item }) => (
     
        <TouchableWithoutFeedback onPress={()=> onClickStore(item)} >
       <View style={styles.itemContainer}>
        <View >
        <FastImage
         style={styles.stretch}
        source={require('../../assets/shop2.png')}
        resizeMode={FastImage.resizeMode.stretch}
    />  
        </View>
      
       
          <View style={{marginBottom: 10}}>
           
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemName}>{item.store_type}</Text>
          </View>
      </View>
  </TouchableWithoutFeedback>
      )}
    />
        <Overlay isVisible={visible} onBackdropPress={setVisible}>
            <Text style={{textAlign:'center', fontSize: 18, fontWeight:'bold', marginVertical: 10}}>Enter Password</Text>
            <View style={{padding: 20}}>
            <SmoothPinCodeInput password mask="﹡"
              cellStyle={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 15
              }}
              cellSize={45}
            codeLength={6}
            value={code}
            onTextChange={code => setCode(code)}/>
            <Button  title="Login" buttonStyle={{marginVertical: 10, backgroundColor: colors.accent, borderRadius: 10, marginTop: 30}} onPress={()=> onCheckPassword()}/>
            {
                error &&
                <Text style={{textAlign:'center', color: colors.red}}>{error}</Text>
            }
            </View>
        </Overlay>
        
  </View>
  );
};

const styles = StyleSheet.create({
    Container: {
    flex: 1
  },
  stretch: {
    width: windowWidth /3.2 - 40,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }, itemContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 5,
    backgroundColor: colors.white, 
    flexDirection: 'column',
    borderRadius: 15,
    shadowColor: "#EBECF0",
    shadowOffset: {
      width: 0,
      height: 5,
     
    },
    shadowOpacity: 0.89,
    shadowRadius: 2,
    elevation: 5,
 
  },
  itemName: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    textAlign:'center'
  },
});

export default StoreLogin;

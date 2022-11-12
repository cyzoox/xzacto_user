import React,{useState} from 'react';
import { TouchableOpacity, ImageBackground,StyleSheet, View, Text, Dimensions, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { Button, Input, Overlay } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import colors from '../themes/colors';
import moment from 'moment'
import formatMoney from 'accounting-js/lib/formatMoney.js'
import { Categories } from './Categories';
import { SimpleStepper } from 'react-native-simple-stepper';
import Alert from './Alert'
import uuid from 'react-native-uuid';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { TextInput } from 'react-native-paper';
import SearchBar from './SearchBar';
import Feather from 'react-native-vector-icons/Feather'
import FastImage from 'react-native-fast-image'
import ProductCard from './ProductCard';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const KEYS_TO_FILTERS = ['name', 'category'];
import Modal from 'react-native-modal';
import List from './List';
import SubAlert from './SubAlert';
import AlertwithChild from './AlertwithChild';
import Spacer from './Spacer';
import BigList from "react-native-big-list";
import { useCallback } from 'react';

export default function Products({ navigation, search,toggleSearch}) {
  const { user } = useAuth();

  const { 
  
    stores,

    products,

    createList,
    list,
 
    store_info,
    archiveInfo,
    onSaveList,
     products_list
   } = useStore();
    const [overlay, overlayVisible] = useState(false);
    const [item, setItems] = useState([]);
    const [term, setTerm] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [alerts, alertVisible] = useState(false);
    const [alerts2, alertVisible2] = useState(false);
 

  

  
   
    const setVariables = (itemss) => {
      setItems(itemss);
      if(stores[0].attendant === ""){
          alertVisible(true);
          setItems([]);
          return;
      }
      if(itemss.unit === 'Kilo'|| itemss.unit === 'Gram'){
        overlayVisible(true)
        return;
      }
        onSaveList(itemss)
    }

  
    const onCancelAlert = () => {
      alertVisible(false)
    }
    

    const onSaveList2 = () => {
    
      let list = {
        partition: `project=${user.id}`,
        id: item._id,
        name: item.name,
        brand: item.brand,
        oprice: item.oprice,
        sprice: item.sprice,
        unit: item.unit,
        category: item.category,
        store_id: store_info._id,
        store: item.store,
        quantity: parseFloat(quantity),
        uid: item.uid,
        timeStamp: moment().unix(),
    }

    createList(list, item)
    overlayVisible(false)
    }

    const calculateTotal = () => {
      let total = 0;
      products_list.forEach(list => {
              total += list.quantity * list.sprice  
      });
     return total;
    }
    
    const calculateQty = () => {
    let total = 0;
    products_list.forEach(list => {
            total += list.quantity  
    });
    return total;
    }
    

    const filteredProducts = products.filter(createFilter(term, KEYS_TO_FILTERS))

    const onTabChange = (sterm) => {
      setTerm(sterm)
    }

    const handleInput = () => {
      if(isNaN(quantity) || quantity === '.' || quantity === ',' || quantity === 0 || quantity < 0){
        alertVisible2(true)
        return;
      }

      onSaveList2()
    }
   

    const onSaveLists = (item) => {
      let list = {
        _partition: `project=${user.id}`,
        _id: item._id,
        name: item.name,
        brand: item.brand,
        oprice: item.oprice,
        sprice: item.sprice,
        unit: item.unit,
        category: item.category,
        store_id: store_info._id,
        store: item.store,
        quantity: 1,
        uid: item.pr_id,
        timeStamp: moment().unix(),
      }
      onSaveList(list, user, store_info)
    }




     const _renderitem = ({item}) => 
      <TouchableWithoutFeedback onPress={()=> onSaveLists(item)} >
      <View style={styles.itemContainer}>
       <View >
       <FastImage
              style={styles.stretch}
             source={item.img === null || item.img === '' ? require('../../assets/noproduct.png') :{
                 uri:  item.img,
                 headers: { Authorization: 'auth-token' },
                 priority: FastImage.priority.normal,
             }}
             resizeMode={FastImage.resizeMode.stretch}
         />  
  {
   item.stock <= 0 ?
   <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
       <Text style={{color: colors.red, fontWeight:'bold'}}>Out of Stock</Text>
     </View>
    : null}
     
     </View>
         <View>
           <Text style={{fontSize: 14, color: colors.primary, fontWeight: '500',textAlign:'center'}}>{formatMoney(item.sprice, { symbol: "₱", precision: 2 })}</Text>
           <Text style={styles.itemName}>{item.name}</Text>
           <Text style={{color: 'gray',textAlign:'center', fontSize: 13}}>{Math.round(item.stock * 100) / 100} {item.unit}</Text>
         </View>
         
         {
            products_list.map((items) => {
              
              return(items._id === item._id && 
                <View style={{position: 'absolute', top: 5,  right: 5, bottom: 0,color: colors.white, backgroundColor: colors.accent, height: 35, width: 35, borderRadius: 25, justifyContent:'center'}}>
                  <Text style={{ fontWeight:'bold', textAlign:'center', color: colors.white}}>{items.quantity}</Text>
                </View>
              )
            
            })
           
           }
     </View>
  
 </TouchableWithoutFeedback>
 
  

     const onCancel = () => {
            alertVisible2(!alerts2)
          }
 
  return (
    <View style={{flex: 1}}>
      <Alert visible={alerts} onCancel={onCancelAlert} onProceed={onCancelAlert} title="No Logged In Attendant" content="Please logged in first before you proceed." confirmTitle="OK"/>
    
       <Alert visible={alerts2} onCancel={onCancel} onProceed={onCancel} title="Invalid Input" content="Input must be a number." confirmTitle="OK"/>
       <Alert visible={alerts2} onCancel={onCancel} onProceed={onCancel} title="Invalid INput" content="Input value must be equal or lesser than the number of stocks." confirmTitle="OK"/>
       {
          search &&
          <SearchBar 
          term={term} 
          onTermChange={setTerm}
          >
          <TouchableOpacity style={styles.iconStyle} onPress={()=> toggleSearch(false)}>
          <Feather  name={'x-circle'} size={20} color={colors.black}/>
          </TouchableOpacity>
        </SearchBar>
        }
    <Categories  onTabChange={onTabChange}/>
    <BigList
      data={filteredProducts}
      numColumns={3} // Set the number of columns
      renderItem={_renderitem}
      keyExtractor={item => item._id}
      itemHeight={200}
      headerHeight={90}
      footerHeight={100}
    />
 
   
   
  
    <Overlay overlayStyle={{ width: "80%", borderRadius: 10, padding: 20 }} isVisible={overlay} onBackdropPress={overlayVisible}>
      <Text style={{textAlign:'center', fontSize: 20, fontWeight:'bold'}}>Quantity of {item.name} </Text>
        <View style={{marginHorizontal: 20}}>
            <TextInput 
              mode="outlined"
              onChangeText={(text)=> setQuantity(text)}
              keyboardType="decimal-pad"
              defaultValue='1'
              style={{margin: 20, textAlign:'center', marginHorizontal: 70}}
              theme={{colors: {primary: colors.accent, underlineColor: 'transparent'}}}
            />
        </View>
        <View style={{ margin: 5, flexDirection:'row', justifyContent:'space-between'}}>
        <Button buttonStyle={{backgroundColor: colors.red, borderRadius: 5, paddingHorizontal:20}} title="  Cancel  " onPress={()=> overlayVisible(false)}/>
          <Button buttonStyle={{backgroundColor: colors.accent, borderRadius: 5, paddingHorizontal:20}} title="  Save  " onPress={()=> handleInput()}/>
          </View>
     
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
       {/* <View style={{flex: 2,  margin: 5}}>
          <Button buttonStyle={{backgroundColor: colors.red}} title="Add B.O" onPress={()=> onCreateBO()}/>
          </View>
          <View style={{flex: 2,  margin: 5}}>
          <Button buttonStyle={{backgroundColor: colors.red}} title="Add to Return" onPress={()=> onCreateReturn()}/>
          </View>*/}
              </View>
        
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({

  itemContainer: {
    flex:1,
    marginTop: 5,
    marginHorizontal: 5,
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
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  stretch: {
    width: windowWidth /3 - 13,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  iconStyle: {
    fontSize: 25,
    alignSelf: 'center',
    marginHorizontal: 15,
},
text: {
  fontSize: 30
},
iconStyle: {
  fontSize: 25,
  alignSelf: 'center',
  marginHorizontal: 15,
},
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
},
modalView: {
margin: 0,
justifyContent: 'flex-end'
},
containerStyle: {
flex: 1,
flexDirection: 'row',
justifyContent: 'space-around',
 alignItems: 'flex-end'
},
content: {
width: '100%',
height: '50%',
backgroundColor: 'white',
overflow: 'hidden',
},
bottomView: {
flex: 1,
width: '100%',
height: 50,
justifyContent: 'center',
alignItems: 'center',
position: 'absolute', //Here is the trick
bottom: 0, //Here is the trick
borderTopColor: colors.primary,
borderWidth: 1
},
discountButton: {paddingVertical: 4,paddingHorizontal: 10, borderWidth: 1, borderColor: colors.accent, borderRadius: 10},
discountButton2: {paddingVertical: 4,paddingHorizontal: 10, borderWidth: 1, borderColor: colors.primary, borderRadius: 10, backgroundColor: colors.primary}
});
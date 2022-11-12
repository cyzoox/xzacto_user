import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Picker, Dimensions, ScrollView } from "react-native";
import AppHeader from "../components/AppHeader";
import Spacer from "../components/Spacer";
import { ModalInputForm } from "../components/ModalInputForm";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import colors from "../themes/colors";
import { ListItem, Avatar, Overlay, Button } from 'react-native-elements'
import { useStore } from "../context/StoreContext";
import FilterModal from "../components/FilterModal";
import moment from 'moment'
import { Card } from "react-native-paper";
import formatMoney from 'accounting-js/lib/formatMoney.js'
import DataTable from "../components/DataTable";
import { Grid, Col, Row } from "react-native-easy-grid";
import { theme } from "../constants";
import SearchInput, { createFilter } from 'react-native-search-filter';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Feather from 'react-native-vector-icons/Feather'
import Alert from "../components/Alert";

const KEYS_TO_FILTERS = ['status'];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');
const TransactionScreen = ({navigation}) => {
    const { 
        createStore,
        deleteTask,
        stores,
        loading,
        createProducts,
        products,
        createCategories,
        category,
        createExpenses,
        expenses,
        createCustomer,
        customers,
        createStaff,
        staffs,
        createList,
        list,
        deleteList,
        editListQty,
        createTransaction,
        transactions,
        getCustomTransaction,
        onVoidTransaction, store_info } = useStore();
      
        const [selectedValue, setselectedValue] = useState('Today');
        const [visible, setVisible] = useState(false);
        const [selectedstaff, setSelectedStaff] = useState('');
        const [p_Visible, setPVisible] = useState(false);
        const [active, setActive] = useState('');
        const [term, setTerm] = useState('Completed');
        const [selected,setSelected] = useState(0)
        const [attendant, setAttendant] = useState('');
        const [attendant_info, setAttendantInfo] = useState([]);
        const filteredProducts = transactions.filter(createFilter('Completed', KEYS_TO_FILTERS))
        const [alerts, alertVisible] = useState(false)
        const [items, setItem] = useState([]);
        const filteredVoidedProducts = transactions.filter(createFilter('Voided', KEYS_TO_FILTERS))
      

        useEffect(() => {
          let date = moment().unix()
          let today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
          getCustomTransaction('Today', {date : today}, store_info.attendant_id)
        },[]);

        const togglePOverlay = () => {
          setPVisible(!p_Visible);
        };

        const toggleOverlay = () => {
          setVisible(!visible);
        };
        
        
       
        
        const onSelectPersonnel = (item) => {
          setSelectedStaff(item)
          getFilteredTransactions(selectedValue)
          togglePOverlay()
        }



const getFilteredTransactions=(filter)=>{

  setselectedValue(filter)
  toggleOverlay()
  let date = moment().unix()
  let today =  `${moment.unix(date).format('MMMM DD, YYYY')}`;
  let yesterday = `${moment.unix(date).subtract(1, 'day').format('MMMM DD, YYYY')}`;
  let thisweek = moment.unix(date).format('WW-YYYY');
  let lastweek = `${moment.unix(date).format('ww')-1}`;
  let thismonth = `${moment.unix(date).format('MMMM YYYY')}`;
  let lastmonth = `${moment.unix(date).subtract(1, 'month').format('MMMM YYYY')}`;
  let thisyear = `${moment.unix(date).format('YYYY')}`;
  let lastyear = `${moment.unix(date).subtract(1, 'year').format('YYYY')}`;
  let lastdays = `${moment.unix(date).subtract(30, 'day').startOf('day')/ 1000}`;
  let endwith = `${moment.unix(date)/1000}`;

  switch(filter) {

    case 'Today':
      getCustomTransaction('Today', {date : today}, attendant_info._id)
      break;
      case 'This week':
        getCustomTransaction('This week', {date: thisweek}, attendant_info._id)
      break;

    default:
      getCustomTransaction('Today', {date: today})
      break;
  
    }

}

const calculateCompletedTotal = () => {
  let total=0;

  filteredProducts.forEach(item => {
    total += item.total;
  });

  return total;
}

const calculateVoidedTotal = () => {
  let total=0;

  filteredVoidedProducts.forEach(item => {
    total += item.total;
  });

  return total;
}

   const keyExtractor = (item, index) => index.toString()

  

   const renderView = () => {
     if(selected===0){
       return(
        <DataTable
        total={calculateCompletedTotal()}
        headerTitles={['Time','Date', 'Type', 'Receipt', 'Discount', 'Amount', 'Action','View']}
        alignment="center"
      >
        <FlatList
          keyExtractor={keyExtractor}
          data={filteredProducts}
          style={{marginTop: 10, borderRadius:5}}
          renderItem={renderItem}
          />
        </DataTable>
       )
     }
     if(selected===1){
      return(
       <DataTable
       total={calculateVoidedTotal()}
       headerTitles={['Time','Date', 'Type', 'Receipt', 'Discount', 'Amount','View']}
       alignment="center"
     >
       <FlatList
         keyExtractor={keyExtractor}
         data={filteredVoidedProducts}
         style={{marginTop: 10, borderRadius:5}}
         renderItem={renderVoid}
         />
       </DataTable>
      )
    }
   }

   const renderItem = ({ item }) => (
    <Grid>
      <Row style={{height: 30,  backgroundColor: colors.white}}>
                  <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                      <Text  style={styles.textColor}>{moment.unix(item.timeStamp).format("hh:mm A")}</Text>
                  </Col>    
                  <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                      <Text  style={styles.textColor}>{moment(item.date, 'MMMM DD, YYYY').format("DD MMM YYYY")}</Text>
                  </Col>  
                  <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                      <Text  style={styles.textColor}>{item.payment_method}</Text>
                  </Col>   
                  <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                      <Text  style={styles.textColor}>{item.timeStamp}</Text>
                  </Col>
                  <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                      <Text  style={styles.textColor}>{formatMoney(item.discount, { symbol: "₱", precision: 2 })}</Text>
                  </Col>
                  <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                      <Text  style={styles.textColor}>{formatMoney(item.total, { symbol: "₱", precision: 2 })}</Text>
                  </Col>
                  <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                      <TouchableOpacity style={styles.voidStyle} onPress={()=> {setItem(item), alertVisible(true)}}>
                          <Text style={{color: colors.white, fontSize: 11}}>VOID</Text>
                      </TouchableOpacity>
                  </Col>
                  <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                      <TouchableOpacity style={styles.voidStyle} onPress={()=> navigation.navigate('TransactionDetailsScreen',{transactions:item})}>
                          <Text style={{color: colors.white, fontSize: 11}}>View</Text>
                      </TouchableOpacity>
                  </Col> 
      </Row>
    </Grid>   
      )

      const renderVoid = ({ item }) => (
        <Grid>
          <Row style={{height: 30,  backgroundColor: colors.white}}>
                      <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                          <Text  style={styles.textColor}>{moment.unix(item.timeStamp).format("hh:mm A")}</Text>
                      </Col>    
                      <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                          <Text  style={styles.textColor}>{moment(item.date, 'MMMM DD, YYYY').format("DD MMM YYYY")}</Text>
                      </Col>  
                      <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                          <Text  style={styles.textColor}>{item.payment_method}</Text>
                      </Col>   
                      <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                          <Text  style={styles.textColor}>{item.timeStamp}</Text>
                      </Col>
                      <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                          <Text  style={styles.textColor}>{formatMoney(item.discount, { symbol: "₱", precision: 2 })}</Text>
                      </Col>
                      <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                          <Text  style={styles.textColor}>{formatMoney(item.total, { symbol: "₱", precision: 2 })}</Text>
                      </Col>
                      <Col style={[styles.ColStyle,{alignItems: 'center'}]}>
                      <TouchableOpacity style={styles.voidStyle} onPress={()=> navigation.navigate('TransactionDetailsScreen',{transactions:item})}>
                          <Text style={{color: colors.white, fontSize: 11}}>View</Text>
                      </TouchableOpacity>
                  </Col> 
          </Row>
        </Grid>   
          )

  const onCancelAlert = () => {
    alertVisible(false)
  }
  return (
      <View style={{flex: 1}}>
         <Alert visible={alerts} onCancel={onCancelAlert} onProceed={()=>{ onVoidTransaction(items),alertVisible(false)}} title="Void Transaction?" content="Are you sure you want to void this transaction?" confirmTitle="OK"/>
        <View style={{flex: 1}}>
          <AppHeader 
            centerText="Transactions"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={35} color={colors.white}/>
                </TouchableOpacity>
            } 
          />
          {/*
  <Card style={styles.upperContainer}>
              <Text style={{textAlign:'center', color:colors.primary}}>{selectedValue} - {selectedstaff.name}</Text>
            </Card>
          */}
          <View style={{justifyContent:'center', alignItems:'center'}}>
          <TouchableOpacity style={styles.filterStyle}>
          <ModalInputForm
                displayComponent={
                    <View style={{flexDirection:"row"}}>
                       <Feather style={{textAlign:'center',paddingRight: 10}} name={'users'} size={20} color={colors.black}/>
                        <Text style={{paddingLeft:10, borderLeftWidth: 1,color: colors.black,  fontWeight:'700'}}>{attendant.length === 0 ? "Select Attendant": attendant}</Text>
                    </View>
                }
                title="Select Attendant"
                onSave={()=> getFilteredTransactions('Today')}
              >
                <ScrollView>
                  {
                    staffs.map((item, index) => 
                    item.status === 'Active' &&
                      <TouchableOpacity style={item.name === attendant ? [styles.storeList,{ borderColor:colors.accent}] : styles.storeList} onPress={()=> {setAttendant(item.name), setAttendantInfo(item)}}>
                        <Text style={{textAlign: 'center', fontWeight:'700', fontSize: 17, textTransform:'uppercase'}}>{item.name}</Text>
                     </TouchableOpacity>
                    )
                  }
                </ScrollView>
              </ModalInputForm>
              </TouchableOpacity>
          </View>
          <SegmentedControl
                style={{marginTop:10, backgroundColor: colors.boldGrey, marginHorizontal: 10}}
                values={[ 'Completed', 'Voided']}
                selectedIndex={selected}
                onChange={(event) => {
                setSelected(event.nativeEvent.selectedSegmentIndex)
                }}
            />
            {
              renderView()
            }
           
           
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              <View style={{padding : 10,justifyContent:'center'}}>
                  <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                   
                    <TouchableOpacity onPress={toggleOverlay}>
                      <Ionicons name={'close-circle'} size={26} color={colors.red}/>
                    </TouchableOpacity>
                    <Text style={{textAlign:'center', fontSize: 20, fontWeight:'bold'}}>Select Filter</Text>
                    <View/>
                  </View>
                  <Spacer />
                  <Button 
                      title="Today" 
                      onPress={ ()=> getFilteredTransactions('Today')} 
                      buttonStyle={{
                        paddingHorizontal: windowWidth/ 4, 
                        borderRadius: 10, 
                        backgroundColor: colors.white, 
                        borderColor: colors.accent, 
                        borderWidth: 1
                        }}
            titleStyle={{color: colors.black, fontSize: 18, fontWeight:'600'}}
                  />
                  <Spacer />
                  <Button 
                      title="This week" 
                      onPress={()=>getFilteredTransactions('This week')}
                      buttonStyle={{
                        paddingHorizontal: windowWidth/ 4, 
                        borderRadius: 10, 
                        backgroundColor: colors.white, 
                        borderColor: colors.accent, 
                        borderWidth: 1
                        }}
                      titleStyle={{color: colors.black, fontSize: 18, fontWeight:'600'}}
                />
              </View>
            </Overlay>

            <Overlay isVisible={p_Visible} onBackdropPress={togglePOverlay}>
              <View style={{padding : 10,justifyContent:'center'}}>
                  <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                
                    <TouchableOpacity onPress={togglePOverlay}>
                      <Ionicons name={'close-circle'} size={26} color={colors.red}/>
                    </TouchableOpacity>
                    <Text style={{textAlign:'center', fontSize: 20, fontWeight:'bold'}}>Select Personnel</Text>
                    <View/>
                  </View>
                  <Spacer/>
                  {
                    staffs.map((item, key) => {
                      return(
                        <View>
                          <Button 
                            title={item.name} 
                            onPress={ ()=> onSelectPersonnel(item)} 
                            buttonStyle={{
                                        paddingHorizontal: windowWidth/ 4, 
                                        borderRadius: 10, 
                                        backgroundColor: colors.white, 
                                        borderColor: colors.primary, 
                                        borderWidth: 1
                                        }}
                            titleStyle={{color: colors.red, fontSize: 18, fontWeight:'600'}}
                            />
                          <Spacer/>
                        </View>
                        
                      )
                    })
                  }
                  
          
              </View>
            </Overlay>
            </View>
      
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  textColor: {
    fontSize: 12,
    color: colors.black,
    fontWeight:'600',
    textAlign:'center'
  },
  ColStyle: {
      width: windowWidth / 4.5 - 2,
      justifyContent: 'center',
      paddingBottom: 5,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.charcoalGrey
  },
voidStyle: {
            marginTop: 3,
            backgroundColor: colors.accent, 
            paddingHorizontal: 8, 
            paddingVertical: 1.5, 
            borderRadius: 10,
            shadowColor: "#EBECF0",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.10,
            shadowRadius: 2,
            elevation: 2,
          },
          header: {
            paddingHorizontal: theme.sizes.base * 2,
          },
          avatar: {
            height: theme.sizes.base * 2.2,
            width: theme.sizes.base * 2.2,
          },
          tabs: {
            paddingVertical: 5,
            paddingHorizontal: theme.sizes.base,
            justifyContent: 'center',
            alignItems:'center'
          },
          content: {
            borderBottomColor: theme.colors.gray2,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: theme.sizes.base,
            marginHorizontal: theme.sizes.base * 2,
          },
          tab: {
            flex: 1,
            marginRight: theme.sizes.base * 2,
            paddingVertical: 5,
            paddingHorizontal: 15,   
            borderWidth: 2,
            borderColor: colors.accent,
            borderRadius: 8,
            width: '100%'
          },
          active: {
            backgroundColor: colors.accent,
            paddingVertical: 7,
            paddingHorizontal: 15,    
            borderRadius: 8
          },
          categories: {
            flexWrap: 'wrap',
            paddingHorizontal: theme.sizes.base,
            marginBottom: theme.sizes.base * 3.5,
          },
          category: {
            // this should be dynamic based on screen width
            minWidth: (width - (theme.sizes.padding * 5.5) - theme.sizes.base) / 2,
            maxWidth: (width - (theme.sizes.padding * 5.5) - theme.sizes.base) / 2,
            maxHeight: (width - (theme.sizes.padding * 5.5) - theme.sizes.base) / 2,
          },
          imageThumbnail: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 120,
            width: width / 3.5,
            backgroundColor: 'gray',
          },
          MainContainer: {
            paddingLeft: 10,
            paddingRight:10,
            paddingBottom:10,
          },
          footer: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            overflow: 'visible',
            alignItems: 'center',
            justifyContent: 'center',
            height: height * 0.1,
            width,
            paddingBottom: theme.sizes.base * 4,
          },
          upperContainer: {
          paddingVertical: 10, 
          justifyContent:'center', 
          backgroundColor: colors.white,
           marginHorizontal: 10,
           shadowColor: "#EBECF0",
          shadowOffset: {
            width: 0,
            height: 5,
            
          },
          shadowOpacity: 0.89,
          shadowRadius: 2,
          elevation: 5,},
          filterStyle: {
            backgroundColor:colors.white, 
            paddingVertical: 9, 
            width: '45%',
            borderRadius: 5,
            shadowColor: "#EBECF0",
            shadowOffset: {
              width: 0,
              height: 5,
             
            },
            shadowOpacity: 0.89,
            shadowRadius: 2,
            elevation: 5,
            borderColor: colors.white,
            borderWidth:  1
          },
          storeList: {
            flex: 1,
            borderColor: colors.boldGrey,
            borderWidth: 1,
            paddingVertical: 8,
            marginVertical: 5,
            borderRadius: 5,
            backgroundColor: colors.white,
            shadowColor: "#EBECF0",
            shadowOffset: {
              width: 0,
              height: 2,
             
            },
            shadowOpacity: 0.89,
            shadowRadius: 2,
            elevation: 2,
          }

});

export default TransactionScreen;

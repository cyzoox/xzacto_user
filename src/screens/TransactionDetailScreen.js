import React, { useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity,FlatList } from "react-native";
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from "../themes/colors";
import { ListItem, Card } from 'react-native-elements'
import { useStore } from "../context/StoreContext";
import formatMoney from 'accounting-js/lib/formatMoney.js'
import {BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter} from "react-native-bluetooth-escpos-printer";

import moment from 'moment'
const TransactionSetailsScreen = ({navigation, route}) => {
const { transactions } = route.params;
const {getTRDetails,trdetails, store_info } = useStore();

const printReceipt = async () => {
  try {
      await BluetoothEscposPrinter.printerInit();
      await BluetoothEscposPrinter.printerLeftSpace(0);

      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      await BluetoothEscposPrinter.setBlob(0);
      await  BluetoothEscposPrinter.printText(`${store_info.name}\r\n`, {
          encoding: 'CP437',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 1,
          fonttype: 2
      });
      await BluetoothEscposPrinter.setBlob(0);
      await  BluetoothEscposPrinter.printText(`${store_info.branch}\r\n\r\n`, {
          encoding: 'CP437',
          codepage: 0,
          widthtimes: 1,
          heigthtimes: 0,
          fonttype: 2
      });
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
      await  BluetoothEscposPrinter.printText(`Receipt No :        ${transactions.timeStamp} \r\n`,  {
        encoding: 'CP437',
        codepage: 15,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
    });
      await  BluetoothEscposPrinter.printText("Date / Time :       " + `${moment.unix(transactions.timeStamp).format('DD MMM YYYY hh:mmA')}` + "\r\n",{
        encoding: 'CP437',
        codepage: 15,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
    });
      await  BluetoothEscposPrinter.printText(`Attendant :         ${transactions.attendant_name}\r\n`,  {
        encoding: 'CP437',
        codepage: 15,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1
    });
    await  BluetoothEscposPrinter.printText("--------------------------------", {});
      let columnWidths = [35,8];
      await BluetoothEscposPrinter.printColumn(columnWidths,
          [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
          ["Description", "Amount"], {
            encoding: 'CP437',
            codepage: 15,
            widthtimes: 0,
            heigthtimes: 0,
            fonttype: 1
          });
        trdetails.map(async(item,index) => {
          await BluetoothEscposPrinter.printColumn(columnWidths,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
            [`${item.name} - ${item.brand} ${item.quantity}x${formatMoney(item.sprice, { symbol: "₱", precision: 2 })}   `, `${formatMoney(item.quantity*item.sprice, { symbol: "₱", precision: 2 })}`], {
              encoding: 'CP437',
              codepage: 15,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1
            });
        await  BluetoothEscposPrinter.printText("\r\n", {});
        });
    
      await  BluetoothEscposPrinter.printText("--------------------------------", {});
      let columnWidthss = [21,6,8, 8];
      await BluetoothEscposPrinter.printColumn(columnWidthss,
          [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
          ["Total", '','', `${formatMoney(calculateTotal(), { symbol: "₱", precision: 2 })}`], {  encoding: 'Cp1254',
          encoding: 'CP437',
              codepage: 15,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1});
      await BluetoothEscposPrinter.printColumn(columnWidthss,
          [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
          ["Discount", '','', `${formatMoney(calculateTotal()*(transactions.discount/100), { symbol: "₱", precision: 2 })}`], { 
            encoding: 'CP437',
              codepage: 15,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1
          });
      await BluetoothEscposPrinter.printColumn(columnWidthss,
          [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
          ["Total", '',' ', `${formatMoney(calculateTotal()-calculateTotal()*(transactions.discount/100), { symbol: "₱", precision: 2 })}`], { 
            encoding: 'CP437',
              codepage: 15,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1
          });
          await BluetoothEscposPrinter.printColumn(columnWidthss,
            [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
            ["Cash Received", '',' ', `${formatMoney(transactions.received, { symbol: "₱", precision: 0 })}`], { 
              encoding: 'CP437',
                codepage: 15,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 1
            });
            await BluetoothEscposPrinter.printColumn(columnWidthss,
              [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
              ["Change", '',' ', `${formatMoney(transactions.change, { symbol: "₱", precision: 2 })}`], { 
                encoding: 'CP437',
                  codepage: 15,
                  widthtimes: 0,
                  heigthtimes: 0,
                  fonttype: 1
              });
            
        await  BluetoothEscposPrinter.printText("\r\n\r\n\r\n\r\n", {});
  } catch (e) {
      alert(e.message || "ERROR");
}
}


  useEffect(() => {
    getTRDetails(transactions._id)
  },[]);

  const renderItem = ({ item }) => (
    <ListItem containerStyle={{height: 50}} bottomDivider>
               <Text>x{Math.round(item.quantity * 100) / 100}</Text>
                <ListItem.Content >
           
                    <Text>{item.name}</Text>
                   
                    <ListItem.Subtitle>
                    <Text>with {item.addon}, {item.option}</Text>
                    
                    </ListItem.Subtitle>
                </ListItem.Content>
                <Text style={{color: colors.statusBarCoverDark}}>{formatMoney(item.quantity *( item.sprice + item.addon_price), { symbol: "₱", precision: 2 })}</Text>
            </ListItem>
  )

  const calculateTotal = () => {
    let total = 0;
    trdetails.forEach(list => {
            total += list.quantity * (list.sprice + list.addon_price)
    });
   return total;
}

  return (
      <View>
          <AppHeader 
            centerText="Transaction Details"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={35} color={colors.white}/>
                </TouchableOpacity>
            } 
           
          />
          <Card containerStyle={{padding: 0}} >
            <View style={{flexDirection:'row', justifyContent:'space-between', padding: 15}}>
              <View>
                <Text style={{fontWeight:'500'}}>Customer : {transactions.customer_name ? transactions.customer_name : "None"}</Text>
                <Text style={{fontWeight:'500'}}>Date :           {transactions.date}</Text>
                <Text style={{fontWeight:'500'}}>Receipt # :  {transactions.timeStamp}</Text>
              </View>
              <TouchableOpacity onPress={()=> printReceipt()}>
              <AntDesign name={'printer'} size={25} color={colors.primary}/>
              </TouchableOpacity>
            </View>
          
          <ListItem bottomDivider>
                <ListItem.Content style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontWeight:'bold'}}>Qty</Text>
                    <Text style={{fontWeight:'bold'}}>Product</Text>
                    <Text style={{fontWeight:'bold'}}>Total</Text>
                </ListItem.Content>
               
            </ListItem>
            <FlatList
                keyExtractor={(key) => key.name}
                data={trdetails}
                renderItem={renderItem}
                />
                <ListItem>
                  <ListItem.Content style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{fontWeight:'bold'}}>Sub Total</Text>
                      <Text></Text>
                      <Text style={{fontWeight:'bold', color: colors.statusBarCoverDark}}>{formatMoney(calculateTotal(), { symbol: "₱", precision: 2 })}</Text>
                  </ListItem.Content>
                </ListItem>
                <ListItem style={{marginTop: -20}}>
                  <ListItem.Content style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{fontWeight:'bold'}}>Discount</Text>
                      <Text></Text>
                      <Text style={{fontWeight:'bold', color: colors.statusBarCoverDark}}>-{formatMoney(transactions.discount, { symbol: "₱", precision: 2 })}</Text>
                  </ListItem.Content>
                </ListItem>
                <ListItem style={{marginTop: -20}}>
                  <ListItem.Content style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{fontWeight:'bold'}}>Total</Text>
                      <Text></Text>
                      <Text style={{fontWeight:'bold', color: colors.statusBarCoverDark}}>{formatMoney(calculateTotal()-transactions.discount, { symbol: "₱", precision: 2 })}</Text>
                  </ListItem.Content>
                </ListItem>
            </Card>
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default TransactionSetailsScreen;

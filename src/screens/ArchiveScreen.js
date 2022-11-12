import React, { useState } from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import AppHeader from "../components/AppHeader";
import { ListItem, Avatar } from 'react-native-elements'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";
import moment from 'moment'
import formatMoney from 'accounting-js/lib/formatMoney.js'
import Alert from "../components/Alert";

const ArchiveScreen = ({navigation}) => {
    const {archive ,archiveInfo, updateArchiveOnClear, reListArchive} = useStore();
    const [ondelete, setDelete] = useState(false);
    const [relist, setRelist] = useState(false);

      
      const keyExtractor = (item, index) => index.toString()
      
      const renderItem = ({ item }) => (
        <ListItem containerStyle={{borderWidth: 2, borderRadius: 30, margin: 10, borderColor: colors.accent}} bottomDivider onPress={()=> navigation.navigate('ArchiveInfo',{archive_info : item})}>
          <ListItem.Content>
            <ListItem.Title style={{fontWeight:'700'}}>{moment.unix(item.timeStamp).format("MMMM DD ,YYYY hh:mm:ss a")}</ListItem.Title>
            <ListItem.Subtitle>{formatMoney(item.total, { symbol: "₱", precision: 2 })}</ListItem.Subtitle>
          </ListItem.Content>
          <TouchableOpacity onPress={()=> setDelete(true)}>
            <EvilIcons name={'trash'} size={30} color={colors.primary}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRelist(true)}>
            <EvilIcons name={'redo'} size={30} color={colors.boldGrey}/>
          </TouchableOpacity>
        </ListItem>
      )

      const onCancelDelete = () => {
          setDelete(false)
      }

      const onCancelRelist = () => {
        setRelist(false)
        setDelete(false)
      }

      const onProceedDelete = () => {
        updateArchiveOnClear(archive);
        setDelete(false);
        navigation.goBack();
 
      }

      const onProceedRelist = () => {
        reListArchive(archive)
        setRelist(false)
      }

  return (
      <View>
        <Alert visible={ondelete} onCancel={onCancelDelete} onProceed={onProceedDelete} title="Delete this archive?" content="Are you sure you want to delete this archive?" confirmTitle="Proceed"/>
        <Alert visible={relist} onCancel={onCancelRelist} onProceed={onProceedRelist} title="Re-List archive?" content="Are you sure you want to re-list this archive?" confirmTitle="Proceed"/>
          <AppHeader
            centerText='Archive'
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={35} color={colors.white}/>
                </TouchableOpacity>
            } 
          />
           <FlatList
            keyExtractor={keyExtractor}
            data={archiveInfo}
            renderItem={renderItem}
            />
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default ArchiveScreen;

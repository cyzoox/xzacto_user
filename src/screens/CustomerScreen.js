import React,{ useState } from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { ListItem, Avatar, Overlay } from 'react-native-elements'
import AppHeader from "../components/AppHeader";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from "../themes/colors";
import { useStore } from "../context/StoreContext";


const CustomerScreen = ({navigation, selectedCustomer}) => {
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
    editListQty } = useStore();
    const [modal, toggleModal] = useState(false);
    const [customer, setCustomer] = useState('')

      const onSelect = (item) => {
          selectedCustomer(item)
          setCustomer(item.name)
          toggleModal(false)
      }
      
     const keyExtractor = (item, index) => index.toString()
      
      const renderItem = ({ item }) => (
        
        <ListItem containerStyle={styles.list} bottomDivider onPress={()=> onSelect(item)}>
              <Avatar containerStyle={{
              
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 20,
              backgroundColor: colors.accent
            }} size={35} icon={{ name: 'person-outline', type: 'ionicon', color: '#ffffff' }}/>
          <ListItem.Content>
            <ListItem.Title style={{fontWeight:'700'}}>{item.name}</ListItem.Title>
            <ListItem.Subtitle style={{fontSize: 13, fontStyle:'italic'}}>{item.address}</ListItem.Subtitle>
          </ListItem.Content>
          <Text style={{fontStyle:'italic', color: colors.boldGrey}}>Tap to select</Text>
          <ListItem.Chevron />
        </ListItem>
      )
  return (
      <>   
      <TouchableOpacity onPress={()=>toggleModal(true)}>
            <Ionicons name={'person-add-outline'} size={25} color={colors.white} style={{marginRight: 10}}/>
      </TouchableOpacity>
      <Overlay overlayStyle={{margin: 0, padding: 0}} fullScreen isVisible={modal} onBackdropPress={toggleModal}>
        <AppHeader 
            centerText="Customers"
            leftComponent={
                <TouchableOpacity onPress={()=> toggleModal(false)}>
                  <EvilIcons name={'close-o'} size={35} color={colors.white}/>
                </TouchableOpacity>
            } 
          
        />
        <FlatList
            keyExtractor={keyExtractor}
            data={customers}
            renderItem={renderItem}
            />
        </Overlay>
      </>
  );
};


const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  list: {borderWidth: 2, borderRadius: 10, margin: 10, borderColor: colors.accent}
});

export default CustomerScreen;

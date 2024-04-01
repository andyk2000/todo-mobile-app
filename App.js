import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, TextInput, FlatList, ActivityIndicator} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import ShoppingItem from './component/ShoppingItem';
import { db, collection, addDoc, getDocs, deleteDoc, doc} from "./firebase/index";

export default function App() {

  const [title, setTitle] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const newList = [];

  const addShoppingItem = async() => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getShoppingList();
  }

  const getShoppingList = async() => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    querySnapshot.forEach((doc) => {
      newList.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setShoppingList(newList);
  }

  const deleteShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    querySnapshot.docs.map((item) => deleteDoc(doc(db, "shopping", item.id)));
    getShoppingList();
  }

  useEffect(() => {
    getShoppingList();
  }, [])
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/*Heading*/}
          <Text style={styles.heading}>Shopping items</Text>
        {/*no of items*/}
          <Text style={styles.noOfItem}>{shoppingList.length}</Text>
        {/*Delete all*/}
        <Pressable onPress={deleteShoppingList}>
          <MaterialIcons name="delete" size={30} color="black" />
        </Pressable>
      </View>
      
      {/*flatList */}

      {

        shoppingList.length > 0 ? (

        <FlatList 
          data = {shoppingList}
          renderItem={({ item })=>
          <ShoppingItem 
            title={item.title} 
            isChecked={item.isChecked} 
            id={item.id}
            getShoppingList={getShoppingList}
            />}
          keyExtractor={item=>item.id}
          />
        )
         : (
          <ActivityIndicator />
         )
      }

      {/*Text Input area*/}
      <TextInput 
        placeholder="Add shopping Item"
        style={styles.input}
        onChangeText={(text)=>setTitle(text)}
        onSubmitEditing={addShoppingItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "500",
    flex: 1,
  },
  noOfItem: {
    fontSize: 30,
    fontWeight: "500",
    marginRight: 20,
  },
  input:
  {
    backgroundColor: "lightgray",
    padding: 10,
    fontSize: 17,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: "5%",
  }
});

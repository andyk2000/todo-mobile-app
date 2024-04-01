import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect} from 'react';
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import {db, doc, updateDoc, deleteDoc} from "../firebase/index";
// shopping object
/*
  1.Id
  2.title
  3.isChecked

*/

const ShoppingItem = (props) => {
  
  const [isChecked,setIschecked] = useState(props.isChecked);

  const updateIsChecked = async () => {
    const shoppingRef = doc(db, "shopping", props.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(shoppingRef, {
      isChecked: isChecked,
    });
  };

  const deleteShoppingItem = async () => {
    await deleteDoc(doc(db, "shopping", props.id));
    props.getShoppingList();
  }

  useEffect(() => {
    updateIsChecked();
  }, [isChecked]);
  return (
    <View style={styles.container}>
      {/* Checked Icon*/}
      <Pressable onPress={() =>setIschecked(!isChecked)}>
      {
        isChecked ? (
          <AntDesign name="checkcircleo" size={24} color="black" />
        ) : (
          <Entypo name="circle" size={24} color="black" />
        )
      }
      </Pressable>
      {/* Shopping Text*/}
      <Text style={styles.title}>{props.title}</Text>
      {/*delete button*/}
      <Pressable onPress={deleteShoppingItem}>
        <MaterialIcons name="delete" size={24} color="black" />
      </Pressable>
    </View>
  )
}

export default ShoppingItem;

const styles = StyleSheet.create({
    container : {
        flexDirection: "row",
        backgroundColor: "lightgray",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        marginVertical: 10,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: "500",
    }
})
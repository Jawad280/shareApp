import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../styles/global';
import { supabase } from '../lib/supabase';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import ImageUpload from '../components/ImageUpload';
import * as Crypto from 'expo-crypto';

export default function ItemCreation({ navigation, session }) {

  const [item_id, setItem_id] = useState('');
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    const uuid = Crypto.randomUUID();
    setItem_id(uuid);
  }, [refreshPage]);

  console.log(item_id);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);

  const [isFocus, setIsFocus] = useState(false);

  const handleCreateItem = async () => {
    const newItem = {
      id: item_id,
      name: name,
      listed_by: session.user.id,
      description: description
    }

    const { data, error } = await supabase
    .from('items')
    .insert(newItem)
    .select()

    if (error) {
      console.error(error.message)
    } else {
      console.log('Item has been created successfully !', data);
      setCategory(null)
      setName('')
      setDescription('')
      setRefreshPage(!refreshPage);
      navigation.navigate('Home');
    }
  }

  const data = [
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Clothing', value: 'Clothing' },
    { label: 'Books', value: 'Books' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'Food', value: 'Food' },
  ];

  const renderLabel = () => {
    if (category || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={globalStyles.container}> 
      
      <View style={styles.container}>
        
        <View style={{rowGap: 15, width: '100%'}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'grey' }}>Name</Text>
          <TextInput value={name} onChangeText={(t) => setName(t)} style={styles.dropdown}/>
        </View>

        <View style={{rowGap: 15, width: '100%'}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'grey' }}>Description</Text>
          <TextInput value={description} onChangeText={(t) => setDescription(t)} multiline={true} style={styles.textInput}/>
        </View>

        <View style={{rowGap: 15, width: '100%'}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'grey' }}>Category</Text>
          <View>
            {/* {renderLabel()} */}
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="category"
              placeholder={category ? category : 'Select Category'}
              searchPlaceholder="Search..."
              value={category}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setCategory(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <Ionicons name='basketball-outline' size={20} style={styles.icon} />
              )}
            />
          </View>
        </View>

        <View style={{rowGap: 15, width: '100%'}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'grey' }}>Upload Images</Text>
          <ImageUpload item_id={item_id} />
        </View>

        <TouchableOpacity onPress={handleCreateItem} style={styles.button}>
          <Text style={{color: 'white'}}>Create Listing !</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    rowGap: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  button: {
    padding: 20,
    backgroundColor: 'green',
    borderRadius: 8
  },
  dropdown: {
    height: 50,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  textInput: {
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    minHeight: 100
  },
  icon: {
    marginRight: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }
})
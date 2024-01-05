import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { supabase } from '../lib/supabase'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';

const ImageUpload = ({item_id}) => {

    const processImage = async (img) => {
        const ext = img.uri.substring(img.uri.lastIndexOf(".")+1);
        const fileName = item_id+'/'+img.fileName;

        var formData = new FormData();

        formData.append("files", {
            uri: img.uri,
            name: fileName,
            type: img.type ? `image/${ext}` : `video/${ext}`,
        });

        const { data, error } = await supabase.storage
        .from('item_images')
        .upload(fileName, formData);

        if (error) {
            console.error(error.message);
        } else {
            console.log(data);
        }
    }

    const handleUploadImages = async () => {

        console.log('Image upload has begun');
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            allowsMultipleSelection: true
        });

        console.log(result.assets);
        
        if (!result.canceled) {
            result.assets.forEach((img) => {
                processImage(img);
                console.log('uploaded')
            });

            console.log('All images have been uploaded');
        }

    }


  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={handleUploadImages}>
            <Text>Click Here to upload images</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ImageUpload

const styles = StyleSheet.create({
    container: {
        padding: 25,
        borderRadius: 20,
        backgroundColor: 'white',
        margin: 10
    }
})
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import Button from './components/Buttons';


export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false); // State to track if the camera is open
  const [isPictureTaken, setIsPictureTaken] = useState(false);

//Obtaining permissions
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus   = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

// Function to open the camera
  const openCamera = () => {
    setIsCameraOpen(true);
  };

  // Function to close the camera
  const closeCamera = () => {
    setIsCameraOpen(false);
  };

// Function to save an image to the gallery
const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert('Picture saved!')
        setImage(null);
      } catch (e) {
        console.log(e)
      }
    }
  };

//Function to take a picture
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log('Picture taken:', data);
        setImage(data.uri);
        setIsPictureTaken(true); // Set the state to indicate a picture has been taken
      } catch (e) {
        console.log('Error taking picture:', e);
      }
    } else {
      console.log('cameraRef is null');
    }
  };

// Function to pick an image from the gallery
const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  }

//Function turn on and off flash
const toggleFlash = () => {
    const newFlashMode =
      flash === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off;

    setFlash(newFlashMode);

    // Display an alert to indicate the flash mode change
    Alert.alert(
      'Flash Mode',
      `Flash mode is now ${newFlashMode === Camera.Constants.FlashMode.off ? 'Off' : 'On'}`,
    );
  };

  return (
    <>
      {/* Conditionally render the buttons based on isCameraOpen */}
      {!isCameraOpen && (
        <View style={styles.container}>
          <Button title="Choose a Photo" icon="folder-images" onPress={pickImage} />
          <Button title="Open Camera" icon="camera" onPress={openCamera} />
        </View>
      )}

      {isCameraOpen ? (
        <>
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          >
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 30,
            }}>
              <Button icon={'retweet'} onPress={() => {
                setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
              }} />
              <Button icon={'flash'} onPress={toggleFlash} />
            </View>
            
            {/* Button section inside the camera view */}
            {image ?
              <View style={styles.buttonSection}>
                <Image source={{ uri: image }} style={styles.camera} />
                <Button title={"Re-take"} icon="retweet" onPress={() => {setImage(null); setIsPictureTaken(false);}} />
                <Button title={"Save"} icon="check" onPress={saveImage} />
              </View>
              :
              <View style={styles.buttonSection}>
                <Button title="Take a Picture" icon="camera" onPress={takePicture} />
              </View>
            }
          </Camera>
          {/* Button to close the camera */}
          <View style={styles.closeButton}>
            <Button title="Close Camera" icon="cross" onPress={closeCamera} />
          </View>
        </>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
    </>
  );
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 15,
  },

  camera: {
    flex: 1,
    borderRadius: 20,
  },

  closeButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },

  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
})

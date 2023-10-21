import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert, Dimensions, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import Button from "./Buttons"
import Carousel, { Pagination } from 'react-native-snap-carousel';


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
  
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

   paginationContainer: {
    position: 'absolute',
    bottom: 10, 
  },

    gridImage: {
    width: Dimensions.get('window').width / 3, // Divide by the number of columns
    height: Dimensions.get('window').width / 3, 
    margin: 2, 
    }
})

const PhoneCamera = () => {
  
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false); // State to track if the camera is open
  const [isPictureTaken, setIsPictureTaken] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [imageList, setImageList] = useState([]);

//Obtaining permissions
//   useEffect(() => {
//     (async () => {
//       MediaLibrary.requestPermissionsAsync();
//       const cameraStatus   = await Camera.requestCameraPermissionsAsync();
//       setHasCameraPermission(cameraPermission.status === "granted");
//     })();
//   }, []);

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
      const newImages = [...imageList, { type: 'camera', uri: data.uri }];
      setImageList(newImages);
      setIsPictureTaken(true);
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

  if (!result.canceled) {
    const newImages = [...imageList, { type: 'gallery', uri: result.uri }];
    setImageList(newImages);
  } else {
    // Handle the canceled selection here (e.g., show a message or take no action)
  }
};


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

  const chunk = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
  };

  const imageChunks = chunk(imageList, 9);

  const shareGrid = () => {
    if (imageList.length > 0) {
      Alert.alert('Share Gallery', 'Images sent successfully!');
    } else {
      Alert.alert('Share Gallery', 'Please add more than one image to share.');
    }
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
						}} 
					/>
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
		<>
			<Image source={{ uri: image }} style={styles.camera} />
			<View style={styles.gridContainer}>
				<Carousel
					data={imageChunks}
					renderItem={({ item }) => (
						<FlatList
							data={item}
							keyExtractor={(item, index) => index.toString()}
							numColumns={3}
							renderItem={({ item }) => (
								<Image
									source={{ uri: item.uri }}
									style={styles.gridImage}
								/>
							)}
						/>
					)}
					sliderWidth={Dimensions.get('window').width}
					itemWidth={Dimensions.get('window').width}
					onSnapToItem={(index) => setActiveSlide(index)}
				/>
				<View style={styles.carouselContainer}>
					<Pagination
						dotsLength={imageChunks.length}
						activeDotIndex={activeSlide}
						containerStyle={styles.paginationContainer}
						dotColor={'blue'}
						inactiveDotColor={'gray'}
						inactiveDotOpacity={0.4}
						inactiveDotScale={0.8}
					/>
					<TouchableOpacity
						onPress={shareGrid} // Add this onPress handler
						style={styles.shareButton}
					>
						<Text style={styles.shareButtonText}>Share Gallery</Text>
					
					</TouchableOpacity>
				</View>
			</View>
		

		</>
		)}
	</>
	);
}

export default PhoneCamera

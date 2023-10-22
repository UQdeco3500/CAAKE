import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Dimensions, FlatList, Modal, SafeAreaView, TextInput } from 'react-native';
import React, { useRef, useState, useContext } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import Button from "../components/Buttons"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppContext } from "../components/appContext"


//Styles
const styles = StyleSheet.create({
    container: {
    paddingTop: 80,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4ABCDE',
    alignItems: 'center',
    paddingBottom: 25,
  },

  camera: {
    flex: 1,
    borderRadius: 30,
  },

  closeButton: {
    alignSelf: 'center' ,
    bottom: 700,
    padding: 5,
    width: 200,
    height: 60,
    borderRadius: 30,
    zIndex: 1,
    textAlign: 'center',
  },

  buttonSection: {
    alignSelf: 'center',
    top: 500,
    borderRadius: 25,
    height: 95,
    paddingTop: 10,
    left: 0,
    right: 0,
  },
  
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100
  },

   paginationContainer: {
    position: 'absolute',
    bottom: 10, 
  },

    gridImage: {
    width: Dimensions.get('window').width / 3, // Divide by the number of columns
    height: Dimensions.get('window').width / 3, 
    margin: 2, 
    },

    heading: {
        paddingLeft: 30,
        paddingTop: 40,
        fontSize: 25,
        color: '#126F90',
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        margin: 20,
        marginLeft: 8,
        borderWidth: 1,
        backgroundColor: 'white',
        color: 'gray',
        textAlign: 'center',
        borderRadius: 10,
        borderColor: 'white',
        width: "70%"
      },
})

const PhoneCamera = ({ navigation }) => {
  
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false); // State to track if the camera is open
  const [isPictureTaken, setIsPictureTaken] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { imageList, setImageList } = useAppContext();

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

      // Display an alert to indicate the image has been added
      Alert.alert(
        'Image Added'
      );
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
					padding: 50,
                    paddingTop: 60,
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
						<Button pictureIcon="circle" onPress={takePicture} />
					</View>
				}
			</Camera>

			{/* Button to close the camera */}
			<View style={styles.closeButton}>
				<Button color='white' title="CLOSE" icon="cross" onPress={closeCamera} />
			</View>
		</>
		) : (
		<SafeAreaView style={{ justifyContent: "space-between", flex: 1}}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="chevron-left" size={24} color="#126F90" style={{ position: "relative", right: 15}}/>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    // onChangeText={setNameOfAlbum}
                    // value={nameOfAlbum} 
                    // need to look into why this doesn't work ^^
                    numberOfLines={1}
                    fontSize={14}
                    placeholderTextColor= 'gray'
                    clearTextOnFocus={true}
                    placeholder={"Album Name"}
                />
            </View>
			<View >
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
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalOpen}
            >
                <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)"}}>
                    <SafeAreaView style={{ flex: 0.25, justifyContent: "space-between", alignItems: "center"}}>
                       <View style={{width: "90%", marginBottom: 5}}>
                           <TouchableOpacity onPress={pickImage}>
                               <View style={{
                                    backgroundColor: "white", 
                                    justifyContent: "center", 
                                    flexDirection: "row", 
                                    borderTopStartRadius: 20, 
                                    borderTopEndRadius: 20, 
                                    paddingVertical: 20,
                                    borderBottomColor: "grey",
                                    borderBottomWidth: 1
                                }}>
                                    <FontAwesome5 name="image" size={24} color="#126F90" />
                                    <Text style={{ marginLeft: 10 }}>
                                        Photo Gallery
                                    </Text>
                               </View>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={openCamera}>
                               <View style={{
                                    backgroundColor: "white", 
                                    justifyContent: "center", 
                                    flexDirection: "row", 
                                    borderBottomStartRadius: 20, 
                                    borderBottomEndRadius: 20, 
                                    paddingVertical: 20}}
                                >
                                    <FontAwesome5 name="camera" size={24} color="#126F90" />
                                    <Text style={{ marginLeft: 10 }}>
                                        Camera
                                    </Text>
                               </View>
                           </TouchableOpacity>
                       </View>

                       <TouchableOpacity style={{ width: "90%" }} activeOpacity={0.9} onPress={() => setModalOpen(false)}>
                           <View style={{backgroundColor: "#4e4f52", justifyContent: "center", flexDirection: "row", borderRadius: 20, paddingVertical: 20}}>
                                <Text style={{ marginLeft: 10, color: "white" }}>
                                    CANCEL
                                </Text>
                           </View>
                       </TouchableOpacity>
                    </SafeAreaView>
                </View>
            </Modal>

            <TouchableOpacity onPress={() => setModalOpen(true)}>
                <FontAwesome5 name="plus-square" size={48} color="#126F90" style={{alignSelf: "center", marginBottom: 10 }}/>
            </TouchableOpacity>

		</SafeAreaView>
		)}
	</>
	);
}

export default PhoneCamera

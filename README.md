# Long Distance Relationships - Communication and Connection between Parents and Students

Welcome to the Framilia Physical Prototype README! Framilia is a unique solution designed to enhance emotional connections between international students and their parents, bridging the gap of long-distance relationships. This document will provide an overview of the physical prototype and how it connects with digital photos and videos to create a meaningful interaction. 

To learn more about the development process of Framilia as well as more information on how it works check out our wiki:

[Link to Wiki Documentation](https://github.com/UQdeco3500/CAAKE/wiki)

The Framilia physical prototype is a specially designed holographic frame. Its primary purpose is to display images and videos to create a more tangible and immersive experience for users. Our system consist of a digital application as well as a physical prototype:

**Physical Artefact**

The physical prototype is a frame that employs holographic technology to project images, messages or videos users recieve from their parent / child (vice versa). By projecting the shared content, the frame creates an immersive experience for the user to feel their present with their loved ones, even when physically distnant. The frame allows the asyhnchronous interaction that allow users to send message and media at their convinience which is helpful for international students and parents who may be in different time zones.

To use it, place a phone on top of the holder which cycles through images (works best with dark backgrounds). The Holo must be placed in a dark lighting setting for optimat effect.

<p align="center"><img width="629" alt="Screenshot 2023-10-27 at 9 08 35 am" src="https://github.com/UQdeco3500/CAAKE/assets/110017386/c35b4539-4f1b-49f7-95b7-b740e15a4cd0"></p>

To see this prototype in action, check out [our Instagram page!](https://www.instagram.com/caake_uq/?utm_source=ig_web_button_share_sheet&igshid=ODE2OTA4Y2Y1MQ==)

**Mobilie Application**

In terms of the accompanied mobile application, it serves as the control centre for users to send, manage and personalise the content displayed on the paired user. With the app, users can choose what to send which will be delivered to the other Framilia. The Framilia and app work together seamlessly to create a unique emotional connection between international students and their parents. In this way, they can come together to bridge the gap between international students and their parents, making them feel more connected, regardless of the physical distance. This digital component of our design is located here on the repository - to use it follow the below steps:

## Step 0: Download ZIP
Download the contents of this repository as a zip file, and navigate to that folder in your terminal.

### Step 1: Install Node.js and npm
If you do not already have Node.js and npm installed, you can download and install them from the official website: https://nodejs.org/

### Step 2: Install Expo CLI
You can install Expo CLI globally by running this command in your terminal:
npm install -g expo-cli

### Step 3: Install Expo in your Device
Download Expo in Appstore or Google Playstore

### Step 4: Install the Required Dependencies
React Native:
npx react-native init AppName

React Navigation:
npm install @react-navigation/native
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/viewpager
npm install @react-navigation/stack
npm install @react-navigation/bottom-tabs

Expo Camera:
npm install expo-camera

Expo Media Library:
npm install expo-media-library

Expo Image Picker:
npm install expo-image-picker

React Native Snap Carousel:
npm install react-native-snap-carousel

React Native Vector Icons:
npm install react-native-vector-icons

### Step 5: Start Your Project
To start your Expo project, use the following command:
expo start

### Step 6: Scan the barcode
To start the prototype in your device, download Expo Go and scan the barcode when you start the project.

### Step 7: Home Page
Opening the app, you will find yourself in the home page. You can navigate to the profile page (placeholder), or press the album photo to enter the photo page.

### Step 8: Photo Page
On this page, you will see a + icon on the bottom of the page. Press that to add photos to the album. These photos would then be shared to your loved ones Framilia.

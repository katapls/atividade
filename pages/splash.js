import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageBackground, Image, StyleSheet } from "react-native";

export default function Splash({ navigation }) {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        await new Promise(resolve => setTimeout(resolve, 3000));


        if (token) {
          console.log(token)
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        navigation.replace('Login');
      }
    };

    checkToken();
  }, []);

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={style.imgBack}>
      <Image source={require('../assets/imagembossal.png')} style={style.imgLogo} resizeMode="contain" />
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  imgBack: { flex: 1, justifyContent: "center", alignItems: "center" },
  imgLogo: { width: 300, height: 200 }
});
import React, { useState, useEffect } from 'react';
import { Slot, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        
        if (token) {
          router.replace('/home');
        } else {
          router.replace('/');
        }
      } catch (error) {
        router.replace('/');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <View><Text>Carregando...</Text></View>;
  }

  return <Slot />;
}
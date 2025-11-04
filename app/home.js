import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rideService from '../services/ride.service';
import DateTimePicker from '@react-native-community/datetimepicker';

function HomeScreen() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);

  const defaultScheduleTime = new Date(Date.now() + 60 * 60 * 1000);
  const [date, setDate] = useState(defaultScheduleTime);
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const handleRequestRide = async (isScheduled) => {
    if (!origin || !destination) {
      Alert.alert('Erro', 'Por favor, preencha a origem e o destino.');
      return;
    }
    setLoading(true);
    
    const rideData = {
      origin_address: origin,
      destination_address: destination,
      scheduled_for: isScheduled ? date.toISOString() : null,
    };

    try {
      const newRide = await rideService.requestRide(rideData);
      Alert.alert('Sucesso!', `Corrida #${newRide.id} solicitada.`);
      setOrigin('');
      setDestination('');
      setDate(defaultScheduleTime);
    } catch (error) {
      console.error("Falha ao solicitar corrida:", error.response?.data || error.message);
      const message = error.response?.data?.message || 'Não foi possível solicitar a corrida.';
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    router.replace('/'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitar uma Corrida</Text>
      <TextInput
        style={styles.input}
        placeholder="Endereço de Partida"
        value={origin}
        onChangeText={setOrigin}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço de Destino"
        value={destination}
        onChangeText={setDestination}
      />
      <Text style={styles.dateLabel}>Data e Hora do Agendamento:</Text>
      <TouchableOpacity onPress={showDateTimePicker} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>{date.toLocaleString('pt-BR')}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date(Date.now() + 55 * 60 * 1000)}
        />
      )}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleRequestRide(true)} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Agendando...' : 'Agendar Corrida'}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.buttonOutline} 
        onPress={() => handleRequestRide(false)} 
        disabled={loading}
      >
        <Text style={styles.buttonOutlineText}>Solicitar para AGORA</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 40 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 16, marginBottom: 15, fontSize: 16 },
  dateLabel: { fontSize: 16, color: '#555', marginBottom: 5, marginTop: 10 },
  datePickerButton: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 16, justifyContent: 'center', marginBottom: 20 },
  datePickerText: { fontSize: 16, color: '#333' },
  button: { width: '100%', height: 50, backgroundColor: '#007bff', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  buttonOutline: { width: '100%', height: 50, backgroundColor: '#fff', borderWidth: 2, borderColor: '#007bff', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonOutlineText: { color: '#007bff', fontSize: 18, fontWeight: 'bold' },
  logoutButton: { position: 'absolute', bottom: 40, alignSelf: 'center' },
  logoutButtonText: { color: '#007bff', fontSize: 16 }
});

export default HomeScreen;
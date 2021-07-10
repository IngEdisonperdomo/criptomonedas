import React, {useState, useRef, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptomoneda,
  guardarMoneda,
  guardarCriptomoneda,
  guardarConsultarAPI,
}) => {
  const [criptomonedas, guardarCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      console.log('resultado');
      console.log(resultado);
      guardarCriptomonedas(resultado.data.Data);
    };

    consultarApi();
  }, []);

  const pickerRef = useRef();

  const obtenerMoneda = monedas => {
    guardarMoneda(monedas);
  };

  const obtenerCriptoMoneda = cripto => {
    guardarCriptomoneda(cripto);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    guardarConsultarAPI(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error...', 'Ambos Campos son obligatorios', [{text: 'OK'}]);
  };

  console.log(criptomonedas);

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        ref={pickerRef}
        selectedValue={moneda}
        onValueChange={monedas => obtenerMoneda(monedas)}
        itemStyle={styles.picker}>
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>

      <Text style={styles.label}>Criptomeneda</Text>

      <Picker
        ref={pickerRef}
        selectedValue={criptomoneda}
        onValueChange={cripto => obtenerCriptoMoneda(cripto)}
        itemStyle={styles.picker}>
        <Picker.Item label="Seleccione" value="" />
        {criptomonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.Id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>

      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.textCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  picker: {
    height: 120,
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  textCotizar: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Formulario;

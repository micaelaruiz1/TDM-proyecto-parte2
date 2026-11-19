import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate('HomeMenu')
      }
    })
  }, [])

  function onSubmit(email, pass) {
    auth.signInWithEmailAndPassword(email, pass)
      .then(response => {
        props.navigation.navigate('HomeMenu')
      })
      .catch(error => {
        setLoginError('Credenciales inválidas.')
      })
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo2.png')}
        resizeMode='contain'
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        keyboardType='email-address'
        placeholder='Ingrese su email'
        onChangeText={text => setEmail(text)}
        value={email}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        keyboardType='default'
        placeholder='Ingrese su contraseña'
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />

      <Pressable style={styles.boton} onPress={() => onSubmit(email, password)}>
        <Text style={styles.textoBoton}>Iniciar Sesión</Text>
      </Pressable>

      <Text style={styles.error}>{loginError}</Text>

      <Pressable style={styles.link} onPress={() => props.navigation.navigate('Register')}>
        <Text style={styles.textoLink}>No tengo cuenta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
  height: 250,
  width:250,
  alignSelf: 'center',
},
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#b3b3b3',
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 4,
    padding: 14,
    minHeight: 50,
    marginBottom: 12,
  },
  boton: {
    backgroundColor: '#E50914',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: '#e84f03',
    marginTop: 10,
  },
  link: {
    alignItems: 'center',
    marginTop: 15,
  },
  textoLink: {
    color: '#E50914',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Login;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
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
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.field}
        keyboardType='email-address'
        placeholder='Ingrese su email'
        onChangeText={text => setEmail(text)}
        value={email}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.field}
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
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  field: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 6,
    backgroundColor: '#fafafa',
    padding: 10,
    marginBottom: 15,
  },
  boton: {
    backgroundColor: '#0095f6',
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
    color: 'red',
    marginTop: 10,
  },
  link: {
    alignItems: 'center',
    marginTop: 15,
  },
  textoLink: {
    color: '#0095f6',
  },
});

export default Login;
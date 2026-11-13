import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function Register(props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  function onSubmit(email, pass) {
    if (username === '') {
      setRegisterError('El nombre de usuario es obligatorio.')
    } else {
      auth.createUserWithEmailAndPassword(email, pass)
        .then(response => {
          db.collection('users').add({
            email: email,
            username: username,
          })
            .then()
            .catch(e => console.log(e))
    
          auth.signOut()
            .then(response => {
              props.navigation.navigate('Login')
            })
            .catch(e => console.log(e))

          })
        .catch(error => {
          setRegisterError('Fallo en el registro.')
        })
    }
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

      <Text style={styles.label}>Nombre de usuario</Text>
      <TextInput
        style={styles.field}
        keyboardType='default'
        placeholder='Ingrese su username'
        onChangeText={text => setUsername(text)}
        value={username}
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
        <Text style={styles.textoBoton}>Registrarse</Text>
      </Pressable>

      <Text style={styles.error}>{registerError}</Text>

      <Pressable style={styles.link} onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.textoLink}>Ya tengo cuenta</Text>
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

export default Register;
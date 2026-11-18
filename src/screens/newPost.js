import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function NewPost(props) {
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  function crearPost(descripcion) {
    if (descripcion === '') {
      setError('Escribi una descripción para tu posteo.');
    } else {
      setError('');
      db.collection('posts').add({
        email: auth.currentUser.email,
        descripcion: descripcion,
        likes: [],
        createdAt: Date.now(),
      })
        .then(() => {
          setDescripcion('');
          props.navigation.navigate('Home', { screen: 'Feed' });
        })
        .catch(e => console.log(e));
    }
  }

return (
  <View style={styles.container}>
    <Text style={styles.titulo}>Nueva reseña</Text>
    <Text style={styles.subtitulo}>Contale a la comunidad qué viste</Text>

    <TextInput
      style={styles.input}
      keyboardType='default'
      placeholder='¿Qué película viste y qué te pareció?'
      onChangeText={text => setDescripcion(text)}
      value={descripcion}
    />
    {error !== '' ? <Text style={styles.error}>{error}</Text> : null}

    <Pressable style={styles.boton} onPress={() => crearPost(descripcion)}>
      <Text style={styles.textoBoton}>Publicar</Text>
    </Pressable>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 4,
    padding: 14,
    minHeight: 120,
    marginBottom: 12,
  },
  error: {
    color: '#e87c03',
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#E50914',
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default NewPost;

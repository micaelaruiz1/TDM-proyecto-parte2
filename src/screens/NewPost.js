import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function NewPost(props) {
  const [descripcion, setDescripcion] = useState('');

  function crearPost(descripcion) {
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

return (
  <View style={styles.container}>
    <Text style={styles.titulo}>Nuevo posteo</Text>

    <Text style={styles.label}>Descripción</Text>
    <TextInput
      style={styles.input}
      keyboardType='default'
      placeholder='Qué querés compartir?'
      onChangeText={text => setDescripcion(text)}
      value={descripcion}
    />

    <Pressable style={styles.boton} onPress={() => crearPost(descripcion)}>
      <Text style={styles.textoBoton}>Publicar</Text>
    </Pressable>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 6,
    backgroundColor: '#fafafa',
    padding: 10,
    marginBottom: 15,
    minHeight: 100,
  },
  boton: {
    backgroundColor: '#0095f6',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
});


export default NewPost;

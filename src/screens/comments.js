import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

function Comments(props) {
  const { id } = props.route.params;

  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    db.collection('comments')
      .where('postId', '==', id)
      .onSnapshot(docs => {
        let listaComentarios = [];

        docs.forEach(doc => {
          listaComentarios.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setComentarios(listaComentarios);
        setLoading(false);
      });
  }, []);

  function agregarComentario() {
    if (comentario === '') {
      setError('Escribi un comentario.');
    } else {
      db.collection('comments').add({
        postId: id,
        email: auth.currentUser.email,
        descripcion: comentario,
        createdAt: Date.now()
      })
        .then(() => {
          setComentario('');
          setError('');
        })
        .catch(e => console.log(e));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Comentarios ({comentarios.length})</Text>

      <TextInput
        style={styles.input}
        keyboardType='default'
        placeholder='Escribi un comentario'
        onChangeText={text => setComentario(text)}
        value={comentario}
      />

      <Pressable
        style={styles.boton}
        onPress={() => agregarComentario()}
      >
        <Text style={styles.textoBoton}>Publicar comentario</Text>
      </Pressable>

      <Text style={styles.error}>{error}</Text>

      {loading ?
        <ActivityIndicator size='large' color='#0095f6' /> :
        <FlatList
          data={comentarios}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <View style={styles.comentario}>
              <Text style={styles.email}>{item.data.email}</Text>
              <Text style={styles.descripcion}>{item.data.descripcion}</Text>
            </View>
          }
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f6ebec',
  },
  input: {
    borderRadius: 6,
    backgroundColor: '#333',
    color: 'white',
    padding: 10,
    marginBottom: 15,
    minHeight: 70,
  },
  boton: {
    backgroundColor: '#E50914',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: '#e84f03',
    marginTop: 10,
  },
  comentario: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
  },
  email: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
    marginBottom: 6,
  },
  descripcion: {
    color: '#dfd5d5',
    fontSize: 15,
  },
});

export default Comments;

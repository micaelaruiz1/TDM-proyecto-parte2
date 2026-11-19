import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { auth, db } from '../firebase/config';

function Post(props) {
  const likeado = props.post.data.likes.includes(auth.currentUser.email);
  const [cantComentarios, setCantComentarios] = useState(0);

  useEffect(() => {
    db.collection('comments')
      .where('postId', '==', props.post.id)
      .onSnapshot(docs => {
        let lista = [];
        docs.forEach(doc => {
          lista.push(doc.id);
        });
        setCantComentarios(lista.length);
      });
  }, []);

  function likear() {
    db.collection('posts')
      .doc(props.post.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
  }

  function deslikear() {
    db.collection('posts')
      .doc(props.post.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.email}>{props.post.data.email}</Text>
      <Text style={styles.descripcion}>{props.post.data.descripcion}</Text>

      <View style={styles.botones}>
        <Pressable onPress={() => likeado ? deslikear() : likear()}
          style={likeado ? styles.botonLikeado : styles.botonDislike}>
          <Text style={styles.textoBoton}>
            {likeado ? '♥' : '♡'} Me gusta ({props.post.data.likes.length})
          </Text>
        </Pressable>

        <Pressable style={styles.botonComentarios} onPress={() => props.navigation.navigate('Home', { screen: 'Comments', params: { id: props.post.id } })}>
          <Text style={styles.textoBoton}>Comentarios ({cantComentarios})</Text>
        </Pressable>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b1b1b',
    borderRadius: 6,
    padding: 16,
    marginBottom: 14,
  },
  email: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  descripcion: {
    color: '#e5e5e5',
    fontSize: 15,
    marginBottom: 14,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
  },
  botonLikeado: {
    backgroundColor: '#E50914',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  botonDislike: {
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  botonComentarios: {
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Post;

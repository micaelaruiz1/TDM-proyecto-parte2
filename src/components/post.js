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
          <Text style={likeado ? styles.textoLike : styles.textoDislike}>
            ({props.post.data.likes.length}) {likeado ? 'Me gusta ♥' : 'Me gusta ♡'}
          </Text>
        </Pressable>

        <Pressable style={styles.comment} onPress={() => props.navigation.navigate('Home', { screen: 'Comments', params: { id: props.post.id } })}>
          <Text style={styles.commentText}>Comentarios {cantComentarios}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: '#dbdbdb',
    borderRadius: 8,
    borderWidth: 1,
    padding: 15,
    marginBottom: 12,
  },
  email: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
  },
  descripcion: {
    fontSize: 15,
    marginBottom: 12,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#efefef',
    paddingTop: 10,
  },
  botonLikeado: {
    backgroundColor: '#0095f6',
    borderRadius: 8,
    padding: 2,
    alignItems: 'center',
  },
  botonDislike: {
    backgroundColor: '#b6bec3',
    borderRadius: 8,
    padding: 2,
    alignItems: 'center',
  },
  comment: {
    backgroundColor: '#0095f6',
    borderRadius: 8,
    padding: 2,
    alignItems: 'center',
  },
  commentText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textoLike: {
    color: 'white',
    fontWeight: 'bold',
  },
  textoDislike: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Post;

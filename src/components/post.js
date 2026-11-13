import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { auth, db } from '../firebase/config';
import comments from '../screens/comments';

function Post(props) {
  const likeado = props.post.data.likes.includes(auth.currentUser.email);

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
        <Pressable onPress={() => likeado ? deslikear() : likear()}>
          <Text style={styles.botonLike}>
            {likeado ? 'Ya no me gusta' : 'Me gusta'} ({props.post.data.likes.length})
          </Text>
        </Pressable>

        <Pressable onPress={() => props.navigation.navigate('Comments', { id: props.post.id })}>
          <Text style={styles.accion}>Comentar</Text>
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
    borderTopColor: '#efefef',
    paddingTop: 10,
  },
  botonLike: {
    color: '#0095f6',
    fontWeight: 'bold',
  },
});

export default Post;

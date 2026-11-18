import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/post';

function Profile(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [posteos, setPosteos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setEmail(user.email);

        db.collection('users')
          .where('email', '==', user.email)
          .onSnapshot(docs => {
            docs.forEach(doc => {
              setUsername(doc.data().username);
            });
          });

        db.collection('posts')
          .where('email', '==', user.email)
          .onSnapshot(docs => {
            let posts = [];

            docs.forEach(doc => {
              posts.push({
                id: doc.id,
                data: doc.data()
              });
            });

            setPosteos(posts);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  function logout() {
    auth.signOut()
      .then(() => {
        props.navigation.navigate('Login');
      })
      .catch(e => {
        setError('Error al cerrar sesion.');
        console.log(e);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi Perfil</Text>

      <Text style={styles.label}>Nombre de usuario:</Text>
      <Text style={styles.dato}>{username}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.dato}>{email}</Text>

      <Pressable style={styles.boton} onPress={() => logout()}>
        <Text style={styles.textoBoton}>Cerrar sesion</Text>
      </Pressable>

      <Text style={styles.error}>{error}</Text>

      <Text style={styles.subtitulo}>Mis posteos</Text>

      {loading ?
        <ActivityIndicator size='large' color='#E50914' />  :
        <FlatList
          data={posteos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Post post={item} navigation={props.navigation} />}
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
    color: '#f6ebec',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f6ebec',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#b3b3b3',
    marginBottom: 5,
  },
  dato: {
    fontSize: 16,
    marginBottom: 15,
    color: 'white',
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
    color: '#e80303',
    marginBottom: 10,
  },
});

export default Profile;

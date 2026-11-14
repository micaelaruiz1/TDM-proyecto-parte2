
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

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
        <ActivityIndicator size='large' color='#0095f6' /> :
        <FlatList
          data={posteos}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            <View style={styles.posteo}>
              <Text style={styles.email}>{item.data.email}</Text>
              <Text style={styles.descripcion}>{item.data.descripcion}</Text>
              <Text style={styles.likes}>
                Me gusta ({item.data.likes.length})
              </Text>
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dato: {
    fontSize: 16,
    marginBottom: 15,
  },
  boton: {
    backgroundColor: '#0095f6',
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
    color: 'red',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  posteo: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
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
  likes: {
    color: '#0095f6',
    marginTop: 10,
  },
});

export default Profile;

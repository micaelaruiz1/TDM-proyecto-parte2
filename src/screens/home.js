import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/post';

function Home(props) {
  const [posteos, setPosteos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
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
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Home</Text>

      {loading ?
        <ActivityIndicator size='large' color='#0095f6' /> :
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
    backgroundColor: 'white',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
export default Home;
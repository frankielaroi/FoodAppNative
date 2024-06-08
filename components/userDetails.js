import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useUser } from './utils/userContext';

const Profile = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user || !user.token) {
        setError('No user or token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://backendnode-skls.onrender.com/user/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const userData = await response.json();
        setUserData(userData);
      } catch (err) {
        setError(err.message);
        Alert.alert('Error', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name:</Text>
      <Text style={styles.value}>{userData.firstName}</Text>

      <Text style={styles.label}>Last Name:</Text>
      <Text style={styles.value}>{userData.lastName}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{userData.email}</Text>

      <Text style={styles.label}>Role:</Text>
      <Text style={styles.value}>{userData.role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    marginTop: 5,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Profile;

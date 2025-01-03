import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { authService } from '../../../WeWear_App/StylrMobile/services/auth/authService';
import { useUser } from '@/contexts/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

type AuthMode = 'login' | 'register';

export default function AuthScreen() {
  // Form states
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const router = useRouter();
  const { setUser } = useUser();

  const handleAuth = async () => {
    try {
      setError(null);

      if (mode === 'register') {
        // Validate register inputs
        if (!username || !email || !password || !confirmPassword) {
          setError('All fields are required');
          return;
        }

        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
      } else {
        // Validate login inputs
        if (!username || !password) {
          setError('Username and password are required');
          return;
        }
      }

      setIsLoading(true);

      if (mode === 'register') {
        const response = await authService.register({ username, email, password });
        setUser(response.user);
        // Navigate to home screen after successful registration
        router.replace('/(tabs)');
      } else {
        const response = await authService.login({ username, password });
        setUser(response.user);
        // Navigate to home screen after successful login
        router.replace('/(tabs)/homeScreen');
      }
    } catch (err) {
      console.error('Auth error:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || `${mode === 'login' ? 'Login' : 'Registration'} failed`);
      } else {
        setError(`${mode === 'login' ? 'Invalid username or password' : 'Registration failed'}`);
      }
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setError(null);
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </ThemedText>
        
        {error && (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </View>
        )}

        {mode === 'register' ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#666"
            />
          </>
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
        )}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#666"
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialCommunityIcons 
              name={showPassword ? "eye-off" : "eye"} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>

        {mode === 'register' && (
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#666"
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <MaterialCommunityIcons 
                name={showConfirmPassword ? "eye-off" : "eye"} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity 
          style={styles.authButton}
          onPress={handleAuth}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.authButtonText}>
              {mode === 'login' ? 'Login' : 'Register'}
            </ThemedText>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={toggleMode}
        >
          <ThemedText>
            {mode === 'login' 
              ? "Don't have an account? Register" 
              : "Already have an account? Login"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  authButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.3)',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    textAlign: 'center',
  },
}); 
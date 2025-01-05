import React from 'react';
import { View, Text, Switch, Button, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { authService } from '@/services/auth/authService';
import { useUser } from '@/contexts/UserContext';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';

const SettingsScreen = () => {
    const colorScheme = useColorScheme();
    const router = useRouter();
    const { setUser } = useUser();

    const toggleTheme = () => {
        // Implement theme toggle logic
        console.log('Toggle theme');
    };

    const changeLanguage = () => {
        // Implement language change logic
        console.log('Change language');
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            setUser(null);
            router.replace('/auth');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const viewTOS = () => {
        // Implement TOS view logic
        console.log('TOS');
    };

    const changeCredentials = () => {
        // Implement credentials change logic
        console.log('change credentials');
    };

    const handleInjectTestData = async () => {
        try {
            await wardrobeService.injectTestData();
            Alert.alert('Success', 'Test data injected successfully');
        } catch (error) {
            console.error('Error injecting test data:', error);
            Alert.alert('Error', 'Failed to inject test data');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.header}>Settings</Text>

                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Dark Mode</Text>
                    <Switch
                        value={colorScheme === 'dark'}
                        onValueChange={toggleTheme}
                    />
                </View>

                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Language</Text>
                    <Button title="Change Language" onPress={changeLanguage} />
                </View>

                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Credentials</Text>
                    <Button title="Change Credentials" onPress={changeCredentials} />
                </View>

                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Terms of Service</Text>
                    <Button title="View Terms of Service" onPress={viewTOS} />
                </View>

                {/* Development section for test data */}
                <View style={styles.developmentSection}>
                    <Text style={styles.sectionHeader}>Development</Text>
                    <TouchableOpacity 
                        style={styles.devButton}
                        onPress={handleInjectTestData}
                    >
                        <Text style={styles.devButtonText}>Inject Test Data</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.logoutButton}>
                    <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingItem: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 18,
    },
    logoutButton: {
        marginTop: 30,
    },
    developmentSection: {
        marginTop: 30,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    devButton: {
        backgroundColor: '#f3f4f6',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    devButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
});

export default SettingsScreen;
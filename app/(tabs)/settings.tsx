import React from 'react';
import {View, Text, Switch, Button, StyleSheet, SafeAreaView} from 'react-native';
import { useColorScheme } from 'react-native';

const SettingsScreen = () => {
    const colorScheme = useColorScheme();

    const toggleTheme = () => {
        // Implement theme toggle logic
        console.log('Toggle theme');
    };

    const changeLanguage = () => {
        // Implement language change logic
        console.log('Change language');
    };

    const handleLogout = () => {
        // Implement logout logic
        console.log('Logout');
    };
    const viewTOS = () => {
        // Implement logout logic
        console.log('TOS');
    };
    const changeCredentials = () => {
        // Implement logout logic
        console.log('change credentials');
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
            <View  style={styles.logoutButton}>
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
});

export default SettingsScreen;
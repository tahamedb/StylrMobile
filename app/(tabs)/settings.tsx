import React from 'react';
import { View, Text, Switch, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { authService } from '@/services/auth/authService';
import { useUser } from '@/contexts/UserContext';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

    const renderSettingItem = (icon: keyof typeof MaterialCommunityIcons.glyphMap, title: string, onPress: () => void) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress}>
            <View style={styles.settingLeft}>
                <MaterialCommunityIcons name={icon} size={24} color="#11181C" />
                <Text style={styles.settingText}>{title}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#11181C" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.mainSection}>
                        <View style={styles.section}>
                            <View style={styles.settingItem}>
                                <View style={styles.settingLeft}>
                                    <MaterialCommunityIcons name="weather-night" size={24} color="#11181C" />
                                    <Text style={styles.settingText}>Dark Mode</Text>
                                </View>
                                <Switch
                                    value={colorScheme === 'dark'}
                                    onValueChange={toggleTheme}
                                    trackColor={{ false: '#E4E7EB', true: '#0a7ea4' }}
                                    thumbColor={'#fff'}
                                />
                            </View>

                            {renderSettingItem('translate', 'Language', changeLanguage)}
                            {renderSettingItem('key-variant', 'Credentials', changeCredentials)}
                            {renderSettingItem('file-document-outline', 'Terms of Service', viewTOS)}
                        </View>

                        {/* Development section */}
                        <View style={[styles.section, styles.developmentSection]}>
                            <Text style={styles.sectionTitle}>Development</Text>
                            <TouchableOpacity 
                                style={styles.devButton}
                                onPress={handleInjectTestData}
                            >
                                <Text style={styles.devButtonText}>Inject Test Data</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.devButton, styles.logoutButton]}
                                onPress={handleLogout}
                            >
                                <Text style={[styles.devButtonText, styles.logoutText]}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F3F5',
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#11181C',
    },
    content: {
        flex: 1,
    },
    mainSection: {
        flex: 1,
    },
    section: {
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    developmentSection: {
        marginTop: 24,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F3F5',
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 16,
        marginLeft: 12,
        color: '#11181C',
    },
    devButton: {
        backgroundColor: '#f3f4f6',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    devButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    logoutButton: {
        marginTop: 4,
    },
    logoutText: {
        color: '#FF3B30',
    },
});

export default SettingsScreen;
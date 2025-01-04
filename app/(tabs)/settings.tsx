import React from 'react';
import { View, Switch, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { authService } from '@/services/auth/authService';
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/context/ThemeContext';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const SettingsScreen = () => {
    const router = useRouter();
    const { setUser } = useUser();
    const { isDark, toggleTheme, colors } = useTheme();

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
        console.log('TOS');
    };

    const changeCredentials = () => {
        console.log('change credentials');
    };

    const changeLanguage = () => {
        console.log('Change language');
    };

    return (
        <ThemedView style={styles.container}>
            <View style={[styles.innerContainer, { borderColor: colors.border }]}>
                <ThemedText style={styles.header}>Settings</ThemedText>

                <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                    <ThemedText style={styles.settingText}>Dark Mode</ThemedText>
                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        trackColor={{ false: '#767577', true: colors.primary }}
                        thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
                    />
                </View>

                <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                    <ThemedText style={styles.settingText}>Language</ThemedText>
                    <Button title="Change Language" onPress={changeLanguage} color={colors.primary} />
                </View>

                <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                    <ThemedText style={styles.settingText}>Credentials</ThemedText>
                    <Button title="Change Credentials" onPress={changeCredentials} color={colors.primary} />
                </View>

                <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
                    <ThemedText style={styles.settingText}>Terms of Service</ThemedText>
                    <Button title="View Terms of Service" onPress={viewTOS} color={colors.primary} />
                </View>

                <View style={styles.logoutButton}>
                    <Button title="Logout" onPress={handleLogout} color="#FF3B30" />
                </View>
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        padding: 20,
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
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    settingText: {
        fontSize: 18,
    },
    logoutButton: {
        marginTop: 30,
    },
});

export default SettingsScreen;
// Nouveau composant OutfitCreatedModal.tsx dans components/wardrobe
import React from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ClothingItem } from '@/types/api.types';

type OutfitCreatedModalProps = {
    visible: boolean;
    onClose: () => void;
    items: ClothingItem[];
};

export function OutfitCreatedModal({ visible, onClose, items }: OutfitCreatedModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ThemedText style={styles.modalTitle}>Outfit créé !</ThemedText>

                    <View style={styles.itemsContainer}>
                        {items.map((item) => (
                            <View key={item.id} style={styles.itemCard}>
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    style={styles.itemImage}
                                    resizeMode="cover"
                                />
                                <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                            </View>
                        ))}
                    </View>

                    <Pressable
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <ThemedText style={styles.closeButtonText}>Fermer</ThemedText>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    itemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemCard: {
        width: '48%',
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 10,
    },
    itemImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    itemName: {
        fontSize: 14,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});
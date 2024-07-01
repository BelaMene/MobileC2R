import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Modal, Text, TouchableOpacity } from 'react-native';
import { create } from './Create';
import { commonStyles } from './styles.js';

export function UpdateWeight() {
    const [updateId, setUpdateId] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newWeight, setNewWeight] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const update = async () => {
        try {
            const db = await create();
            const result = await db.runAsync(`UPDATE weights SET date = ?, weight = ? WHERE id = ?;`, [newDate, newWeight, updateId]);

            if (result.changes > 0) {
                Alert.alert('Success', 'Weight updated', [{ text: 'Ok' }], { cancelable: false });
                setUpdateId('');
                setNewDate('');
                setNewWeight('');
            } else {
                Alert.alert('Error', 'Error updating weight');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'An error occurred while updating the weight');
        }
        setModalVisible(false);
    };

    return (
        <View style={commonStyles.container}>
            <Button title="Update Weight" onPress={() => setModalVisible(true)} color={"#9F1905"}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={commonStyles.centeredView}>
                    <View style={commonStyles.modalView}>
                        <Text style={commonStyles.modalText}>Enter ID to Update</Text>
                        <TextInput
                            placeholder="ID"
                            value={updateId}
                            onChangeText={setUpdateId}
                            style={commonStyles.input}
                            keyboardType="numeric"
                        />
                        <Text style={commonStyles.modalText}>Enter New Date</Text>
                        <TextInput
                            placeholder="Date (YYYY-MM-DD)"
                            value={newDate}
                            onChangeText={setNewDate}
                            style={commonStyles.input}
                        />
                        <Text style={commonStyles.modalText}>Enter New Weight</Text>
                        <TextInput
                            placeholder="Weight"
                            value={newWeight}
                            onChangeText={setNewWeight}
                            keyboardType="numeric"
                            style={commonStyles.input}
                        />
                        <View style={commonStyles.buttonContainer}>
                            <TouchableOpacity
                                style={commonStyles.button}
                                onPress={update}
                            >
                                <Text style={commonStyles.textStyle}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[commonStyles.button, commonStyles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={commonStyles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

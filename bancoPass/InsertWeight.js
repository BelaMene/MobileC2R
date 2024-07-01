import React, { useState } from 'react';
import { Alert, View, TextInput, Button, Modal, Text, TouchableOpacity } from 'react-native';
import { create } from './Create.js';
import { commonStyles } from './styles.js';

export function InsertWeight() {
    const [date, setDate] = useState('');
    const [weight, setWeight] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const insert = async () => {
        try {
            const db = await create();
            const result = await db.runAsync(`INSERT INTO weights (date, weight) VALUES (?, ?);`, [date, weight]);

            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    'Weight recorded',
                    [{ text: 'Ok' }],
                    { cancelable: false }
                );
                setDate('');
                setWeight('');
            } else {
                Alert.alert('Error', 'Error recording weight');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'An error occurred while recording the weight');
        }
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={commonStyles.container}>
            <Button title="Insert Weight" onPress={toggleModal} color={"#9F1905"}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={commonStyles.centeredView}>
                    <View style={commonStyles.modalView}>
                        <Text style={commonStyles.modalText}>Enter Date</Text>
                        <TextInput
                            placeholder="Date (YYYY-MM-DD)"
                            value={date}
                            onChangeText={setDate}
                            style={commonStyles.input}
                        />
                        <TextInput
                            placeholder="Weight"
                            value={weight}
                            onChangeText={setWeight}
                            keyboardType="numeric"
                            style={commonStyles.input}
                        />
                        <View style={commonStyles.buttonContainer}>
                            <TouchableOpacity onPress={insert} style={commonStyles.button}>
                                <Text style={commonStyles.textStyle}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={[commonStyles.button, commonStyles.buttonClose]}>
                                <Text style={commonStyles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

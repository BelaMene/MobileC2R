import React, { useState } from 'react';
import { Alert, Button, FlatList, Text, View, Modal, TouchableOpacity } from 'react-native';
import { create } from './Create';
import { commonStyles } from './styles';

export function AllWeights() {
    const [flatListItems, setFlatListItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const getAll = async () => {
        try {
            const db = await create();
            const allRows = await db.getAllAsync('SELECT * FROM weights');
            setFlatListItems(allRows);

            if (allRows.length === 0) {
                Alert.alert('Warning', 'No weights recorded', [{ text: 'Ok' }], { cancelable: false });
            } else {
                setModalVisible(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const listItemView = (item) => (
        <View key={item.id} style={commonStyles.itemContainer}>
            <Text style={commonStyles.textHeader}>ID</Text>
            <Text style={commonStyles.textBottom}>{item.id}</Text>

            <Text style={commonStyles.textHeader}>Date</Text>
            <Text style={commonStyles.textBottom}>{item.date}</Text>

            <Text style={commonStyles.textHeader}>Weight</Text>
            <Text style={commonStyles.textBottom}>{item.weight}</Text>
        </View>
    );

    return (
        <View style={commonStyles.container}>
            <Button title="List Weights" onPress={getAll} color={"#9F1905"}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={commonStyles.centeredView}>
                    <View style={commonStyles.modalView}>
                        <TouchableOpacity style={commonStyles.closeButtonX} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={commonStyles.closeButtonTextX}>X</Text>
                        </TouchableOpacity>
                        <FlatList
                            style={{ marginTop: 30 }}
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                            data={flatListItems}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => listItemView(item)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

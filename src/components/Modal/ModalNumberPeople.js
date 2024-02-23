import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const ModalNumberPeople = ({ isVisible, onClose, onSelectNumberPeople }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const numberPeopleOptions = [
    { label: '1 person', value: 1 },
    { label: '2 people', value: 2 },
    { label: '3 people', value: 3 },
    { label: '4 people', value: 4 },
    { label: '6 people', value: 6 },
  ];

  return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View
        style={{
          justifyContent: 'flex-end',
          backgroundColor: '#000000AA',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: 200,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10,
          }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Number of People</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={numberPeopleOptions}
            setOpen={setOpen}
            setValue={setValue}
            placeholder="Select number of people"
            containerStyle={{ marginTop: 10 }}
            style={{
              borderColor: '#2ccce4',
              backgroundColor: '#fff',
            }}
            textStyle={{ fontSize: 16, color: '#333' }}
            dropDownContainerStyle={{ borderColor: '#2ccce4' }}
            arrowColor="#2ccce4"
            onChangeValue={(selectedValue) => {
              console.log('Selected Number of People: ', selectedValue);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (value !== null) {
                onSelectNumberPeople(value);
                onClose();
              }
            }}
            style={{
              backgroundColor: '#2ccce4',
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Text style={{ color: '#fff' }}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalNumberPeople;

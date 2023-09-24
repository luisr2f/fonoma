import React, { useState, useRef, useEffect } from "react";
import { Button, View, Text, TextInput, ScrollView } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'

import { styleGlobal } from "../../_global/styleGlobal";
import Colors from "../../_global/colors";

export default function Exchange() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const data = [
    { key: '1', value: 'Mobiles' },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers' },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ]

  const printSelect = (type: "from" | "to") => {
    return (<>
      <View style={styleGlobal.field}>
        <Text style={styleGlobal.textInputLabel}>
          {type === "from" ? "From" : "To"} *
        </Text>
        <SelectList
          boxStyles={styleGlobal.selectList}
          placeholder={"Select your currency ("+type+")"}
          setSelected={(val) => type === "from" ? setFrom(val) : setTo(val)}
          data={data}
          //defaultOption={data[0]}
          save="key"
        />
      </View>
    </>)

  }

  return (
    <ScrollView style={styleGlobal.scrollView} keyboardShouldPersistTaps="handled">

      <View style={styleGlobal.field}>
        <View style={[styleGlobal.textInputCntMain]}>
          <Text style={styleGlobal.textInputLabel}>
            Amount *
          </Text>
          <View style={[styleGlobal.textInputCnt]}>
            <TextInput
              keyboardType={"numeric"}
              style={[styleGlobal.textInput]}
              placeholder={'Insert amount'}
              placeholderTextColor={Colors.gray}
              onChangeText={text => {
                setAmount(text);
              }}
              value={amount}
            />
          </View>
        </View>

        {printSelect("from")}

        {printSelect("to")}

      </View>
    </ScrollView>
  );
}
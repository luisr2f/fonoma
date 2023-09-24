import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'

import { styleGlobal } from "../../_global/styleGlobal";
import Colors from "../../_global/colors";

import { useAppDispatch, useAppSelector } from "../../_redux/hooks";
import { fetch as symbolListFetch } from "../../_redux/slices/symbolListSlice";
import { fetch as exchangeRateFetch } from "../../_redux/slices/exchangeRateSlice";


import { EXCHANGERATES_API } from '@env'
import { SelectData } from "../../types/SelectData";

export default function Exchange() {

  const dispatch = useAppDispatch();

  const minutesLoadRates = 10

  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectData, setSelectData] = useState<SelectData[]>([]);

  const symbolList = useAppSelector(state => state.symbolList);
  const exchangeRate = useAppSelector(state => state.exchangeRate);


  useEffect(() => {
    !symbolList.loading && symbolList.result === null && dispatch(symbolListFetch());
  }, [dispatch]);

  useEffect(() => {
    if (!symbolList.loading && symbolList.result !== null && Object.keys(symbolList.result).length > 0) {
      let selectDatatemp: SelectData[] = []
      Object.keys(symbolList.result)
        .map((item) =>
          selectDatatemp.push({ key: item, value: item + " - " + String(symbolList.result?.[item]) })
        )
      setSelectData(selectDatatemp)
    }
  }, [symbolList]);


  const printSelect = (type: "from" | "to") => {
    return (<>
      <View style={styleGlobal.field}>
        <Text style={styleGlobal.textInputLabel}>
          {type === "from" ? "From" : "To"} *
        </Text>
        <SelectList
          boxStyles={styleGlobal.selectList}
          placeholder={"Select your currency (" + type + ")"}
          setSelected={(val) => type === "from" ? setFrom(val) : setTo(val)}
          data={selectData}
          defaultOption={selectData.find((item) => item.key === (type === "from" ? from : to))}
          save="key"
        />
      </View>
    </>)

  }


  const send = () => {
   
    let recharge = true

    if (exchangeRate.result !== null && exchangeRate.result.time > 0) {
      const diffMs = Date.now() - exchangeRate.result.time
      const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
      if (diffMins<minutesLoadRates) {
        recharge = false
      } 
    }
    if (recharge) {
      dispatch(exchangeRateFetch())
    } else {

    }

  }

  const calc = () => {

  }

  return (
    <ScrollView style={styleGlobal.scrollView} keyboardShouldPersistTaps="handled">

      {symbolList.loading ?
        <>
          <View style={styleGlobal.center}>
            <ActivityIndicator color={Colors.primary} size="small" />
          </View>
        </> :
        <>
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
          </View>

          {printSelect("from")}

          {printSelect("to")}

          <TouchableOpacity
            style={[styleGlobal.btn]}
            activeOpacity={0.8}
            //disabled={disable}
            onPress={() => {
              send();
            }}
          >
            {false ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <Text style={[styleGlobal.btnTxt]}>Calculate</Text>
            )}
          </TouchableOpacity>

        </>
      }


      <Text>{JSON.stringify(exchangeRate, null, 8)}</Text>
      <Text>{JSON.stringify(amount, null, 8)}</Text>
      <Text>{JSON.stringify(from, null, 8)}</Text>
      <Text>{JSON.stringify(to, null, 8)}</Text>




    </ScrollView>
  );
}
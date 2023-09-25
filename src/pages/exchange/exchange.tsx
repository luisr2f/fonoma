import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, Keyboard, Dimensions } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import moment from "moment";
import { Entypo } from '@expo/vector-icons';

import { styleGlobal } from "../../_global/styleGlobal";
import { style } from "./exchangeStyle";
import Colors from "../../_global/colors";

import { useAppDispatch, useAppSelector } from "../../_redux/hooks";
import { fetch as symbolListFetch } from "../../_redux/slices/symbolListSlice";
import { fetch as exchangeRateFetch } from "../../_redux/slices/exchangeRateSlice";

import { SelectData } from "../../types/SelectData";
import { truncateDecimals } from "../../_global/helpers";
import Message from "../../_components/message";

export default function Exchange() {

  const dispatch = useAppDispatch();
  const scrollRef = useRef<ScrollView>();


  const minutesLoadRates = 10;

  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [total, setTotal] = useState<null | number>(null);
  const [selectData, setSelectData] = useState<SelectData[]>([]);
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);


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

  useEffect(() => {
    if (!exchangeRate.loading && exchangeRate.result !== null && Object.keys(exchangeRate.result).length > 0) {
      calculate();
    }
  }, [exchangeRate]);

  useEffect(() => {
    validateForm();
    setTotal(null);
  }, [amount, from, to]);

  const validFieldForm = (nameField: string) => {
    if (!isFormValid && submit && errors[nameField] && errors[nameField] !== "") {
      return errors[nameField];
    } else {
      return "";
    }
  };

  const validateForm = () => {
    let errorsForm: { [key: string]: string } = {};

    if (!(Number(amount) > 0)) {
      errorsForm.amount = "Amount is required.";
    }
    if (from === "") {
      errorsForm.from = "(Currency From) is required.";
    }
    if (to === "") {
      errorsForm.to = "(Currency To) is required.";
    }

    setErrors(errorsForm);
    setIsFormValid(Object.keys(errorsForm).length === 0);
  };


  const printSelect = (type: "from" | "to") => {
    const error = validFieldForm(type)
    let styleSelect = styleGlobal.selectList;
    if (error !== "") {
      styleSelect = {...styleSelect, ...styleGlobal.selectListError}
    }
    return (<>
      <View style={styleGlobal.field}>
        <Text style={styleGlobal.textInputLabel}>
          Currency {type === "from" ? "From" : "To"} *
        </Text>
        <SelectList
          boxStyles={styleSelect}
          placeholder={"Select your currency (" + type + ")"}
          setSelected={(val) => type === "from" ? setFrom(val) : setTo(val)}
          data={selectData}
          defaultOption={selectData.find((item) => item.key === (type === "from" ? from : to))}
          save="key"
        />
        {error !== "" && <Text style={styleGlobal.textInputTextError}>{error}</Text>}
      </View>
    </>)

  }

  const printTextInputAmount = () => {
    const error = validFieldForm("amount")
    return (
      <>
        <View style={styleGlobal.field}>
          <View style={[styleGlobal.textInputCntMain, error !== "" && styleGlobal.textInputCntMainError]}>
            <Text style={styleGlobal.textInputLabel}>
              Amount *
            </Text>
            <View style={[styleGlobal.textInputCnt, error !== "" && styleGlobal.textInputError]}>
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
            {error !== "" && <Text style={styleGlobal.textInputTextError}>{error}</Text>}
          </View>
        </View>
      </>)
  }


  const send = () => {
    setSubmit(true);
    Keyboard.dismiss();
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    if (isFormValid) {
      let recharge = true
      if (exchangeRate.error === "" && exchangeRate.result !== null && exchangeRate.result.time > 0) {
        const now = moment().unix();
        const duration = moment.duration(moment.unix(now).diff(moment.unix(exchangeRate.result.time)));
        const minutes = duration.asMinutes();
        if (minutes < minutesLoadRates) {
          recharge = false
        }
      }
      if (recharge) {
        dispatch(exchangeRateFetch())
      } else {
        calculate()
      }
    }
  }

  const calculate = () => {
    const rates = exchangeRate.result?.rates
    if (rates !== undefined && rates[from] !== undefined && rates[to] !== undefined && amount !== "") {
      setTotal(Number(amount) * rates[to] / rates[from])
    } else {
      setTotal(null)
    }
  }

  const btnChange = () => {
    const valid = to!== "" && from !== "" 
    return (
      <>
        <TouchableOpacity
          style={[styleGlobal.btnIcon, !valid && styleGlobal.btnDisable]}
          activeOpacity={0.8}
          disabled={!valid}
          onPress={() => {
            setTo(from)
            setFrom(to)
          }}
        >
          <Entypo name="cycle" size={24} color={Colors.white} />
        </TouchableOpacity>
      </>
    )
  }

  return (
    <ScrollView ref={scrollRef} style={styleGlobal.scrollView} keyboardShouldPersistTaps="handled">

      {symbolList.loading ?
        <>
          <View style={styleGlobal.center}>
            <ActivityIndicator color={Colors.primary} size="small" />
          </View>
        </> :
        <>
          {symbolList.error !== "" && <Message type="error" text={symbolList.error} />}
          {submit && !isFormValid && <Message type="error" text={"Complete the form"} />}
          {submit && exchangeRate.error !== "" && <Message type="error" text={exchangeRate.error} />}

          {printTextInputAmount()}

          <View style={style.selectCnt}>
            <View style={style.selectCol}>
              {printSelect("from")}
              {printSelect("to")}
            </View>
            <View >
            <View style={style.selectBtnCol}>
              {btnChange()}     
              </View>         
            </View>
          </View>

          <TouchableOpacity
            style={[styleGlobal.btn]}
            activeOpacity={0.8}
            disabled={exchangeRate.loading}
            onPress={() => {
              send();
            }}
          >
            {exchangeRate.loading ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <>
              <Entypo name="calculator" size={24} color={Colors.white} />
              <Text style={[styleGlobal.btnTxt]}>Calculate</Text>
              </>
            )}
          </TouchableOpacity>

          {total && !exchangeRate.loading &&
            <>
              <View style={style.totalCnt}>
                <View style={style.elem}>
                  <View style={style.value}><Text style={style.fromText}>{amount}</Text></View>
                  <View style={style.currencyCtn}><Text style={style.currencyText}>{from}</Text></View>
                </View>
                <View style={style.line}>
                  <View style={style.lineBlock}>
                    <Text style={style.lineText}>equivalent</Text>
                  </View>
                </View>
                <View style={style.elem}>
                  <View style={style.value}><Text style={style.toText}>{truncateDecimals(total, 6)}</Text></View>
                  <View style={style.currencyCtn}><Text style={style.currencyText}>{to}</Text></View>
                </View>
                <Text style={style.date}>Date rates: {exchangeRate.result?.time && moment(new Date(exchangeRate.result?.time * 1000)).format('MMMM Do YYYY, HH:mm')}</Text>
              </View>
            </>}
        </>
      }
      <View style={styleGlobal.scrollButton}/>
    </ScrollView>
  );
}
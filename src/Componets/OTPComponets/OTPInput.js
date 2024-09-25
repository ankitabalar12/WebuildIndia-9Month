

import React, { useState, useEffect,useRef  } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = ({ length, onComplete }) => {
  const [otp, setOTP] = useState(Array(length).fill(''));
  const inputRefs = Array(length).fill(0).map((_, i) => useRef(null));
  const handleInput = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;

    setOTP(newOTP);

    // Check if all OTP digits are entered
    if (!newOTP.includes('')) {
      onComplete(newOTP.join(''));
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0 && otp[index] === '') {
      const newOTP = [...otp];
      newOTP[index - 1] = '';
      setOTP(newOTP);
      inputRefs[index - 1].current.focus(); // Focus on the previous input
    }
  };
  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={digit}
          onChangeText={(value) => handleInput(index, value)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
          keyboardType="numeric"
          returnKeyType={index === length - 1 ? 'done' : 'next'}
          autoFocus={index === 0} // Auto-focus on the first input
          maxLength={1}
          ref={inputRefs[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:'8%',
    marginHorizontal:'12%'
  },
  input: {
    width: 40,
    height: 40,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor:'#fff',
    borderRadius:5, marginHorizontal:'1%'
  },
});

export default OTPInput;

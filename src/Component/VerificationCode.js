// import React, { useState } from "react";
// import { Button, View } from "react-native";
// import { TextInput } from "react-native-paper";


// const generateRandomCode= ()=>{
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let code = '';
//     for (let i = 0; i < 4; i++) {
//         code += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     console.log('Randomcode',code)
//     return code;
// }

// const VerificationCode =()=>{
//     const [randomCode,setRandomCode] = useState(generateRandomCode())
//     const regenerateCode = () => {
//         setRandomCode(generateRandomCode());
//       };


// return(
//     <View className='flex-row'>
//         <TextInput
//             placeholder="輸入驗證碼"
//         />
//         <Button title ={randomCode} onPress={regenerateCode} />

//     </View>

// )
// }
// export default VerificationCode
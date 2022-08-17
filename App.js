import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import AppStackScreen from './src/stack/StackScreen'
import { UserProvider } from './src/context/UserContext'
import { FirebaseProvider } from './src/context/FirebaseContext'

//Art Gallery Application
//UI:
//1-Login/Signup Screens
//2-Home Screen to view and interact with posts
//3-Posting Screen
//4-Art Store Screen
//5-Cart Screen
//6-Profile Screen

export default App = () => {
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStackScreen />
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
  )
}

import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const PagesLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="questbitdetails"
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="questdetails"
          options={{
            headerShown:false
          }}
        />
      </Stack>
    </>
  )
}

export default PagesLayout;
import { View, Text, SafeAreaView, StatusBar, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Categories from '../components/categories'
import FeatureRow from '../components/featuredRow'
import { getFeaturedResturants } from '../api';
import * as Icon from "react-native-feather";
import { themeColors } from '../theme'

export default function HomeScreen() {
      const [featuredCategories, setFeaturedCategories] = useState([])
    const navigation = useNavigation();
    useLayoutEffect(() => {
      navigation.setOptions({headerShown: false})
    }, [])
    useEffect(()=>{
        getFeaturedResturants().then(data=>{
            setFeaturedCategories(data);
        })
    },[]);
  return (
    <SafeAreaView className="bg-white">
      {/* Search bar */}
      <StatusBar barStyle="dark-content" />
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder="Restaurants" className="ml-2 flex-1" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-gray-300">
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text className="text-gray-600">Long Beach, CA</Text>
          </View>
        </View>

        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 bg-gray-300 rounded-full"
        >
          <Icon.Sliders
            height="20"
            width="20"
            strokeWidth={2.5}
            stroke="white"
          />
        </View>
              </View>

        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom:20
        }}>
          {/* categories */}
          <Categories/>
            {/* featured */}
        <View className="mt-5">
        {
                        featuredCategories?.map(category=>{
                return (
                        <FeatureRow 
                            key={category._id}
                            id={category._id}
                            title={category.name}
                            resturants={category?.restaurants}
                            description={category.description}
                            featuredCategory={category._type}
                        />
                )
            })
        }
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}

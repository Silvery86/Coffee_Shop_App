import React from 'react'
import { ScrollView, StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import { useStore } from '../store/store';
import FavoritesItemCard from '../components/FavoritesItemCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';



const FavoritesScreen = ({ navigation}: any) => {
  const FavoritesList = useStore((state: any) => state.FavoritesList);
  const tabBarHeight = useBottomTabBarHeight();
  const addToFavouriteList = useStore((state: any) => state.addToFavouriteList)
  const deleteToFavouriteList = useStore((state: any) => state.deleteToFavouriteList)
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteToFavouriteList(type, id) : addToFavouriteList(type, id)
  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Favourites' />

            {FavoritesList.length == 0
              ? (<EmptyListAnimation title='No Favourite' />)
              : (
                <View style={styles.ListItemContainer}>
                  {FavoritesList.map((data: any) => (
                    
                    <TouchableOpacity
                      onPress={() => {
                        navigation.push('Details', {
                          index: data.index,
                          id: data.id,
                          type: data.type,
                        });
                      }}
                      key={data.id}
                    >
                      <FavoritesItemCard
                        id={data.id}
                        name={data.name}
                        imagelink_portrait={data.imagelink_portrait}
                        special_ingredient={data.special_ingredient}
                        type={data.type}
                        ingredients={data.ingredients}
                        average_rating={data.average_rating}
                        ratings_count={data.ratings_count}
                        roasted={data.roasted}
                        description={data.description}
                        favourite={data.favourite}
                        ToggleFavouriteItem={ToggleFavourite}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}

          </View>

        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
})

export default FavoritesScreen
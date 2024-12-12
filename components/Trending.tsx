import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useState } from "react";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";

const zoomIn: any = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut: any = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: any) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay={play}
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && !status.isPlaying) {
              setPlay(false); // Only set to false when the video finishes playing
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className=" rounded-xl relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
const Trending = ({ posts }: { posts: any }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item: any) => item.$id}
      renderItem={({
        item,
      }: {
        item: {
          id: string;
          title: string;
          thumbnail: string;
          prompt: string;
          video: string;
          creator: any;
        };
      }) => <TrendingItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;

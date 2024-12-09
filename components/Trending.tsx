import { View, Text, FlatList } from "react-native";
import React from "react";

const Trending = ({ posts }: { posts: any }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }: { item: { id: string; title: string } }) => (
        <Text className="text-3xl text-white">{item.title}</Text>
      )}
      horizontal
    />
  );
};

export default Trending;

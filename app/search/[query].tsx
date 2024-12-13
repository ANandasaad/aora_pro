import { Alert, FlatList, Image, SafeAreaView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import SearchInput from "@/components/SearchInput";

import EmptyState from "@/components/EmptyState";
import { SearchPosts } from "@/lib/appwrite";

import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const safeQuery = Array.isArray(query) ? query.join(" ") : query; // Ensure query is a string
  const { data: posts, refetch } = useAppwrite(() =>
    SearchPosts({ query: safeQuery })
  );

  const onRefresh = async () => {
    // TODO: if video is loaded
    await refetch();
  };
  useEffect(() => {
    if (typeof refetch === "function") {
      // Ensure refetch is a function
      onRefresh();
    }
  }, [query]);

  return (
    <SafeAreaView className=" bg-primary h-full">
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
        }) => (
          <VideoCard
            id={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            prompt={item.prompt}
            video={item.video}
            creator={item.creator}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-gray-100 text-2xl font-semibold">
              {query}
            </Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;

import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, SignInUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submitForm = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please enter all required fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await SignInUser({
        email: form.email,
        password: form.password,
      });
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      // set it to global state

      router.replace("/home");
    } catch (error) {
      Alert.alert(
        "Error",
        (error as { message?: string })?.message || "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center  min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            placeholder="Email"
            otherStyle="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            placeholder="Password"
            otherStyle="mt-7"
            keyboardType="password"
          />
          <CustomButton
            title="Sign In"
            handlePress={submitForm}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href={"/signUp"}
              className="text-lg text-secondary font-psemibold"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

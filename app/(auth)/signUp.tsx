import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createAccount } from "@/lib/appwrite";
const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please enter all required fields");
    }
    setIsSubmitting(true);
    try {
      const result = await createAccount({
        email: form.email,
        password: form.password,
        username: form.username,
      });

      // set it to global state
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error as any);
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
            SignUp to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: any) => setForm({ ...form, username: e })}
            placeholder="Username"
            otherStyle="mt-7"
          />
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
            title="Sign Up"
            handlePress={submitForm}
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already Have an Account?
            </Text>
            <Link
              href={"/signIn"}
              className="text-lg text-secondary font-psemibold"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

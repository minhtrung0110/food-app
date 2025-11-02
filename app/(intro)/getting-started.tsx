import {View, Text, Image, Dimensions, ScrollView, NativeScrollEvent, NativeSyntheticEvent} from "react-native";
import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import {Button} from "@/components/atoms/Button";



const { width } = Dimensions.get("window");
const SLIDES = [
    require("@/assets/landing/banner-01.png"),
    require("@/assets/landing/banner-02.png"),
    require("@/assets/landing/banner-03.png"),
];


export default function GettingStarted() {
    const [index, setIndex] = useState(0);
    const scrollRef = useRef<ScrollView>(null);
    const router = useRouter();
    //const { completeIntro } = useSession();


    function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
        const x = e.nativeEvent.contentOffset.x;
        setIndex(Math.round(x / width));
    }


    async function onGetStarted() {
        //await completeIntro();
        router.replace("/(auth)/login");
    }


    return (
        <View className="flex-1 bg-white">
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
            >
                {SLIDES.map((src, i) => (
                    <View key={i} style={{ width }} className="items-center justify-center p-6">
                        <Image source={src} style={{ width: width - 48, height: width - 48, resizeMode: "contain" }} />
                        <Text className="mt-6 text-xl font-semibold">Fast delivery, fresh meals</Text>
                        <Text className="mt-2 text-neutral-500 text-center">Order your favorite food in seconds and track in real-time.</Text>
                    </View>
                ))}
            </ScrollView>


            {/* dots */}
            <View className="absolute bottom-28 left-0 right-0 flex-row items-center justify-center gap-2">
                {SLIDES.map((_, i) => (
                    <View key={i} className={`h-2 rounded-full ${i === index ? "w-6 bg-primary-500 " : "w-2 bg-neutral-300"}`} />
                ))}
            </View>


            <View className="absolute bottom-10 left-6 right-6">
                <Button variant={'primary'} onPress={onGetStarted} />
            </View>
        </View>
    );
}
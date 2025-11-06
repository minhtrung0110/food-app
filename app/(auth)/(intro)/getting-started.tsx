import {
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { Button } from '@/components/atoms/Button';
import useConfirmExitOnBack from '@/hooks/useConfirmExitOnBack';
import { ROUTES } from '@/constants/route';

type Slide = {
  image: ImageSourcePropType;
  title: string;
  desc: string;
};

const SLIDES: Slide[] = [
  {
    image: require('@/assets/images/landing/banner-01.png'),
    title: 'Fast delivery, fresh meals',
    desc: 'Order your favorite food in seconds and track in real-time.',
  },
  {
    image: require('@/assets/images/landing/banner-02.png'),
    title: 'Realtime order tracking',
    desc: 'Know exactly when your food arrives—minute by minute.',
  },
  {
    image: require('@/assets/images/landing/banner-03.png'),
    title: 'Exclusive daily deals',
    desc: 'Save more with promo codes and member-only discounts.',
  },
];

export default function GettingStarted() {
  useConfirmExitOnBack();
  const { width } = useWindowDimensions(); // responsive khi xoay màn hình
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(x / width));
  }

  const onGetStarted = () => router.push(ROUTES.AUTH.signIn);

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="mt-24"
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        {SLIDES.map((item, i) => (
          <View key={i} style={{ width }}>
            <View className="items-center">
              <Image
                source={item.image}
                style={{ width: width - 70, height: width - 70, resizeMode: 'contain' }}
              />
            </View>

            <View className="mt-16 w-full items-center px-8">
              <Text className="text-center text-2xl leading-8 font-semibold text-neutral-800">
                {item.title}
              </Text>
              <Text className="mt-2 text-center leading-6 text-neutral-500">{item.desc}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* dots */}
      <View className="absolute right-0 bottom-60 left-0 flex-row items-center justify-center gap-2">
        {SLIDES.map((_, i) => (
          <View
            key={i}
            className={`h-2 rounded-full ${i === index ? 'bg-primary-500 w-7' : 'w-2 bg-neutral-100'}`}
          />
        ))}
      </View>

      <View className="absolute inset-x-10 bottom-16">
        <Button
          variant="primary"
          onPress={onGetStarted}
          label="Get started"
          textClassName="font-bold text-lg"
          className="h-14"
        />
      </View>
    </View>
  );
}

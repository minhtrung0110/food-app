import { View } from 'react-native';

const SkeletonRow = () => (
  <View className="flex-row items-start gap-2">
    <View className="h-[26] w-[26] rounded-full bg-neutral-100" />
    <View className="min-w-0 flex-1">
      <View className="h-4 w-4/5 rounded bg-neutral-100" />
      <View className="mt-2 h-3 w-2/5 rounded bg-neutral-100" />
    </View>
  </View>
);

export const SkeletonList = ({ count = 6 }: { count?: number }) => (
  <View className="gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonRow key={i} />
    ))}
  </View>
);

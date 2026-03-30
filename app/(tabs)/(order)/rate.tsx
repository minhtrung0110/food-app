import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Star } from 'lucide-react-native';
import { COLOR } from '@/constants/Colors';
import { AppImage } from '@/components/atoms/AppImage';

// Figma Neutral 800 (#172B4D) — not in COLOR palette
const TEXT_DARK = '#172B4D';
// Figma primary accent #EF9F27 — approx: closest token is primary-400 #FF991F
const ORANGE = COLOR.primary[400];
const TEXT_MUTED = COLOR.neutral[100]; // #7A869A — exact match

const CHIPS = ['Good Service', 'On Time', 'Clean', 'Carefull', 'Work Hard', 'Polite'];
// Figma defaults: "On Time", "Clean", "Carefull" are active
const DEFAULT_ACTIVE = new Set(['On Time', 'Clean', 'Carefull']);

function ratingLabel(n: number) {
  if (n <= 1) return 'Terrible';
  if (n === 2) return 'Bad';
  if (n === 3) return 'Okay';
  if (n === 4) return 'Good';
  return 'Excellent';
}

export default function RateDriver() {
  const insets = useSafeAreaInsets();
  const [stars, setStars] = useState(5);
  const [active, setActive] = useState<Set<string>>(DEFAULT_ACTIVE);
  const [review, setReview] = useState('');

  function toggleChip(chip: string) {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(chip) ? next.delete(chip) : next.add(chip);
      return next;
    });
  }

  return (
    // Dark overlay background — Figma: #091E42 @ 40% opacity
    <View className="flex-1" style={{ backgroundColor: 'rgba(9,30,66,0.4)' }}>
      {/* Safe area spacer */}
      <View style={{ height: insets.top }} />

      {/* White content card — rounded-t-[30px], fills rest of screen */}
      <View className="flex-1 rounded-t-[30px] bg-white">
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}>

          {/* ── Title row ──────────────────────────────────────────────── */}
          <View className="items-center px-5 pb-8 pt-7">
            {/* approx: Figma pt=60px from top of screen; here pt=insets.top+28≈60px */}
            <Text
              style={{ color: TEXT_DARK, letterSpacing: -0.28 }}
              className="text-base font-bold leading-6">
              Rate Driver
            </Text>
          </View>

          {/* Divider · #EBECF0 approx → neutral-40 #DFE1E6 */}
          <View className="h-px bg-neutral-40" />

          {/* ── Driver section ─────────────────────────────────────────── */}
          {/* gap: 12px between profile image, name, and rating */}
          <View className="items-center gap-3 px-5 py-8">
            {/* approx: section gap 31px → py-8 (32px) */}

            {/* Profile image · 80×80 · circular */}
            <AppImage
              source={require('@/assets/images/logo.png')}
              className="h-20 w-20 rounded-full"
              contentFit="cover"
            />

            {/* Driver name · 16px medium · #172B4D */}
            <Text
              style={{ color: TEXT_DARK, letterSpacing: -0.28 }}
              className="text-base font-medium">
              Philippe Troussier
            </Text>

            {/* Star rating · 5 stars · 24px each · gap 1px */}
            <View className="flex-row" style={{ gap: 1 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Pressable key={n} onPress={() => setStars(n)} hitSlop={4}>
                  <Star
                    size={24}
                    color={ORANGE}
                    // approx: fill uses primary-400 #FF991F ≈ Figma #EF9F27
                    fill={n <= stars ? ORANGE : 'transparent'}
                    strokeWidth={1.5}
                  />
                </Pressable>
              ))}
            </View>

            {/* Rating label · 12px medium · #7A869A */}
            <Text
              style={{ color: TEXT_MUTED, letterSpacing: -0.24 }}
              className="text-xs font-medium leading-5">
              {ratingLabel(stars)}
            </Text>
          </View>

          {/* Divider */}
          <View className="h-px bg-neutral-40" />

          {/* ── Chips + review ─────────────────────────────────────────── */}
          {/* Container width 305px → mx-auto with max-w, gap 31px → py-8 */}
          <View className="items-center gap-8 px-[35px] py-8">
            {/* approx: Figma container 305px on 375px = 35px padding each side */}

            {/* Attribute chips · flex-wrap · gap 6px */}
            <View className="flex-row flex-wrap justify-center" style={{ gap: 6 }}>
              {CHIPS.map((chip) => {
                const isActive = active.has(chip);
                return (
                  <Pressable
                    key={chip}
                    onPress={() => toggleChip(chip)}
                    style={{
                      // Active: rgba(239,159,39,0.8) — approx: primary-400 at 80% opacity
                      backgroundColor: isActive ? 'rgba(239,159,39,0.8)' : COLOR.neutral[42],
                      borderRadius: 12,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                    }}>
                    <Text
                      style={{
                        color: isActive ? '#ffffff' : TEXT_DARK,
                        fontSize: 14,
                        fontWeight: '400',
                        letterSpacing: -0.2,
                        lineHeight: 20,
                      }}>
                      {chip}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Review text box · 15px radius · bg #F4F5F7 · padding 24px */}
            <View
              className="w-full bg-neutral-42"
              style={{ borderRadius: 15, padding: 24 }}>
              <TextInput
                multiline
                value={review}
                onChangeText={setReview}
                placeholder={
                  'Do you have something to share with Cook?\nLeave a review now! Your rating and comments will be displayed anonymously.'
                }
                placeholderTextColor={`${TEXT_DARK}80`}
                // approx: Figma placeholder opacity 50% → hex alpha 80 ≈ 128/255
                style={{
                  color: TEXT_DARK,
                  fontSize: 14,
                  fontWeight: '400',
                  letterSpacing: -0.2,
                  lineHeight: 20,
                  minHeight: 80,
                  textAlignVertical: 'top',
                }}
              />
            </View>

            {/* Next button · width 305px → w-full (within px-[35px] container)
                height auto · border-radius 15px · bg #EF9F27 */}
            <Pressable
              className="w-full items-center justify-center py-3"
              style={{
                borderRadius: 15,
                // approx: Figma #EF9F27 → primary-400 #FF991F
                backgroundColor: ORANGE,
              }}
              android_ripple={{ color: 'rgba(0,0,0,0.08)' }}>
              <Text
                style={{ color: '#ffffff', letterSpacing: -0.2 }}
                className="text-sm font-medium leading-5">
                Next
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

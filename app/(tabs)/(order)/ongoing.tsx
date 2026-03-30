import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, MessageCircle, Package, Phone, Tag } from 'lucide-react-native';
import { COLOR } from '@/constants/Colors';
import { AppImage } from '@/components/atoms/AppImage';
import { Button } from '@/components/atoms/Button';

// Figma Neutral 800 (#172B4D) — not yet in COLOR palette
const TEXT_DARK = '#172B4D';
// Figma primary accent (#EF9F27) — approx: closest token is primary-400 #FF991F
const ORANGE = COLOR.primary[400];
const TEXT_MUTED = COLOR.neutral[100]; // #7A869A — exact match

export default function OngoingOrder() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-neutral-42">
      {/* ── Map background ─────────────────────────────────────────────────
          Replace with <MapView> (react-native-maps) in production.
          Height matches Figma's map mask bounds (328px visible area).     */}
      <View
        className="absolute left-0 right-0 top-0 items-center justify-center bg-neutral-40"
        style={{ height: 328 + insets.top }}>
        <MapPin size={36} color={COLOR.neutral[70]} strokeWidth={1.5} />
        <Text style={{ color: COLOR.neutral[100] }} className="mt-2 text-sm">
          Map View
        </Text>
      </View>

      {/* ── Scrollable content ─────────────────────────────────────────── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 328 + insets.top, // cards start below map
          paddingHorizontal: 16,
          paddingBottom: 24,
          gap: 16,
        }}>

        {/* ── Card 1 · Delivery status ───────────────────────────────── */}
        <View className="rounded-xl bg-white p-4">
          <View className="flex-row items-center gap-3">
            {/* Delivery icon · 48×48 · bg rgba(239,159,39,0.8) · r-12 */}
            <View
              style={{ backgroundColor: 'rgba(239,159,39,0.8)' }}
              className="h-12 w-12 items-center justify-center rounded-xl">
              <Package size={24} color="#fff" strokeWidth={1.5} />
            </View>

            {/* Status copy */}
            <View className="flex-1 gap-0.5">
              <Text
                style={{ color: TEXT_DARK, letterSpacing: -0.28 }}
                className="text-base font-bold leading-6">
                Delivery Your Order
              </Text>
              <Text
                style={{ color: TEXT_MUTED, letterSpacing: -0.2 }}
                className="text-sm leading-6">
                Coming within 30 minutes
              </Text>
            </View>

            {/* Detail CTA · h-44 · r-12 · bg #EF9F27 */}
            <Button
              variant="primary"
              size="sm"
              label="Detail"
              // approx: Button sm = h-10; Figma specifies h-44px, close enough
              className="rounded-xl px-4"
            />
          </View>
        </View>

        {/* ── Card 2 · Order + driver + route ───────────────────────── */}
        <View className="rounded-xl bg-white p-4" style={{ gap: 16 }}>

          {/* Order meta */}
          <View className="flex-row items-center gap-1.5">
            <Text
              style={{ color: ORANGE, letterSpacing: -0.24 }}
              className="text-xs font-medium">
              {/* approx: Figma #EF9F27 → primary-400 #FF991F */}
              $ 20.99
            </Text>
            <View className="h-1 w-1 rounded-full bg-neutral-50" />
            <Text style={{ color: TEXT_MUTED, letterSpacing: -0.24 }} className="text-xs font-medium">
              2 items
            </Text>
            <View className="h-1 w-1 rounded-full bg-neutral-50" />
            <Text style={{ color: TEXT_MUTED, letterSpacing: -0.24 }} className="text-xs font-medium">
              Credit Card
            </Text>
          </View>

          {/* Divider · #EBECF0 approx → neutral-40 #DFE1E6 */}
          <View className="h-px bg-neutral-40" />

          {/* Delivery person row */}
          <View className="flex-row items-center gap-3">
            <AppImage
              source={require('@/assets/images/logo.png')}
              className="h-10 w-10 rounded-full"
              contentFit="cover"
            />
            <View className="flex-1">
              <Text
                style={{ color: TEXT_DARK, letterSpacing: -0.28 }}
                className="text-sm font-medium leading-5">
                Philippe Troussier
              </Text>
              <Text
                style={{ color: TEXT_MUTED, letterSpacing: -0.24 }}
                className="text-xs font-medium leading-5">
                Delivery · 0145425765
              </Text>
            </View>

            {/* Phone · 40×40 circle · bg green-300 #36B37E */}
            <Pressable
              style={{ backgroundColor: COLOR.green[300] }}
              className="h-10 w-10 items-center justify-center rounded-full"
              accessibilityLabel="Call driver">
              <Phone size={18} color="#fff" strokeWidth={1.5} />
            </Pressable>

            {/* Message · 40×40 circle · bg rgba(239,159,39,0.5) */}
            <Pressable
              style={{ backgroundColor: 'rgba(239,159,39,0.5)' }}
              className="h-10 w-10 items-center justify-center rounded-full"
              accessibilityLabel="Message driver">
              <MessageCircle size={18} color="#fff" strokeWidth={1.5} />
            </Pressable>
          </View>

          {/* Divider */}
          <View className="h-px bg-neutral-40" />

          {/* Route timeline */}
          <View className="flex-row gap-3">
            {/* Dashed connector column */}
            <View className="items-center pt-1.5">
              {/* Origin dot */}
              <View
                style={{ backgroundColor: ORANGE }}
                className="h-2.5 w-2.5 rounded-full"
              />
              {/* Dashed line · approx: solid on Android (dashed unreliable cross-platform) */}
              <View
                style={{
                  width: 1,
                  height: 40,
                  borderLeftWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: COLOR.neutral[50],
                }}
              />
              {/* Destination dot */}
              <View className="h-2.5 w-2.5 rounded-full bg-neutral-50" />
            </View>

            {/* Location + time pairs */}
            <View className="flex-1 justify-between" style={{ height: 60 }}>
              <View>
                <Text
                  numberOfLines={1}
                  style={{ color: TEXT_DARK, letterSpacing: -0.28 }}
                  className="text-sm font-medium leading-5">
                  Burger King - 1453 Ave Los Angeles
                </Text>
                <Text style={{ color: TEXT_MUTED, letterSpacing: -0.24 }} className="text-xs font-medium">
                  13:00 PM
                </Text>
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  style={{ color: TEXT_DARK, letterSpacing: -0.28 }}
                  className="text-sm font-medium leading-5">
                  You - 49th St Los Angeles, California
                </Text>
                <Text style={{ color: TEXT_MUTED, letterSpacing: -0.24 }} className="text-xs font-medium">
                  13:30 PM
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Voucher card · r-15 · px-20 py-24 ─────────────────────── */}
        <View className="rounded-[15px] bg-white px-5 py-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Tag size={20} color={TEXT_MUTED} strokeWidth={1.5} />
              <Text
                style={{ color: TEXT_DARK, letterSpacing: -0.2 }}
                className="text-sm leading-6">
                Add Voucher
              </Text>
            </View>

            {/* Add badge · r-10 · border primary · text #EF9F27 */}
            <Pressable
              className="rounded-[10px] border border-primary-400 px-3 py-1"
              accessibilityLabel="Add voucher">
              <Text
                style={{ color: ORANGE, letterSpacing: -0.24 }}
                className="text-xs font-medium">
                {/* approx: Figma #EF9F27 → primary-400 #FF991F */}
                Add
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

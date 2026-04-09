import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, MapPin, MinusCircle, Percent, PlusCircle, Wallet } from 'lucide-react-native';
import { AppImage } from '@/components/atoms/AppImage';
import { IconCurrency, IconLocation } from '@/components/atoms/Icons/filled';
import { COLOR } from '@/constants/Colors';
import type { ImageSourcePropType } from 'react-native';

// ─── Types ───────────────────────────────────────────────────────────────────

type PaymentMethod = 'paypal' | 'cash';

type OrderItem = {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  image: ImageSourcePropType;
};

// ─── Seed data ────────────────────────────────────────────────────────────────

const INITIAL_ITEMS: OrderItem[] = [
  {
    id: 1,
    name: 'Prime Beef - Pizza Beautiful',
    unitPrice: 10.5,
    quantity: 2,
    image: require('@/assets/images/products/burger.png'),
  },
  {
    id: 2,
    name: 'Double BBQ bacon cheese burger',
    unitPrice: 7.995,
    quantity: 2,
    image: require('@/assets/images/products/hamburger.png'),
  },
];

const DELIVERY_FEE = 0;

// ─── Sub-components ───────────────────────────────────────────────────────────

function OrderItemRow({
  item,
  onIncrement,
  onDecrement,
}: {
  item: OrderItem;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between px-5 py-5">
      {/* Thumbnail */}
      <View className="h-20 w-20 items-center justify-center overflow-hidden rounded-[15px] bg-white">
        <AppImage
          source={item.image}
          className="h-12 w-15"
          contentFit="contain"
        />
      </View>

      {/* Info + controls */}
      <View className="ml-3 flex-1 gap-2">
        <Text
          numberOfLines={1}
          className="text-[16px] font-medium leading-6 tracking-tight text-[#172B4D]">
          {item.name}
        </Text>
        <View className="flex-row items-center gap-4">
          {/* Quantity stepper */}
          <View className="flex-row items-center gap-1 rounded-[10px] bg-neutral-42 px-1 py-1">
            <TouchableOpacity
              onPress={onDecrement}
              hitSlop={8}
              className="h-6 w-6 items-center justify-center">
              <MinusCircle size={16} color={COLOR.neutral[100]} strokeWidth={1.5} />
            </TouchableOpacity>
            <Text className="w-6 text-center text-xs font-medium text-[#172B4D]">
              {item.quantity}
            </Text>
            <TouchableOpacity
              onPress={onIncrement}
              hitSlop={8}
              className="h-6 w-6 items-center justify-center">
              <PlusCircle size={16} color={COLOR.primary[400]} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
          {/* Unit price */}
          <Text className="text-xs font-medium text-primary-400">
            $ {item.unitPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}

function SummaryRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <View className="flex-row items-center justify-between">
      <Text
        className={
          bold
            ? 'text-[16px] font-medium leading-6 tracking-tight text-[#172B4D]'
            : 'text-[14px] leading-5 tracking-tight text-[#172B4D]'
        }>
        {label}
      </Text>
      <Text
        className={
          bold
            ? 'text-[16px] font-medium leading-6 tracking-tight text-primary-400'
            : 'text-[14px] leading-5 tracking-tight text-[#172B4D]'
        }>
        {value}
      </Text>
    </View>
  );
}

function PaymentCard({
  label,
  amount,
  selected,
  onPress,
  icon,
}: {
  label: string;
  amount: string;
  selected: boolean;
  onPress: () => void;
  icon: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        width: 145,
        height: 76,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: selected ? 'rgba(255, 235, 229, 0.5)' : COLOR.neutral[42],
      }}>
      {/* Icon — left col */}
      <View
        style={{
          position: 'absolute',
          left: 16,
          top: 0,
          bottom: 0,
          justifyContent: 'center',
        }}>
        {icon}
      </View>
      {/* Text — right col */}
      <View
        style={{
          position: 'absolute',
          left: 52,
          right: 14,
          top: 0,
          bottom: 0,
          justifyContent: 'center',
          gap: 2,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 24,
            letterSpacing: -0.4,
            color: selected ? COLOR.primary[400] : '#172B4D',
          }}
          numberOfLines={1}>
          {amount}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            lineHeight: 20,
            letterSpacing: -0.24,
            color: selected
              ? `${COLOR.primary[400]}80`
              : COLOR.neutral[100],
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ConfirmOrderScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<OrderItem[]>(INITIAL_ITEMS);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paypal');

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const total = subtotal + DELIVERY_FEE;
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleIncrement = (id: number) =>
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );

  const handleDecrement = (id: number) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );

  return (
    <View className="flex-1 bg-neutral-42">

      {/* ── Header ── */}
      <View style={{ paddingTop: insets.top }} className="bg-white">
        <View className="relative flex-row items-center justify-center px-4 pb-4 pt-3">
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={8}
            className="absolute left-4 h-10 w-10 items-center justify-center">
            <ChevronLeft size={24} color={COLOR.neutral[400]} strokeWidth={1.5} />
          </TouchableOpacity>
          <Text
            style={{ letterSpacing: -0.28 }}
            className="text-[16px] font-medium text-[#172B4D]">
            Confirm Order
          </Text>
        </View>
      </View>

      {/* ── Scrollable body ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 15, paddingBottom: 24, gap: 15 }}>

        {/* Delivery to card */}
        <View className="overflow-hidden rounded-[15px] bg-white">
          {/* Title row */}
          <Text
            style={{ letterSpacing: -0.28 }}
            className="px-5 py-4 text-[16px] font-bold text-[#172B4D]">
            Delivery to
          </Text>
          {/* Horizontal divider */}
          <View className="h-px bg-neutral-42" />
          {/* Content: address left, map right */}
          <View className="flex-row" style={{ minHeight: 120 }}>
            {/* Address info */}
            <View className="flex-1 justify-center gap-2 p-5">
              <Text
                style={{ letterSpacing: -0.24, lineHeight: 20 }}
                className="text-xs font-medium text-[#172B4D]">
                {'(323) 238-0678\n909-1/2 E 49th St\nLos Angeles, California(CA), 90011'}
              </Text>
              <View className="flex-row items-center gap-1">
                <IconLocation width={20} height={20} color={COLOR.neutral[100]} />
                <Text
                  style={{ letterSpacing: -0.24 }}
                  className="text-xs font-medium text-neutral-100">
                  1.5 km
                </Text>
              </View>
            </View>
            {/* Mini-map placeholder */}
            <View
              className="m-4 items-center justify-center overflow-hidden rounded-[15px] bg-neutral-42"
              style={{ width: 100 }}>
              <MapPin size={32} color={COLOR.primary[400]} strokeWidth={1.5} />
            </View>
          </View>
        </View>

        {/* Restaurant + order items card */}
        <View className="overflow-hidden rounded-[15px] bg-white">
          {/* Restaurant name */}
          <Text
            style={{ letterSpacing: -0.28 }}
            className="px-5 py-4 text-[16px] font-bold text-[#172B4D]">
            Burger King
          </Text>
          <View className="h-px bg-neutral-42" />

          {/* Items list */}
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <OrderItemRow
                item={item}
                onIncrement={() => handleIncrement(item.id)}
                onDecrement={() => handleDecrement(item.id)}
              />
              {index < items.length - 1 && (
                <View className="mx-5 h-px bg-neutral-42" />
              )}
            </React.Fragment>
          ))}

          {/* Full-width divider before summary */}
          <View className="h-px bg-neutral-42" />

          {/* Price breakdown */}
          <View className="gap-4 px-5 py-5">
            <SummaryRow
              label={`Subtotal (${totalItems} items)`}
              value={`$ ${subtotal.toFixed(2)}`}
            />
            <View className="h-px bg-neutral-42" />
            <SummaryRow label="Delivery" value={`$ ${DELIVERY_FEE.toFixed(2)}`} />
            <View className="h-px bg-neutral-42" />
            <SummaryRow label="Voucher" value="-" />
            <View className="h-px bg-neutral-42" />
            <SummaryRow
              label="Total"
              value={`$ ${total.toFixed(2)}`}
              bold
            />
          </View>
        </View>

        {/* Add Voucher row */}
        <View className="rounded-[15px] bg-white px-5 py-4.5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Percent size={20} color={COLOR.primary[400]} strokeWidth={1.5} />
              <Text
                style={{ letterSpacing: -0.2 }}
                className="text-[14px] text-[#172B4D]">
                Add Voucher
              </Text>
            </View>
            <TouchableOpacity
              style={{
                height: 24,
                borderRadius: 10,
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 235, 229, 0.4)',
                paddingHorizontal: 14,
                justifyContent: 'center',
              }}>
              <Text
                style={{ letterSpacing: -0.24 }}
                className="text-xs font-medium text-primary-400">
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ── Fixed bottom panel ── */}
      <View
        style={{ paddingBottom: Math.max(insets.bottom, 12) + 12 }}
        className="bg-white px-8.75 pt-8.75">
        {/* Payment method cards */}
        <View className="mb-6 flex-row gap-3.75">
          <PaymentCard
            label="Paypal"
            amount={`$ ${total.toFixed(2)}`}
            selected={paymentMethod === 'paypal'}
            onPress={() => setPaymentMethod('paypal')}
            icon={
              <Wallet
                size={24}
                color={
                  paymentMethod === 'paypal' ? COLOR.primary[400] : COLOR.neutral[100]
                }
                strokeWidth={1.5}
              />
            }
          />
          <PaymentCard
            label="Cash"
            amount={`$ ${total.toFixed(2)}`}
            selected={paymentMethod === 'cash'}
            onPress={() => setPaymentMethod('cash')}
            icon={
              <IconCurrency
                width={24}
                height={24}
                color={
                  paymentMethod === 'cash' ? COLOR.primary[400] : COLOR.neutral[100]
                }
              />
            }
          />
        </View>

        {/* Submit button */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="items-center rounded-[15px] bg-primary-400"
          style={{ height: 44 }}>
          <Text
            style={{ letterSpacing: -0.2 }}
            className="text-[14px] font-medium leading-[44px] text-white">
            Submit
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

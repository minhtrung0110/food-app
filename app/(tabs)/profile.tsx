import { COLOR } from '@/constants/Colors';
import {
  AtSign,
  Bell,
  BookOpen,
  ChevronRight,
  CreditCard,
  Lock,
  LogOut,
  MapPin,
  Star,
  User,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// #172B4D is "Neutral 800" in the Figma kit — not yet present in constants/Colors.ts
const TEXT_DARK = '#172B4D';
const TEXT_MUTED = COLOR.neutral[100]; // #7A869A
const ICON_COLOR = COLOR.neutral[100];

type SettingRowProps = {
  icon: React.ReactNode;
  label: string;
  sub: string;
  onPress?: () => void;
};

function SettingRow({ icon, label, sub, onPress }: SettingRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center min-h-[66px] py-3 gap-3">
      <View className="size-6 items-center justify-center">{icon}</View>
      <View className="flex-1">
        <Text style={{ color: TEXT_DARK }} className="text-sm font-medium leading-5">
          {label}
        </Text>
        <Text style={{ color: TEXT_MUTED }} className="text-xs font-medium leading-5">
          {sub}
        </Text>
      </View>
      <ChevronRight size={16} color={TEXT_DARK} strokeWidth={1.5} />
    </TouchableOpacity>
  );
}

type ToggleRowProps = {
  icon: React.ReactNode;
  label: string;
  sub: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
};

function ToggleRow({ icon, label, sub, value, onValueChange }: ToggleRowProps) {
  return (
    <View className="flex-row items-center min-h-[66px] py-3 gap-3">
      <View className="size-6 items-center justify-center">{icon}</View>
      <View className="flex-1">
        <Text style={{ color: TEXT_DARK }} className="text-sm font-medium leading-5">
          {label}
        </Text>
        <Text style={{ color: TEXT_MUTED }} className="text-xs font-medium leading-5">
          {sub}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: COLOR.neutral[40], true: COLOR.primary[400] }}
        thumbColor={COLOR.white}
        ios_backgroundColor={COLOR.neutral[40]}
      />
    </View>
  );
}

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

function SectionCard({ title, children }: SectionCardProps) {
  const items = React.Children.toArray(children);
  return (
    <View className="rounded-[15px] bg-white overflow-hidden">
      <View className="px-5 pt-4 pb-4">
        <Text style={{ color: TEXT_DARK }} className="text-sm font-bold">
          {title}
        </Text>
      </View>
      <View className="h-px bg-neutral-42" />
      <View className="px-5">
        {items.map((item, i) => (
          <View key={i}>
            {item}
            {i < items.length - 1 && <View className="h-px bg-neutral-42" />}
          </View>
        ))}
      </View>
    </View>
  );
}

export default function TabProfile() {
  const insets = useSafeAreaInsets();
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [promoNotificationsOn, setPromoNotificationsOn] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.neutral[42] }}>
      {/* Header */}
      <View style={{ paddingTop: insets.top }} className="bg-white px-4 pb-3">
        <View className="flex-row items-center justify-between h-11">
          <View className="w-8" />
          <Text style={{ color: TEXT_DARK }} className="text-base font-medium">
            Profile
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            className="size-8 items-center justify-center">
            <Bell size={20} color={TEXT_DARK} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Avatar + name */}
        <View className="bg-white items-center py-6 gap-3">
          <View className="size-20 rounded-full bg-neutral-42 overflow-hidden items-center justify-center">
            <User size={36} color={ICON_COLOR} strokeWidth={1.5} />
          </View>
          <Text style={{ color: TEXT_DARK }} className="text-base font-medium">
            Philippe Troussier
          </Text>
        </View>

        <View className="gap-4 px-4 pt-4">
          {/* General */}
          <SectionCard title="General">
            <SettingRow
              icon={<User size={20} color={ICON_COLOR} strokeWidth={1.5} />}
              label="Account information"
              sub="Change your Account information"
            />
            <SettingRow
              icon={<Lock size={20} color={ICON_COLOR} strokeWidth={1.5} />}
              label="Password"
              sub="Change your Password"
            />
            <SettingRow
              icon={<CreditCard size={20} color={ICON_COLOR} strokeWidth={1.5} />}
              label="Payment Methods"
              sub="Add your Credit & Debit cards"
            />
            <SettingRow
              icon={<MapPin size={20} color={ICON_COLOR} strokeWidth={1.5} />}
              label="Delivery Locations"
              sub="Change your Delivery Locations"
            />
            <SettingRow
              icon={<AtSign size={20} color={ICON_COLOR} strokeWidth={1.5} />}
              label="Invite your friends"
              sub="Get $59 for each invitation!"
            />
          </SectionCard>

          {/* Notifications */}
          <SectionCard title="Notifications">
            <ToggleRow
              icon={<Bell size={20} color={ICON_COLOR} strokeWidth={1.5} />}
              label="Notifications"
              sub="You will receive daily updates"
              value={notificationsOn}
              onValueChange={setNotificationsOn}
            />
            <ToggleRow
              icon={<Bell size={20} color={ICON_COLOR} strokeWidth={1.5} />}
              label="Promotional Notifications"
              sub="Get notified when promotions"
              value={promoNotificationsOn}
              onValueChange={setPromoNotificationsOn}
            />
          </SectionCard>

          {/* More */}
          <SectionCard title="More">
            <SettingRow
              icon={<Star size={20} color={ICON_COLOR} strokeWidth={1.5} />}
              label="Rate Us"
              sub="You will receive daily updates"
            />
            <SettingRow
              icon={<BookOpen size={20} color={ICON_COLOR} strokeWidth={1.5} />}
              label="FAQ"
              sub="Frequently Asked Questions"
            />
          </SectionCard>

          {/* Log Out */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-white rounded-[15px] px-8 py-[21px] flex-row items-center gap-3">
            <LogOut size={20} color={TEXT_DARK} strokeWidth={1.5} />
            <Text style={{ color: TEXT_DARK }} className="flex-1 text-sm font-medium">
              Log Out
            </Text>
            <ChevronRight size={16} color={TEXT_DARK} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

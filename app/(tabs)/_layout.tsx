import { Tabs } from 'expo-router';
import { useTheme } from 'tamagui';
import { Map, MapPin } from '@tamagui/lucide-icons';
import { ThemeSwitchButton } from '~/components/ThemeSwitchButton';

export default function TabLayout() {
  // return <Slot />;
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: theme.color10.get(),
        tabBarActiveTintColor: theme.color.get(),
        tabBarStyle: {
          backgroundColor: theme.background.get(),
        },
        headerStyle: {
          backgroundColor: theme.green8.get(),
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <Map color={color} />,
          headerRight: () => <ThemeSwitchButton />,
        }}
      />
      <Tabs.Screen
        name="pins"
        options={{
          title: 'Saved Pins',
          tabBarIcon: ({ color }) => <MapPin color={color} />,
          headerRight: () => <ThemeSwitchButton />,
        }}
      />
    </Tabs>
  );
}

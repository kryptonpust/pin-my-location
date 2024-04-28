import { Stack } from 'expo-router';

import { PinsScreenContent } from '~/components/pins_page/PinsScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Saved Pins' }} />
      <PinsScreenContent />
    </>
  );
}

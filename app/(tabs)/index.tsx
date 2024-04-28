import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { MapScreenContent } from '~/components/map_page/MapScreenContent';

export default function Home() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  return (
    <>
      <Stack.Screen options={{ title: 'Map', }} />
      <View style={styles.container}>
        <MapScreenContent id={id} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

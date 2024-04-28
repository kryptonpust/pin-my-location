import { FlatList } from 'react-native';
import { useTheme } from 'tamagui';

import { ListItem } from './ListItem';

import { usePersistedMarkerStore } from '~/utils/store';

export function PinsScreenContent() {
  const markers = usePersistedMarkerStore((state) => state.markers);
  const theme = useTheme();
  return (
    <FlatList
      style={{ backgroundColor: theme.gray1.get() }}
      data={markers}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 8 }}
      renderItem={({ item }) => <ListItem {...item} />}
    />
  );
}

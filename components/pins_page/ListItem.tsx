import { Goal, Trash } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { useTheme, Card, XStack, SizableText } from "tamagui";
import { MarkerState, usePersistedMarkerStore } from "~/utils/store";
import { Button } from "../Button";

type ListItemProps = Required<MarkerState>;

export const ListItem = (marker: ListItemProps) => {
  const removeMarker = usePersistedMarkerStore((state) => state.removeMarker);
  const theme = useTheme();
  return (
    <Card marginTop={8}>
      <XStack gap="$2" m="$2" p="$2">
        <SizableText size="$8" flex={1}>
          {marker.title}
        </SizableText>
        <Link
          asChild
          href={{
            pathname: '/(tabs)/',
            params: { id: marker.id },
          }}>
          <Button backgroundColor={theme.orange7.get()} icon={<Goal size={20} />} />
        </Link>
        <Button
          backgroundColor={theme.red10.get()}
          icon={<Trash size={20} />}
          onPress={() => {
            removeMarker(marker.id);
          }}
        />
      </XStack>
    </Card>
  );
};

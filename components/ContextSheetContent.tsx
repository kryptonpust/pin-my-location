import { Edit3, Save, Trash, X } from '@tamagui/lucide-icons';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import {
  Fieldset,
  Input,
  Label,
  Sheet,
  SizableText,
  XStack,
  YStack,
  useTheme,
} from 'tamagui';

import { MarkerState, usePersistedMarkerStore, useTempMarkerStore } from '../utils/store';
import { Button } from './Button';

export type ContextSheetContentOptions = {
  id?: string;
  options: Omit<MarkerState, 'id'>;
};

const snapPoints = [80, 50, 10];

export function ContextSheetContent() {
  const persistedMarkerStore = usePersistedMarkerStore();
  const [tempMarker, activateTempMarker, deactivateTempMarker] = useTempMarkerStore((state) => [
    state.marker,
    state.activateMarker,
    state.deactivateMarker,
  ]);

  const persistedMarker = tempMarker?.id ? persistedMarkerStore.getMarker(tempMarker?.id) : false;
  const [position, setPosition] = useState(snapPoints.length - 1);
  const theme = useTheme();

  if (!tempMarker) return null;

  return (
    <Sheet
      open={!!tempMarker}
      snapPoints={snapPoints}
      position={position}
      onPositionChange={(position) => {
        setPosition(position);
      }}>
      <Sheet.Frame>
        <YStack gap="$2" padding="$2">
          <XStack gap="$2" alignContent="center">
            <SizableText flex={1} size="$8" fontWeight="bold">
              {tempMarker?.title}
            </SizableText>
            {shouldSaveContextMenuVisible(tempMarker) && (
              <>
                {position !== 0 && (
                  <Button
                    backgroundColor={theme.green10.get()}
                    icon={<Save size={20} />}
                    onPress={() => {
                      setPosition(0);
                    }}
                  />
                )}
                <Button
                  backgroundColor={theme.red10.get()}
                  icon={<X size={20} />}
                  onPress={() => {
                    deactivateTempMarker();
                  }}
                />
              </>
            )}
            {shouldEditContextMenuVisible(tempMarker) && (
              <>
                {position !== 0 && (
                  <Button
                    backgroundColor={theme.yellow7.get()}
                    icon={<Edit3 size={20} />}
                    onPress={() => {
                      setPosition(0);
                    }}
                  />
                )}
                <Button
                  backgroundColor={theme.red10.get()}
                  icon={
                    <Trash
                      size={20}
                      onPress={() => {
                        persistedMarkerStore.removeMarker(tempMarker.id!);
                        deactivateTempMarker();
                      }}
                    />
                  }
                />
              </>
            )}
          </XStack>
          <Fieldset>
            <Label> Title</Label>
            <Input
              value={tempMarker?.title}
              onChangeText={(text) => {
                activateTempMarker({
                  ...tempMarker,
                  title: text,
                });
              }}
            />
          </Fieldset>
          <Fieldset>
            <Label> Description</Label>
            <Input
              value={tempMarker.description}
              onChangeText={(text) => {
                activateTempMarker({
                  ...tempMarker,
                  description: text,
                });
              }}
            />
          </Fieldset>
          <Fieldset>
            <Label>Latitude</Label>
            <Input
              value={tempMarker.region.latitude.toString()}
              onChangeText={(text) => {
                activateTempMarker({
                  ...tempMarker,
                  region: {
                    ...tempMarker.region,
                    latitude: parseFloat(text),
                  },
                });
              }}
            />
          </Fieldset>
          <Fieldset>
            <Label>Longitude</Label>
            <Input
              value={tempMarker.region.longitude.toString()}
              onChangeText={(text) => {
                activateTempMarker({
                  ...tempMarker,
                  region: {
                    ...tempMarker.region,
                    longitude: parseFloat(text),
                  },
                });
              }}
            />
          </Fieldset>
          <Button
            backgroundColor={tempMarker.id ? theme.yellow7.get() : theme.green10.get()}
            onPress={() => {
              if (!tempMarker.id) {
                const delta = { ...tempMarker, id: nanoid() };
                persistedMarkerStore.addMarker(delta);
                deactivateTempMarker();
                setPosition(2);
              } else {
                persistedMarkerStore.updateMarker(tempMarker.id, tempMarker);
                setPosition(2);
              }
            }}>
            Save
          </Button>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}

function shouldSaveContextMenuVisible(item: MarkerState) {
  return !item.id;
}

function shouldEditContextMenuVisible(item: MarkerState) {
  return item.id;
}

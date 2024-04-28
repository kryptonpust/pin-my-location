import { ArrowUpDown, SendHorizontal } from '@tamagui/lucide-icons';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Card, Input, XStack, YStack, useTheme } from 'tamagui';

import { useAppSettingsStore, useTempMarkerStore } from '../../utils/store';
import { isStringValidFloat } from '../../utils/utils';
import { Button } from '../Button';
import { DEFAULT_MARKER_CONFIG } from '~/utils/constants';

export function LatLonSearch() {
  const appSetting = useAppSettingsStore();
  const tempMarker = useTempMarkerStore((state) => state.marker);
  const [lat, setLat] = React.useState<string>('');
  const [lon, setLon] = React.useState<string>('');
  useEffect(() => {
    if (tempMarker) {
      setLat(tempMarker.region.latitude.toString());
      setLon(tempMarker.region.longitude.toString());
    }
  }, [tempMarker]);
  return (
    <Card elevate margin="$4" padding="$2" animation="lazy">
      {appSetting.settings.expandedSearch ? (
        <ExpandedSearch lat={lat} setLat={setLat} lon={lon} setLon={setLon} />
      ) : (
        <CollapsedSearch
          lat={lat}
          lon={lon}
          onFocus={() => {
            appSetting.expandSearchBar();
          }}
        />
      )}
    </Card>
  );
}

type CollapsedSearchProps = {
  lat: string;
  lon: string;
  onFocus: () => void;
};
function CollapsedSearch({ lat, lon, onFocus }: CollapsedSearchProps) {
  return (
    <KeyboardAvoidingView>
      <Input
        keyboardType="numeric"
        inputMode="numeric"
        placeholder="Lat,Lon..."
        onFocus={() => {
          onFocus();
        }}
        value={[lat, lon]
          .filter((item) => item)
          .map((item) => item.substring(0, 10))
          .join(',')}
      />
    </KeyboardAvoidingView>
  );
}

type ExpandedSearchProps = {
  lat: string;
  setLat: (lat: string) => void;
  lon: string;
  setLon: (lon: string) => void;
};
function ExpandedSearch({ lat, setLat, lon, setLon }: ExpandedSearchProps) {
  const activateTempMarker = useTempMarkerStore((state) => state.activateMarker);
  const theme = useTheme();
  return (
    <YStack gap="$2">
      <XStack gap="$2">
        <Input
          flex={1}
          keyboardType="numeric"
          inputMode="numeric"
          placeholder="Latitude"
          autoFocus
          value={lat?.toString() ?? ''}
          onChangeText={(text) => {
            (!text || isStringValidFloat(text)) && setLat(text);
          }}
        />
        <Button
          alignSelf="center"
          icon={ArrowUpDown}
          disabled={!(Boolean(lat) && Boolean(lon))}
          onPress={() => {
            // swap lat and lon
            const temp = lat;
            setLat(lon);
            setLon(temp);
          }}
        />
      </XStack>
      <XStack gap="$2">
        <Input
          flex={1}
          keyboardType="numeric"
          inputMode="numeric"
          placeholder="Longitude"
          value={lon?.toString() ?? ''}
          onChangeText={(text) => {
            (!text || isStringValidFloat(text)) && setLon(text);
          }}
        />
        <Button
          alignSelf="center"
          disabled={!(Boolean(lat) && Boolean(lon))}
          icon={SendHorizontal}
          backgroundColor={theme.green10.get()}
          onPress={() => {
            if (isStringValidFloat(lat) && isStringValidFloat(lon)) {
              // update the marker
              activateTempMarker({
                ...DEFAULT_MARKER_CONFIG,
                region: {
                  latitude: parseFloat(lat),
                  longitude: parseFloat(lon),
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                },
              });
            }
          }}
        />
      </XStack>
    </YStack>
  );
}

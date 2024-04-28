import { Locate } from '@tamagui/lucide-icons';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import MapView, { MapMarker, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Avatar } from 'tamagui';

import { DEFAULT_MARKER_CONFIG, DEFAULT_REGION } from '~/utils/constants';
import {
  useAppSettingsStore,
  usePersistedMarkerStore,
  useTempMarkerStore,
} from '../../utils/store';
import { Button } from '../Button';

type CustomMapViewProps = {
  id?: string;
};

export function CustomMapView({ id }: CustomMapViewProps) {
  const [location, setLocation] = useState<Region>(DEFAULT_REGION);
  const [currentGpsLocation, setCurrentGpsLocation] = useState<Region | null>(null);
  const [tempMarker, activateTempMarker] = useTempMarkerStore((state) => [
    state.marker,
    state.activateMarker,
  ]);
  const markers = usePersistedMarkerStore((state) => state.markers);
  const appSetting = useAppSettingsStore();

  const mapRef = useRef<MapView | null>(null);
  const markerRef = useRef<MapMarker | null>(null);

  useEffect(() => {
    mapRef?.current?.animateToRegion(currentGpsLocation ?? location, 1000);
  }, [currentGpsLocation]);

  useEffect(() => {
    mapRef?.current?.animateToRegion(tempMarker?.region ?? location, 1000);
  }, [tempMarker]);

  useEffect(() => {
    if (markers && markerRef?.current) {
      markerRef?.current?.showCallout();
    }
  }, [markers, markerRef]);

  useEffect(() => {
    if (id) {
      const marker = markers.find((marker) => marker.id === id);
      if (marker) {
        mapRef?.current?.animateToRegion(marker.region, 1000);
        activateTempMarker(marker);
      }
    }
  }, [id]);

  async function getLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCurrentGpsLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    });
  }
  return (
    <>
      <MapView
        ref={mapRef}
        style={{ height: '100%' }}
        region={location}
        onRegionChangeComplete={(region) => {
          setLocation(region);
        }}
        provider={PROVIDER_GOOGLE}
        toolbarEnabled={false}
        onPress={(e) => {
          activateTempMarker({
            ...DEFAULT_MARKER_CONFIG,
            region: {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
              latitudeDelta: DEFAULT_REGION.latitudeDelta,
              longitudeDelta: DEFAULT_REGION.longitudeDelta,
            },
          });
        }}
        onTouchStart={() => {
          appSetting.minimizeSearchBar();
        }}>
        {currentGpsLocation && (
          <Marker
            key="current-location"
            title="It's You"
            coordinate={{
              latitude: currentGpsLocation.latitude,
              longitude: currentGpsLocation.longitude,
            }}>
            <Avatar size={28} circular borderColor="$color" borderWidth={2}>
              <Avatar.Image src={require('~/assets/cat.gif')} />
              <Avatar.Fallback backgroundColor="blue" />
            </Avatar>
          </Marker>
        )}
        {tempMarker && !tempMarker.id && (
          <Marker
            key="temp-id"
            title={tempMarker.title}
            description={tempMarker.description}
            pinColor="blue"
            coordinate={{
              latitude: tempMarker.region.latitude,
              longitude: tempMarker.region.longitude,
            }}
          />
        )}
        {markers.map((marker, idx) => (
          <Marker
            key={marker.id ?? idx.toString()}
            ref={marker.id === tempMarker?.id ? markerRef : undefined}
            title={marker.title}
            description={marker.description}
            draggable={marker.id === tempMarker?.id}
            coordinate={{
              latitude: marker.region.latitude,
              longitude: marker.region.longitude,
            }}
            onPress={() => {
              activateTempMarker(marker);
            }}
            onDragEnd={(e) => {
              const newMarker = {
                ...marker,
                region: {
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                  latitudeDelta: DEFAULT_REGION.latitudeDelta,
                  longitudeDelta: DEFAULT_REGION.longitudeDelta,
                },
              };
              activateTempMarker(newMarker);
            }}
          />
        ))}
      </MapView>
      <Button
        style={{
          position: 'absolute',
          bottom: 10,
          right: 12,
        }}
        width={40}
        icon={<Locate size={24} />}
        onPress={async () => {
          await getLocation();
        }}
      />
    </>
  );
}

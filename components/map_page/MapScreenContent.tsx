import 'react-native-get-random-values';
import { ZStack } from 'tamagui';

import { CustomMapView } from './CustomMapView';
import { LatLonSearch } from './LatLonSearch';
import { ContextSheetContent } from '../ContextSheetContent';
type ScreenContentProps = {
  id?: string;
};

export const MapScreenContent = ({ id }: ScreenContentProps) => {
  return (
    <ZStack fullscreen>
      <CustomMapView id={id} />
      <LatLonSearch />
      <ContextSheetContent />
    </ZStack>
  );
};

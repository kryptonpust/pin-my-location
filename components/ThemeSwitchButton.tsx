import { Switch } from 'tamagui';

import { useAppSettingsStore } from '../utils/store';

export const ThemeSwitchButton = () => {
  const appSetting = useAppSettingsStore();

  return (
    <Switch
      margin="$4"
      defaultChecked={appSetting.settings.theme === 'dark'}
      onPress={appSetting.toggleTheme}>
      <Switch.Thumb />
    </Switch>
  );
};

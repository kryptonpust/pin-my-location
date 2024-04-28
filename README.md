# Pin My Location

Pin My Location is a React Native application that allows users to save their favorite locations.

## Features

- Pin locations on a map
- Add custom labels and descriptions to each pinned location
- View a list of all pinned locations
- Use Flipper for debugging and performance analysis

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Modify the `.env.example` file accordingly and rename it to `.env`.
4. Start the development server: `npx expo prebuild`
5. Run the app on iOS emulator or device: `npm run ios`
6. Run the app on Android emulator or device: `npm run android`

## Android Custom Setup

To set up the Pin My Location app for Android, follow these steps:

1. Open the `android/app/build.gradle` file in your project.
    Add the following line of code to the end of the apply plugin section:

    ```groovy
    apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"
    ```

2. Save the file.

## Flipper Setup

To use Flipper for debugging and performance analysis, follow these steps:

1. Open the `android/build.gradle` file in your project.
2. Locate the `buildscript` block.
3. Inside the `buildscript` block, add the following line of code:

    ```groovy
    ext {
          FLIPPER_VERSION = '0.240.0'
    }
    ```

4. Save the file.

By adding the `FLIPPER_VERSION` variable with the value `'0.240.0'`, you will be able to use Flipper for debugging and performance analysis in your React Native application.

## Usage

1. Launch the app on your device or emulator.
2. Grant location permissions when prompted.
3. Pin your favorite locations on the map by long-pressing on the desired location.
4. Add labels and descriptions to each pinned location.
5. View the list of all pinned locations by navigating to the "Locations" tab.
6. Share your pinned locations with others using the share button.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

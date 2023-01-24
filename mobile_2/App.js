import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { AuthLayout } from './layouts/auth_layout';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,IconRegistry } from '@ui-kitten/components';
import { AppProperties } from './config/config';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default function App() {
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />

    <ApplicationProvider  {...eva} theme={eva.light}>
      <AuthLayout {...AppProperties}>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </AuthLayout>
    </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Linking,
  Alert,
  BackHandler,
  ImageBackground,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/App Background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.mainContent}>
            <Image
              source={require('../../assets/Empowering the nation logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Empowering the nation</Text>
            <Text style={styles.subtitle}>"Skill to learn"</Text>

            <Text style={styles.description}>
              Established in 2022, Empowering the nation is a company located in Johannesburg.
            </Text>

            <Text style={styles.detailedDescription}>
              The company offers six-week to six month courses to domestic workers and gardeners to advance 
              their skills to make them more marketable. The aim of these courses to help the domestic 
              workers and gardeners become potential targets when they start looking for a job. To find which 
              courses are offered please click on the buttons links below!
            </Text>

            {/*  Dropdown menu */}
            <View style={styles.courseButton}>
              <Picker
                selectedValue=""
                onValueChange={(value) => {
                  if (value === 'SixMonthCourses') navigation.navigate('SixMonthCourses');
                  if (value === 'SixWeekCourses') navigation.navigate('SixWeekCourses');
                  if (value === 'Calculator') navigation.navigate('Calculator');
                }}
                style={styles.picker}
                dropdownIconColor="#ffffff"
              >
                <Picker.Item label="Select a navigation option" value="" color="#ffffff" />
                <Picker.Item label="Six Month courses" value="SixMonthCourses" />
                <Picker.Item label="Six Week courses" value="SixWeekCourses" />
                <Picker.Item label="Fee Calculator" value="Calculator" />
              </Picker>
            </View>

            {/* Contact Information Section */}
            <View style={styles.contactSection}>
              <Text style={styles.contactTitle}>Contact Us</Text>

              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => Linking.openURL('tel:+27112345678')}
              >
                <Text style={styles.contactButtonText}>Call: +27 11 234 5678</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => Linking.openURL('mailto:info@empoweringthenation.co.za')}
              >
                <Text style={styles.contactButtonText}>Email Us</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => {
                  const address = "115 Vilakazi street, Orlando West, Soweto, Johannesburg";
                  const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
                  Linking.openURL(url);
                }}
              >
                <Text style={styles.contactButtonText}>Find Us on Map</Text>
              </TouchableOpacity>
            </View>

            {/* Navigation Buttons */}
            <View style={styles.navigationSection}>
              <TouchableOpacity 
                style={styles.nextButton}
                onPress={() => navigation.navigate('SixWeekCourses')}
              >
                <Text style={styles.navigationButtonText}>Next: Six Week Courses →</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.exitButton}
                onPress={() => {
                  Alert.alert(
                    'Exit App',
                    'Are you sure you want to exit?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Exit', onPress: () => BackHandler.exitApp() }
                    ]
                  );
                }}
              >
                <Text style={styles.exitButtonText}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 32,
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 24,
    color: '#0c0b0bff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  detailedDescription: {
    fontSize: 24,
    color: '#020202ff',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  courseButton: {
    backgroundColor: '#28a745',
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    width: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  picker: {
    color: '#ffffff',
    backgroundColor: '#28a745', 
    width: 300,
    borderRadius: 10,
    fontSize: 24,
  },
  contactSection: {
    marginTop: 40,
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    width: 250,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  navigationSection: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: 250,
  },
  navigationButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exitButton: {
    backgroundColor: '#f1da04ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: 250,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  exitButtonText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

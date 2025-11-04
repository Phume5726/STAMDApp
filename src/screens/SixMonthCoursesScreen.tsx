import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Linking,
  BackHandler,
  ImageBackground,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type SixMonthCoursesNavigationProp = StackNavigationProp<RootStackParamList, 'SixMonthCourses'>;

interface Props {
  navigation: SixMonthCoursesNavigationProp;
}

interface Course {
  title: string;
  description: string;
  duration: string;
  fee: string;
}

const sixMonthCourses: Course[] = [
  {
    title: 'Child Minding',
    description: `Purpose: To provide basic child and baby care.

    These is the content for the child minding course:

    - Birth to six-month old baby needs
    - Seven-Month to one year old needs
    - Toddler needs
    - Educational toys`,
    duration: '6 weeks',
    fee: 'R750',
  },
  {
    title: 'Cooking',
    description: `To prepare and cook nutritious family meals.

    These is the content for the cooking course:

    -Nutritional requirements for a healthy body
    -Types of protein, carbohydrates and vegetables
    -Planning meals
    -Tasty and nutritious recipes
    -Preparation and cooking of meals`,
    duration: '6 weeks',
    fee: 'R750',
  },
  {
    title: 'Garden Maintenance',
    description: `Purpose: To provide knowledge of watering, pruning and planting in a domestic garden.

    These is the content for the garden maintenance course:

    - Watering restrictions and the watering requirements of indigenous and exotic plants
    - Pruning and propagation of plants
    - Planting techniques for different plant types`,
    duration: '6 weeks',
    fee: 'R750',
  },
];

const SixMonthCoursesScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/App Background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={[styles.dropdownWrapper, { marginTop: 10 }]}>
          <Picker
            selectedValue=""
            onValueChange={(value) => {
              if (value === 'BackSixMonth') navigation.navigate('SixMonthCourses');
              if (value === 'Calculator') navigation.navigate('Calculator');
              if (value === 'Home') navigation.navigate('Home');
              if (value === 'Contact') {
                Alert.alert(
                  'Contact Information',
                  'Phone: +27 11 234 5678\nEmail: info@empoweringthenation.co.za\n\nWould you like to call or email us?',
                  [
                    { text: 'Call', onPress: () => Linking.openURL('tel:+27112345678') },
                    { text: 'Email', onPress: () => Linking.openURL('mailto:info@empoweringthenation.co.za') },
                    { text: 'Cancel', style: 'cancel' },
                  ]
                );
              }
            }}
            style={styles.picker}
            dropdownIconColor="#ffffff"
          >
            <Picker.Item label="Select a navigation option" value="" color="#ffffff" />
            <Picker.Item label="← Back: Six Month Courses" value="BackSixMonth" />
            <Picker.Item label="Next: Calculator →" value="Calculator" />
            <Picker.Item label="🏠 Back to Home" value="Home" />
            <Picker.Item label="📞 Contact Us" value="Contact" />
          </Picker>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Six Week Courses</Text>
            <Text style={styles.subtitle}>Comprehensive professional development programs</Text>
          </View>

          <View style={styles.coursesContainer}>
            {sixMonthCourses.map((course, index) => (
              <View key={index} style={styles.courseCard}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDuration}>{course.duration}</Text>
                <Text style={styles.courseDescription}>{course.description}</Text>
                <Text style={styles.courseFee}>Fee: {course.fee}</Text>
              </View>
            ))}
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>About Our Six Month Programs</Text>
            <Text style={styles.infoText}>
              Our comprehensive six-month courses provide in-depth training and practical experience. 
              These programs are designed to give domestic workers and gardeners advanced skills that 
              significantly improve their marketability and career prospects.
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={styles.exitButton}>
              <Text
                style={styles.exitButtonText}
                onPress={() => {
                  Alert.alert(
                    'Exit App',
                    'Are you sure you want to exit the app?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Exit', onPress: () => BackHandler.exitApp() },
                    ]
                  );
                }}
              >
                Exit
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, height: '100%', width: '100%' },
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  scrollContent: { flexGrow: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 30 },
  title: { fontSize: 40, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 32, color: '#ffffff', textAlign: 'center' },
  coursesContainer: { marginBottom: 30 },
  courseCard: {
    backgroundColor: 'rgba(248,249,250,0.9)',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  courseTitle: { fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  courseDuration: { fontSize: 14, color: '#4A90E2', fontWeight: '600', marginBottom: 10 },
  courseDescription: { fontSize: 24, color: '#000', lineHeight: 20, marginBottom: 10 },
  courseFee: { fontSize: 20, fontWeight: 'bold', color: '#4A90E2' },
  infoBox: {
    backgroundColor: 'rgba(236,240,241,0.9)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  infoTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
  infoText: { fontSize: 20, color: '#5d6d7e', lineHeight: 20 },
  dropdownWrapper: {
    backgroundColor: '#28a745',
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 10,
    width: 350,
    alignSelf: 'center',
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
    fontSize: 24,
  },
  exitButton: {
    backgroundColor: '#f50707ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#dee2e6',
    width: 250,
  },
  exitButtonText: { color: '#000000', fontSize: 24, fontWeight: 'bold' },
});

export default SixMonthCoursesScreen;

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
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type SixWeekCoursesNavigationProp = StackNavigationProp<RootStackParamList, 'SixWeekCourses'>;

interface Props {
  navigation: SixWeekCoursesNavigationProp;
}

interface Course {
  title: string;
  description: string;
  duration: string;
  fee: string;
}

const sixWeekCourses: Course[] = [
  {
    title: 'First Aid',
    description: `Purpose: To provide first aid awareness and basic life support.

    This is the content for the first aid course:

    - Wounds and bleeding
    - Burns and fractures
    - Emergency scene management
    - Cardio-pulmonary resuscitation (CPR)
    - Respiratory distress e.g., choking, blocked airway`,
    duration: '6 Months',
    fee: 'R1,500',
  },
  {
    title: 'Sewing',
    description: `Purpose: Master the art of sewing and garment repair. Learn to use sewing machines, hand stitching techniques, pattern reading, and basic tailoring skills.

    This is the content for the sewing course:
    - Types of stitches
    - Threading a sewing machine
    - Sewing buttons, zips, hems, and seams
    - Alterations
    - Designing and sewing new garments`,
    duration: '6 Months',
    fee: 'R1,500',
  },
  {
    title: 'Landscaping',
    description: `Purpose: To provide landscaping services for new and established gardens.

    This is the content for the landscaping course:
    - Indigenous and exotic plants and trees
    - Fixed structures (fountains, benches, built-in braai)
    - Balancing of plants and trees in a garden
    - Aesthetics of plant shapes and colours
    - Garden layout`,
    duration: '6 Months',
    fee: 'R1,500',
  },
  {
    title: 'Life Skills',
    description: `Purpose: To provide skills to navigate basic life necessities.

    This is the content for the life skills course:
    - Opening a bank account 
    - Basic Labour law (know your rights)
    - Basic reading and writing literacy
    - Basic numeric literacy`,
    duration: '6 Months',
    fee: 'R1,500',
  },
];

const SixWeekCoursesScreen: React.FC<Props> = ({ navigation }) => {
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
              if (value === 'BackHome') navigation.navigate('Home');
              if (value === 'NextSixWeek') navigation.navigate('SixWeekCourses');
              if (value === 'Calculator') navigation.navigate('Calculator');
            }}
            style={styles.picker}
            dropdownIconColor="#ffffff"
          >
            <Picker.Item label="Select a navigation option" value="" color="#ffffff" />
            <Picker.Item label="← Back to Home" value="BackHome" />
            <Picker.Item label="Next: Six Week Courses →" value="NextSixWeek" />
            <Picker.Item label="💰 Calculate Course Fees" value="Calculator" />
          </Picker>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Six Week Courses</Text>
            <Text style={styles.subtitle}>Short-term skill development programs</Text>
          </View>

          <View style={styles.coursesContainer}>
            {sixWeekCourses.map((course, index) => (
              <View key={index} style={styles.courseCard}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDuration}>{course.duration}</Text>
                <Text style={styles.courseDescription}>{course.description}</Text>
                <Text style={styles.courseFee}>Fee: {course.fee}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.exitButton}
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
            <Text style={styles.exitButtonText}>Exit</Text>
          </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 32,
    color: '#ffffff',
    textAlign: 'center',
  },
  coursesContainer: {
    marginBottom: 30,
  },
  courseCard: {
    backgroundColor: 'rgba(248, 249, 250, 0.9)',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  courseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  courseDuration: {
    fontSize: 18,
    color: '#4A90E2',
    fontWeight: '600',
    marginBottom: 10,
  },
  courseDescription: {
    fontSize: 24,
    color: '#000000',
    lineHeight: 20,
    marginBottom: 10,
  },
  courseFee: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
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
    backgroundColor: '#ff0303ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
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

export default SixWeekCoursesScreen;

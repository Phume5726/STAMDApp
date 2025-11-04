import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking,
  BackHandler,
  ImageBackground,
} from 'react-native';
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
    description: `Purpose: To provide first aid awareness and basic  life support.
    
    This is the content for the first aid course:

    - Wounds and bleeding

    - Burns and fractures

    -Emergency scene management

    - Cardio-pulmonary resuscitation (CPR)
    
    - Respiratory distress e.g., Choking, blocked airway`,
    duration: '6 Months',
    fee: 'R1,500',
  },

  {
    title: 'Sewing',
    description: `Purpose: Master the art of sewing and garment repair. Learn to use sewing machines, hand stitching techniques, pattern reading, and basic tailoring skills. Great for alterations and clothing repair services.
    
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
    description: `To provide landscaping services for new and established gardens.
    
     These is the content for the landscaping course:

     - Indigenous and exotic plants and trees

     - Fixed structures (fountains, statues, benches, tables, built-in braai)

     - Balancing of plants and trees in a garden

     - Aesthetics of plant shapes and colours

     - Garden layout `,
    duration: '6 Months',
    fee: 'R1,500',
  },
  {
    title: 'Life Skills',
    description: `Purpose: To provide skills to navigate basic life necessities.
    
    These is the content for the life skills course:

    -Opening a bank account 

    -Basic Labour law(know your rights)

    -Basic reading and writing literacy

    -Basic numeric literacy`,
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

          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.backButtonText}>← Back to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => navigation.navigate('SixWeekCourses')}
            >
              <Text style={styles.nextButtonText}>Next: Six Week Courses →</Text>
            </TouchableOpacity>
          </View>

          {/* Calculator Quick Access */}
          <TouchableOpacity
            style={styles.calculatorQuickButton}
            onPress={() => navigation.navigate('Calculator')}
          >
            <Text style={styles.calculatorQuickButtonText}>💰 Calculate Course Fees</Text>
          </TouchableOpacity>

          {/* Exit Button */}
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => {
              Alert.alert(
                'Exit App',
                'Are you sure you want to exit the app?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Exit', onPress: () => BackHandler.exitApp() }
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
  backButton: {
    backgroundColor: '#ecdd00ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  backButtonText: {
    color: '#000000ff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  nextButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  calculatorQuickButton: {
    backgroundColor: '#6f42c1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  calculatorQuickButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
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
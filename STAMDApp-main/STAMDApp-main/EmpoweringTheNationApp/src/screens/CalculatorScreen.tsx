import React, { useState } from 'react';
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

type CalculatorNavigationProp = StackNavigationProp<RootStackParamList, 'Calculator'>;

interface Props {
  navigation: CalculatorNavigationProp;
}

interface Course {
  id: string;
  name: string;
  fee: number;
  duration: string;
  type: 'sixWeek' | 'sixMonth';
}

const allCourses: Course[] = [
  // Six Week Courses
  { id: '1', name: 'First Aid', fee: 1500, duration: '6 Months', type: 'sixMonth' },
  { id: '2', name: 'Sewing', fee: 1500, duration: '6 Months', type: 'sixMonth' },
  { id: '3', name: 'Landscaping', fee: 1500, duration: '6 Months', type: 'sixMonth' },
  { id: '4', name: 'Life Skills', fee: 1500, duration: '6 Months', type: 'sixMonth' },
  // Six Month Courses
  { id: '5', name: 'Child Minding', fee: 750, duration: '6 weeks', type: 'sixWeek' },
  { id: '6', name: 'Cooking', fee: 750, duration: '6 weeks', type: 'sixWeek' },
  { id: '7', name: 'Garden Maintenance', fee: 750, duration: '6 weeks', type: 'sixWeek' },
];

const CalculatorScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const toggleCourse = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const calculateTotal = () => {
    const total = selectedCourses.reduce((sum, courseId) => {
      const course = allCourses.find(c => c.id === courseId);
      return sum + (course?.fee || 0);
    }, 0);
    
    return total;
  };

  const calculateDiscount = (total: number) => {
    const numCourses = selectedCourses.length;
    if (numCourses >= 3) {
      return total * 0.15; // 15% discount for 3 or more courses
    } else if (numCourses === 2) {
      return total * 0.05; // 5% discount for 2 courses
    }
    return 0;
  };

  const showQuote = () => {
    const total = calculateTotal();
    const discount = calculateDiscount(total);
    const finalAmount = total - discount;
    
    let message = `Course Selection Summary:\n\n`;
    
    selectedCourses.forEach(courseId => {
      const course = allCourses.find(c => c.id === courseId);
      if (course) {
        message += `• ${course.name} (${course.duration}): R${course.fee.toLocaleString()}\n`;
      }
    });
    
    message += `\nSubtotal: R${total.toLocaleString()}`;
    if (discount > 0) {
      message += `\nDiscount (${selectedCourses.length >= 3 ? '15' : '5'}%): -R${discount.toLocaleString()}`;
    }
    message += `\nTotal Amount: R${finalAmount.toLocaleString()}`;
    
    if (discount > 0) {
      message += `\n\n You saved R${discount.toLocaleString()} with our multiple course discount!`;
    }

    Alert.alert('Course Fee Quote', message);
  };

  const sixWeekCourses = allCourses.filter(course => course.type === 'sixWeek');
  const sixMonthCourses = allCourses.filter(course => course.type === 'sixMonth');

  return (
    <ImageBackground
      source={require('../../assets/App Background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Course Fee Calculator</Text>
            <Text style={styles.subtitle}>Select courses to calculate total fees</Text>
          </View>

          <View style={styles.discountInfo}>
            <Text style={styles.discountTitle}> Special Discounts Available!</Text>
            <Text style={styles.discountText}>• 5% discount when enrolling in 2 courses</Text>
            <Text style={styles.discountText}>• 15% discount when enrolling in 3+ courses</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Six Week Courses (R750 each)</Text>
            {sixWeekCourses.map(course => (
              <TouchableOpacity
                key={course.id}
                style={[
                  styles.courseItem,
                  selectedCourses.includes(course.id) && styles.courseItemSelected
                ]}
                onPress={() => toggleCourse(course.id)}
              >
                <View style={styles.courseInfo}>
                  <Text style={[
                    styles.courseName,
                    selectedCourses.includes(course.id) && styles.courseNameSelected
                  ]}>
                    {course.name}
                  </Text>
                  <Text style={styles.courseFee}>R{course.fee.toLocaleString()}</Text>
                </View>
                <View style={[
                  styles.checkbox,
                  selectedCourses.includes(course.id) && styles.checkboxSelected
                ]}>
                  {selectedCourses.includes(course.id) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Six Month Courses (R1,500 each)</Text>
            {sixMonthCourses.map(course => (
              <TouchableOpacity
                key={course.id}
                style={[
                  styles.courseItem,
                  selectedCourses.includes(course.id) && styles.courseItemSelected
                ]}
                onPress={() => toggleCourse(course.id)}
              >
                <View style={styles.courseInfo}>
                  <Text style={[
                    styles.courseName,
                    selectedCourses.includes(course.id) && styles.courseNameSelected
                  ]}>
                    {course.name}
                  </Text>
                  <Text style={styles.courseFee}>R{course.fee.toLocaleString()}</Text>
                </View>
                <View style={[
                  styles.checkbox,
                  selectedCourses.includes(course.id) && styles.checkboxSelected
                ]}>
                  {selectedCourses.includes(course.id) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {selectedCourses.length > 0 && (
            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>
                Selected: {selectedCourses.length} course{selectedCourses.length !== 1 ? 's' : ''}
              </Text>
              <Text style={styles.totalAmount}>
                Total: R{(calculateTotal() - calculateDiscount(calculateTotal())).toLocaleString()}
              </Text>
              {calculateDiscount(calculateTotal()) > 0 && (
                <Text style={styles.savings}>
                  You save: R{calculateDiscount(calculateTotal()).toLocaleString()}
                </Text>
              )}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.calculateButton,
                selectedCourses.length === 0 && styles.buttonDisabled
              ]}
              onPress={showQuote}
              disabled={selectedCourses.length === 0}
            >
              <Text style={styles.calculateButtonText}>
                Get Quote
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSelectedCourses([])}
            >
              <Text style={styles.clearButtonText}>Clear Selection</Text>
            </TouchableOpacity>
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('SixMonthCourses')}
            >
              <Text style={styles.backButtonText}>← Back: Six Month Courses</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.homeButtonText}>Home</Text>
            </TouchableOpacity>
          </View>

          {/* Contact for Enrollment */}
          <TouchableOpacity
            style={styles.enrollButton}
            onPress={() => {
              Alert.alert(
                'Ready to Enroll?',
                'Contact us to complete your enrollment:\n\nPhone: +27 11 234 5678\nEmail: info@empoweringthenation.co.za',
                [
                  { text: 'Call Now', onPress: () => Linking.openURL('tel:+27112345678') },
                  { text: 'Send Email', onPress: () => Linking.openURL('mailto:info@empoweringthenation.co.za') },
                  { text: 'Later', style: 'cancel' }
                ]
              );
            }}
          >
            <Text style={styles.enrollButtonText}>Contact Us to Enroll</Text>
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
    marginBottom: 25,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 32,
    color: '#ffffff',
    textAlign: 'center',
  },
  discountInfo: {
    backgroundColor: 'rgba(230, 255, 250, 0.9)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#38A169',
  },
  discountTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2F855A',
    marginBottom: 8,
  },
  discountText: {
    fontSize: 24,
    color: '#2F855A',
    marginBottom: 2,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  courseItemSelected: {
    backgroundColor: '#EBF8FF',
    borderColor: '#3182CE',
    borderWidth: 2,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  courseNameSelected: {
    color: '#2B6CB0',
  },
  courseFee: {
    fontSize: 14,
    color: '#38A169',
    fontWeight: 'bold',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#3182CE',
    borderColor: '#3182CE',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  summarySection: {
    backgroundColor: 'rgba(26, 54, 93, 0.9)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 28,
    color: '#A0AEC0',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  savings: {
    fontSize: 14,
    color: '#68D391',
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 15,
  },
  calculateButton: {
    backgroundColor: '#3182CE',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A0AEC0',
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#E53E3E',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#f8e00cff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  enrollButton: {
    backgroundColor: '#fd7e14',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  enrollButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exitButton: {
    backgroundColor: '#f8f9fa',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalculatorScreen;
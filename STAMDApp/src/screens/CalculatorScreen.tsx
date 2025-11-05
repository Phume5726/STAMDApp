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
  TextInput, 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
  // Six Month Courses
  { id: '1', name: 'First Aid', fee: 1500, duration: '6 Months', type: 'sixMonth' },
  { id: '2', name: 'Sewing', fee: 1500, duration: '6 Months', type: 'sixMonth' },
  { id: '3', name: 'Landscaping', fee: 1500, duration: '6 Months', type: 'sixMonth' },
  { id: '4', name: 'Life Skills', fee: 1500, duration: '6 Months', type: 'sixMonth' },
  // Six Week Courses
  { id: '5', name: 'Child Minding', fee: 750, duration: '6 weeks', type: 'sixWeek' },
  { id: '6', name: 'Cooking', fee: 750, duration: '6 weeks', type: 'sixWeek' },
  { id: '7', name: 'Garden Maintenance', fee: 750, duration: '6 weeks', type: 'sixWeek' },
];

const CalculatorScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [action, setAction] = useState<string>('');
  const [fullName, setFullName] = useState('');  
  const [email, setEmail] = useState('');       

  const toggleCourse = (courseId: string) => {
    setSelectedCourses(prev =>
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
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
    const num = selectedCourses.length;
    if (num >= 3) return total * 0.15;
    if (num === 2) return total * 0.05;
    return 0;
  };

  const showQuote = () => {
    const total = calculateTotal();
    const discount = calculateDiscount(total);
    const finalAmount = total - discount;

    if (selectedCourses.length === 0) {
      Alert.alert('Select courses', 'Please select at least one course to get a quote.');
      return;
    }

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
      message += `\n\nYou saved R${discount.toLocaleString()} with our multiple course discount!`;
    }

    Alert.alert('Course Fee Quote', message);
  };

  const sixWeekCourses = allCourses.filter(c => c.type === 'sixWeek');
  const sixMonthCourses = allCourses.filter(c => c.type === 'sixMonth');

  const handleAction = (value: string) => {
    setAction(value);
    switch (value) {
      case 'quote':
        showQuote();
        break;
      case 'backSixMonth':
        navigation.navigate('SixMonthCourses');
        break;
      case 'home':
        navigation.navigate('Home');
        break;
      case 'contact':
        Alert.alert(
          'Ready to Enroll?',
          'Contact us to complete your enrollment:\n\nPhone: +27 11 234 5678\nEmail: info@empoweringthenation.co.za',
          [
            { text: 'Call Now', onPress: () => Linking.openURL('tel:+27112345678') },
            { text: 'Send Email', onPress: () => Linking.openURL('mailto:info@empoweringthenation.co.za') },
            { text: 'Later', style: 'cancel' },
          ]
        );
        break;
      default:
        break;
    }
    setAction('');
  };

 
  const handleConfirm = () => {
    if (selectedCourses.length === 0) {
      Alert.alert('Select courses', 'Please select at least one course before confirming.');
      return;
    }
    if (!fullName.trim()) {
      Alert.alert('Name required', 'Please enter your full name.');
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      Alert.alert('Valid email required', 'Please enter a valid email address.');
      return;
    }

    const total = calculateTotal();
    const discount = calculateDiscount(total);
    const finalAmount = total - discount;

    const selectedList = selectedCourses
      .map(id => {
        const c = allCourses.find(x => x.id === id);
        return c ? `• ${c.name} (${c.duration}) – R${c.fee.toLocaleString()}` : '';
      })
      .filter(Boolean)
      .join('%0A');

    const subject = encodeURIComponent(`Enrollment request from ${fullName}`);
    const body = encodeURIComponent(
      `Hello Empowering the Nation,%0A%0A` +
      `I would like to enroll in the following course(s):%0A${selectedList}%0A%0A` +
      `Subtotal: R${total.toLocaleString()}%0A` +
      (discount > 0 ? `Discount: -R${discount.toLocaleString()}%0A` : ``) +
      `Total: R${finalAmount.toLocaleString()}%0A%0A` +
      `My details:%0A` +
      `Name: ${fullName}%0A` +
      `Email: ${email}%0A%0A` +
      `Please contact me with next steps. Thank you!`
    );

    const mailto = `mailto:empoweringthenation@gmail.com?subject=${subject}&body=${body}`;
    Linking.openURL(mailto).catch(() => {
      Alert.alert('Could not open mail app', 'Please email us at empoweringthenation@gmail.com.');
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/App Background.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Dropdown menu*/}
          <View style={[styles.dropdownWrapper, { marginTop: 10 }]}>
            <Picker
              selectedValue={action}
              onValueChange={handleAction}
              style={styles.picker}
              dropdownIconColor="#ffffff"
            >
              <Picker.Item label="Select action" value="" color="#ffffff" />
              <Picker.Item
                label="Get Quote"
                value="quote"
                enabled={selectedCourses.length > 0}
              />
              <Picker.Item label="← Back: Six Month Courses" value="backSixMonth" />
              <Picker.Item label="Home" value="home" />
              <Picker.Item label="Contact Us to Enroll" value="contact" />
            </Picker>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Course Fee Calculator</Text>
            <Text style={styles.subtitle}>Select courses to calculate total fees</Text>
          </View>

          <View style={styles.discountInfo}>
            <Text style={styles.discountTitle}>Special Discounts Available!</Text>
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
                  selectedCourses.includes(course.id) && styles.courseItemSelected,
                ]}
                onPress={() => toggleCourse(course.id)}
              >
                <View style={styles.courseInfo}>
                  <Text
                    style={[
                      styles.courseName,
                      selectedCourses.includes(course.id) && styles.courseNameSelected,
                    ]}
                  >
                    {course.name}
                  </Text>
                  <Text style={styles.courseFee}>R{course.fee.toLocaleString()}</Text>
                </View>
                <View
                  style={[
                    styles.checkbox,
                    selectedCourses.includes(course.id) && styles.checkboxSelected,
                  ]}
                >
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
                  selectedCourses.includes(course.id) && styles.courseItemSelected,
                ]}
                onPress={() => toggleCourse(course.id)}
              >
                <View style={styles.courseInfo}>
                  <Text
                    style={[
                      styles.courseName,
                      selectedCourses.includes(course.id) && styles.courseNameSelected,
                    ]}
                  >
                    {course.name}
                  </Text>
                  <Text style={styles.courseFee}>R{course.fee.toLocaleString()}</Text>
                </View>
                <View
                  style={[
                    styles.checkbox,
                    selectedCourses.includes(course.id) && styles.checkboxSelected,
                  ]}
                >
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

        
          {selectedCourses.length > 0 && (
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                padding: 16,
                borderRadius: 12,
                marginBottom: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 3,
                elevation: 3,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#1f2937', marginBottom: 10 }}>
                Your Details
              </Text>

              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#94a3b8"
                value={fullName}
                onChangeText={setFullName}
                style={{
                  backgroundColor: '#f1f5f9',
                  borderColor: '#cbd5e1',
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  fontSize: 16,
                  color: '#0f172a',
                  marginBottom: 12,
                }}
              />
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={{
                  backgroundColor: '#f1f5f9',
                  borderColor: '#cbd5e1',
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  fontSize: 16,
                  color: '#0f172a',
                  marginBottom: 12,
                }}
              />

              <TouchableOpacity
                onPress={handleConfirm}
                style={{
                  backgroundColor: '#28a745',
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
                  Confirm & Email Quote
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setSelectedCourses([])}
          >
            <Text style={styles.clearButtonText}>Clear Selection</Text>
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
  backgroundImage: { flex: 1, height: '100%', width: '100%' },
  container: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  scrollContent: { flexGrow: 1, padding: 20 },

  header: { alignItems: 'center', marginBottom: 25 },
  title: { fontSize: 40, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 32, color: '#ffffff', textAlign: 'center' },

  discountInfo: {
    backgroundColor: 'rgba(230, 255, 250, 0.9)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#38A169',
  },
  discountTitle: { fontSize: 28, fontWeight: 'bold', color: '#2F855A', marginBottom: 8 },
  discountText: { fontSize: 24, color: '#2F855A', marginBottom: 2 },

  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginBottom: 15 },

  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  courseItemSelected: { backgroundColor: '#EBF8FF', borderColor: '#3182CE', borderWidth: 2 },
  courseInfo: { flex: 1 },
  courseName: { fontSize: 16, fontWeight: '600', color: '#2D3748', marginBottom: 4 },
  courseNameSelected: { color: '#2B6CB0' },
  courseFee: { fontSize: 14, color: '#38A169', fontWeight: 'bold' },
  checkbox: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#CBD5E0',
    justifyContent: 'center', alignItems: 'center',
  },
  checkboxSelected: { backgroundColor: '#3182CE', borderColor: '#3182CE' },
  checkmark: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },

  summarySection: {
    backgroundColor: 'rgba(26, 54, 93, 0.9)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    alignItems: 'center',
  },
  summaryTitle: { fontSize: 28, color: '#A0AEC0', marginBottom: 8 },
  totalAmount: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 5 },
  savings: { fontSize: 14, color: '#68D391', fontWeight: '600' },

  dropdownWrapper: {
    backgroundColor: '#28a745',
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
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

  clearButton: {
    backgroundColor: '#E53E3E',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },

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
  exitButtonText: { color: '#000000', fontSize: 16, fontWeight: 'bold' },
});

export default CalculatorScreen;

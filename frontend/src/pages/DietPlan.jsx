import React, { useState } from 'react';
import { ChevronRight, Clock, Info } from 'lucide-react';
import '../Styles/DietPage.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import '../Styles/heading.css';
import Navbar from '../components/Navbar.jsx';
const extractUser = (authToken) => {
  try {
    const tokenPayload = JSON.parse(atob(authToken.split(".")[1]));
    return tokenPayload.id || "";
  } catch (error) {
    console.error("Error extracting user role from authToken:", error);
    return "";
  }
};

const DietPlanPage = () => {
  const [activeTab, setActiveTab] = useState('meal-plan');
  const [cookies] = useCookies(['authToken']);
  const [user, setUser] = useState(null);
  const [mealPlan, setMealPlan] = useState([]); // State to store meal plan
  const [isPlanGenerated, setIsPlanGenerated] = useState(false);
  const authToken = cookies.authToken || "";
  const userId = extractUser(authToken);

  const nutritionFacts = {
    calories: 1530,
    protein: 92,
    carbs: 145,
    fat: 67,
    fiber: 28,
    sugar: 34
  };

  const fetchUser = async (userId) => {
    try {

      const headers = { Authorization: `Bearer ${cookies.authToken}` };
      const response = await axios.get(`http://localhost:8000/api/users/${userId}`, { headers });
      setUser(response.data); // assuming `data` contains the user details
      console.log(response.data)
      const userHistory = response.data.data.history; // Extract user's history
      console.log(userHistory)
      await sendUserHistory(userHistory); // Send user history
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const sendUserHistory = async (userHistory) => {
    try {
      console.log(userHistory)
      const response = await axios.post('http://localhost:8080/dietary_plan', { history: userHistory });
      console.log("User history sent successfully");

      // Assuming the response contains the meal plan data
      console.log(response.data.dietary_plan);
      setMealPlan(response.data.dietary_plan); // Update meal plan state
      setIsPlanGenerated(true);

    } catch (err) {
      console.error("Error sending user history:", err);
    }
  };

  return (
<>
<Navbar/>

    <div className="max-w-md mx-auto bg-sky-50 min-h-screen">
        
      
      {/* Header Tabs */}
      <div class="two my-2">
        <h1>DIET PLAN
          <span>Care for your body and soul</span>
        </h1>
      </div>
      <div className="flex border-b border-sky-200 my-2">
        <button
          className={`flex-1 py-2 text-center ${activeTab === 'meal-plan'
              ? 'text-sky-600 border-b-2 border-sky-800 font-medium'
              : 'text-gray-500 font-black'
            }`}
          style={{ width: ' -webkit-fill-available', backgroundColor: "#cee8ff" }}
          onClick={() => setActiveTab('meal-plan')}
        >
          Meal Plan
        </button>
        <button
          className={`flex-1 py-2 text-center ${activeTab === 'nutrition'
              ? 'text-sky-600 border-b-2 border-sky-600 font-medium'
              : 'text-gray-500 font-black'
            }`}
          style={{ width: "100%", backgroundColor: "wheat" }}
          onClick={() => setActiveTab('nutrition')}
        >
          Nutrition Facts
        </button>
      </div>
      {!isPlanGenerated && ( // Conditionally render the button

        <button class="form-control my-2" onClick={() => fetchUser(userId)}>Generate Personalized Plan</button>
      )}
      <div className="p-4">
        {activeTab === 'meal-plan' ? (
          // Meal Plan Tab
          <div className="space-y-4">
            {mealPlan.length > 0 ? (
              <div className="border rounded-md p-4 bg-white shadow-lg">
                {mealPlan.split('\n').map((line, index) => (
                  <div key={index} className="my-1 text-gray-800">{line}</div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600">No meal plan available.</div>
            )}
          </div>
        ) : (
          // Nutrition Facts Tab
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Nutrition</h2>
            <div className="space-y-4">
              {Object.entries(nutritionFacts).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <span className="capitalize text-gray-700">{key}</span>
                    <Info className="w-4 h-4 text-sky-400 ml-2" />
                  </div>
                  <span className="text-gray-900 font-medium">
                    {value}{key === 'calories' ? '' : 'g'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default DietPlanPage;

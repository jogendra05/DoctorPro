const diabetesGeneral = async (req, res) => {
  try {
    const {
      heightCm,
      weightKg,
      Urination,
      Excessive_Thirst,
      Fatigue,
      Hunger,
      family_history,
    } = req.body;

    // Function to calculate BMI
    function calculateBMI(heightCm, weightKg) {
      const heightM = heightCm / 100;
      return parseFloat((weightKg / heightM ** 2).toFixed(2));
    }

    const weights = {
      Excessive_Thirst: {
        Yes: 3,
        No: 0,
      },
      Fatigue: {
        High: 3,
        Moderate: 1,
        No: 0,
      },
      Hunger: {
        "Excessive  ": 3,
        "More than Normal": 1,
        Normal: 0,
      },
      Urination: {
        Normal: 0,
        "Excessive Urination": 6,
        "Frequent Urination": 4,
      },
      family_history: {
        Yes: 4,
        No: 0,
      },
    };

    // Function to predict disease risk
    function predictDiseaseRisk(
      heightCm,
      weightKg,
      Urination,
      Excessive_Thirst,
      Fatigue,
      Hunger,
      family_history
    ) {
      const bmi = calculateBMI(heightCm, weightKg);
      let bmiWeight = 0;

      if (bmi < 18.5) {
        bmiWeight = 1;
      } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiWeight = 0;
      } else if (bmi >= 25 && bmi < 29.9) {
        bmiWeight = 2;
      } else {
        bmiWeight = 3;
      }

      const riskScore =
        weights.Excessive_Thirst[Excessive_Thirst] +
        weights.Fatigue[Fatigue] +
        weights.Hunger[Hunger] +
        bmiWeight +
        weights.Urination[Urination] +
        weights.family_history[family_history];

      let riskCategory = "";
      let message = "";

      if (riskScore <= 7) {
        riskCategory = "Safe";
        message = "You are fit! Keep up the good work.";
      } else if (riskScore >= 8 && riskScore <= 14) {
        riskCategory = "Moderate Risk";
        message = "Consult a healthcare professional for personalized advice.";
      } else {
        riskCategory = "High Risk";
        message = "It's advisable to consult a doctor for further evaluation.";
      }

      return { riskCategory, message };
    }

    const { riskCategory, message } = predictDiseaseRisk(
      heightCm,
      weightKg,
      Urination,
      Excessive_Thirst,
      Fatigue,
      Hunger,
      family_history
    );

    res.json({ success: true, riskCategory, message });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const heartAttackRisk = async (req, res) => {
  try {
    const {
      height,
      weight,
      age,
      chestPain,
      shortnessOfBreath,
      fatigue,
      dizziness,
      painInOtherAreas,
      familyHistoryDiabetes,
    } = req.body;

    // Function to calculate BMI
    function calculateBMI(height, weight) {
      const heightM = height / 100;
      return parseFloat((weight / heightM ** 2).toFixed(2));
    }

    const weights = {
      chestPain: {
        No: 0,
        Elevated: 3,
        "High Pain": 5,
      },
      shortnessOfBreath: {
        Yes: 4,
        No: 0,
      },
      fatigue: {
        No: 0,
        Light: 2,
        High: 4,
      },
      dizziness: {
        No: 0,
        Light: 2,
        High: 4,
      },
      painInOtherAreas: {
        No: 0,
        Light: 2,
        High: 5,
      },
      familyHistoryDiabetes: {
        Yes: 4,
        No: 0,
      },
      age: {
        Young: 0, // Below 30 years
        Middle: 2, // Between 30-50 years
        Elderly: 4, // Above 50 years
      },
    };

    // Function to categorize age
    function categorizeAge(age) {
      if (age < 30) return "Young";
      if (age >= 30 && age <= 50) return "Middle";
      return "Elderly";
    }

    // Function to predict heart attack risk
    function predictHeartAttackRisk(
      height,
      weight,
      age,
      chestPain,
      shortnessOfBreath,
      fatigue,
      dizziness,
      painInOtherAreas,
      familyHistoryDiabetes
    ) {
      const bmi = calculateBMI(height, weight);
      let bmiWeight = 0;

      if (bmi < 18.5) {
        bmiWeight = 1;
      } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiWeight = 0;
      } else if (bmi >= 25 && bmi < 29.9) {
        bmiWeight = 2;
      } else {
        bmiWeight = 3;
      }

      const ageCategory = categorizeAge(age);

      const try1 = [
        weights.chestPain[chestPain],
        weights.shortnessOfBreath[shortnessOfBreath],
        weights.fatigue[fatigue],
        weights.dizziness[dizziness],
        weights.painInOtherAreas[painInOtherAreas],
        weights.familyHistoryDiabetes[familyHistoryDiabetes],
        weights.age[ageCategory],
        bmiWeight
      ]

      const riskScore =
        weights.chestPain[chestPain] +
        weights.shortnessOfBreath[shortnessOfBreath] +
        weights.fatigue[fatigue] +
        weights.dizziness[dizziness] +
        weights.painInOtherAreas[painInOtherAreas] +
        weights.familyHistoryDiabetes[familyHistoryDiabetes] +
        weights.age[ageCategory] +
        bmiWeight;

      let riskCategory = "";
      let message = "";

      if (riskScore <= 7) {
        riskCategory = "Safe";
        message = "You are fit! Maintain a healthy lifestyle.";
      } else if (riskScore >= 8 && riskScore <= 14) {
        riskCategory = "Moderate Risk";
        message = "Consult a healthcare professional for personalized advice.";
      } else {
        riskCategory = "High Risk";
        message = "It's advisable to consult a doctor for further evaluation.";
      }

      return { riskCategory, message, try1 };
    }

    const { riskCategory, message, try1 } = predictHeartAttackRisk(
      height,
      weight,
      age,
      chestPain,
      shortnessOfBreath,
      fatigue,
      dizziness,
      painInOtherAreas,
      familyHistoryDiabetes
    );

    res.json({ success: true, riskCategory, message, try1 });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { diabetesGeneral, heartAttackRisk };

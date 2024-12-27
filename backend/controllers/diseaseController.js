const diabetesGeneral = async (req, res) => {
  try {

    const {heightCm, weightKg, Urination, Excessive_Thirst, Fatigue, Hunger, family_history} = req.body

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
        Never: 0,
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

    const {riskCategory, message} = predictDiseaseRisk(heightCm, weightKg, Urination, Excessive_Thirst, Fatigue, Hunger, family_history)

    res.json({success:true, riskCategory, message})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {diabetesGeneral}
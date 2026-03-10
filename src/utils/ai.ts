export type WasteCategory = 'blister packs' | 'medicine bottles' | 'sachet packaging' | 'expired tablets/capsules' | 'unknown';
export type RiskScore = 'Low' | 'Medium' | 'High';

export interface AIClassificationResult {
  category: WasteCategory;
  confidence: number;
}

export interface AIRiskResult {
  score: RiskScore;
  reason: string;
}

/**
 * Mocks an AI endpoint that classifies waste based on an image and description.
 * @param description User provided text description
 * @param imageFile The uploaded image file
 */
export async function classifyWaste(description: string, imageFile?: File): Promise<AIClassificationResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const descLower = description.toLowerCase();
  
  // Simple heuristic to mock AI output based on keywords
  if (descLower.includes('blister') || descLower.includes('pack')) {
    return { category: 'blister packs', confidence: 0.92 };
  }
  if (descLower.includes('bottle') || descLower.includes('syrup')) {
    return { category: 'medicine bottles', confidence: 0.88 };
  }
  if (descLower.includes('sachet') || descLower.includes('nylon')) {
    return { category: 'sachet packaging', confidence: 0.85 };
  }
  if (descLower.includes('tablet') || descLower.includes('capsule') || descLower.includes('pill')) {
    return { category: 'expired tablets/capsules', confidence: 0.95 };
  }

  // Default fallback if no keywords match but image is present
  if (imageFile) {
    return { category: 'expired tablets/capsules', confidence: 0.75 };
  }

  return { category: 'unknown', confidence: 0.4 };
}

/**
 * Mocks an AI endpoint that evaluates environmental risk score.
 * @param category The classified waste category
 * @param amount estimated quantity (e.g. number of items)
 * @param proximityToWater distance to drainage/water in meters
 */
export async function evaluateRiskScore(category: WasteCategory, amount: number, proximityToWater: number): Promise<AIRiskResult> {
  await new Promise(resolve => setTimeout(resolve, 800));

  if (category === 'expired tablets/capsules' && amount > 50 && proximityToWater < 50) {
    return {
      score: 'High',
      reason: 'Large quantity of active compounds near water source. High risk of aquatic contamination.'
    };
  }

  if ((category === 'expired tablets/capsules' || category === 'medicine bottles') && proximityToWater < 100) {
    return {
      score: 'Medium',
      reason: 'Moderate risk due to proximity to drainage. Recommend immediate safe collection.'
    };
  }
  
  if (amount > 100) {
     return {
       score: 'Medium',
       reason: 'Large volume of waste requires scheduled pickup.'
     };
  }

  return {
    score: 'Low',
    reason: 'Standard risk profile. Proceed with regular disposal channels.'
  };
}

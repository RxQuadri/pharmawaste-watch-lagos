// src/utils/gamification.ts

export type BadgeTier = 'Seedling' | 'Eco-Warrior' | 'Green Citizen' | 'Lagos Guardian';

export interface BadgeConfig {
  name: BadgeTier;
  minPoints: number;
}

export const BADGE_TIERS: BadgeConfig[] = [
  { name: 'Seedling', minPoints: 0 },
  { name: 'Eco-Warrior', minPoints: 51 },
  { name: 'Green Citizen', minPoints: 201 },
  { name: 'Lagos Guardian', minPoints: 500 },
];

export interface BadgeStatus {
  currentBadge: BadgeTier;
  nextBadge: BadgeTier | null;
  progressPercentage: number;
  pointsToNext: number;
}

/**
 * Calculates a user's badge status based on total points.
 */
export function calculateBadgeStatus(totalPoints: number): BadgeStatus {
  let currentBadge: BadgeTier = BADGE_TIERS[0].name;
  let nextBadge: BadgeTier | null = BADGE_TIERS[1].name;
  let minPointsCurrent = BADGE_TIERS[0].minPoints;
  let minPointsNext: number | null = BADGE_TIERS[1].minPoints;

  for (let i = 0; i < BADGE_TIERS.length; i++) {
    if (totalPoints >= BADGE_TIERS[i].minPoints) {
      currentBadge = BADGE_TIERS[i].name;
      minPointsCurrent = BADGE_TIERS[i].minPoints;
      
      if (i + 1 < BADGE_TIERS.length) {
        nextBadge = BADGE_TIERS[i + 1].name;
        minPointsNext = BADGE_TIERS[i + 1].minPoints;
      } else {
        nextBadge = null;
        minPointsNext = null;
      }
    } else {
      break;
    }
  }

  let progressPercentage = 100;
  let pointsToNext = 0;

  if (nextBadge && minPointsNext !== null) {
    const pointsInTier = totalPoints - minPointsCurrent;
    const tierRange = minPointsNext - minPointsCurrent;
    progressPercentage = Math.min(100, Math.max(0, (pointsInTier / tierRange) * 100));
    pointsToNext = minPointsNext - totalPoints;
  }

  return {
    currentBadge,
    nextBadge,
    progressPercentage,
    pointsToNext,
  };
}

/**
 * Dummy function that calculates points based on waste type.
 */
export function calculatePointsForWaste(wasteType: string, quantity: number = 1): number {
  const normalizedType = wasteType.toLowerCase();
  
  // Base point values per item/unit
  let pointsPerUnit = 5;
  
  if (normalizedType.includes('blister') || normalizedType.includes('pill') || normalizedType.includes('tablet')) {
    pointsPerUnit = 10;
  } else if (normalizedType.includes('bottle') || normalizedType.includes('liquid') || normalizedType.includes('syrup')) {
    pointsPerUnit = 20;
  } else if (normalizedType.includes('inhaler') || normalizedType.includes('aerosol')) {
    pointsPerUnit = 25;
  } else if (normalizedType.includes('injection') || normalizedType.includes('needle') || normalizedType.includes('sharp')) {
    // High points due to high risk
    pointsPerUnit = 30;
  }
  
  return pointsPerUnit * quantity;
}

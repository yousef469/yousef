// Component to render enhanced lesson content with calculators and diagrams
import RocketEquationCalculator from './calculators/RocketEquationCalculator';
import BrakingDistanceCalculator from './calculators/BrakingDistanceCalculator';
import OhmsLawCalculator from './calculators/OhmsLawCalculator';
import LiftCalculator from './calculators/LiftCalculator';
import OrbitalTransferCalculator from './calculators/OrbitalTransferCalculator';

import RocketDiagram from './diagrams/RocketDiagram';
import AircraftDiagram from './diagrams/AircraftDiagram';
import CarDiagram from './diagrams/CarDiagram';

export default function EnhancedLessonContent({ lessonId, subject }) {
  // Rocket lessons with calculators/diagrams (supports both string and numeric IDs)
  if (subject === 'rockets') {
    // Rocket Equation lessons
    if (lessonId === 'rocket-equation' || lessonId === 0 || lessonId === 7) {
      return (
        <div>
          <RocketEquationCalculator />
          <RocketDiagram type="basic" />
        </div>
      );
    }
    // Forces/vectors lessons
    if (lessonId === 'vectors-forces' || lessonId === 'newtons-laws' || lessonId === 6) {
      return <RocketDiagram type="forces" />;
    }
    // Staging lesson
    if (lessonId === 9) {
      return <RocketDiagram type="staging" />;
    }
    // Orbital mechanics lessons
    if (lessonId === 'orbital-mechanics-intro' || lessonId === 20 || lessonId === 21) {
      return <OrbitalTransferCalculator />;
    }
    // Default for other rocket lessons - show basic diagram
    return <RocketDiagram type="basic" />;
  }

  // Car lessons with calculators/diagrams
  if (subject === 'cars') {
    if (lessonId === 6 || lessonId === 7) {
      // Vehicle dynamics / braking lessons
      return (
        <div>
          <BrakingDistanceCalculator />
          <CarDiagram type="braking" />
        </div>
      );
    }
    if (lessonId === 8 || lessonId === 9) {
      // Forces lessons
      return <CarDiagram type="forces" />;
    }
    if (lessonId === 10 || lessonId === 11) {
      // Powertrain lessons
      return <CarDiagram type="powertrain" />;
    }
  }

  // Aircraft lessons with calculators/diagrams
  if (subject === 'planes') {
    if (lessonId === 6 || lessonId === 7) {
      // Lift and aerodynamics lessons
      return (
        <div>
          <LiftCalculator />
          <AircraftDiagram type="forces" />
        </div>
      );
    }
    if (lessonId === 8 || lessonId === 9) {
      // Airfoil lessons
      return <AircraftDiagram type="airfoil" />;
    }
    if (lessonId === 10 || lessonId === 11) {
      // Aircraft components
      return <AircraftDiagram type="basic" />;
    }
  }

  // Electronics lessons with calculators
  if (subject === 'electronics') {
    if (lessonId === 0 || lessonId === 1) {
      // Basic electronics lessons
      return <OhmsLawCalculator />;
    }
  }

  return null;
}

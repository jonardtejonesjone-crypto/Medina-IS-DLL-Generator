import { Type } from '@google/genai'; // Import Type for schema definition

export interface LessonPlanFormData {
  gradeLevel: string;
  quarter: string;

  subject: string;
  weeklyContentTopic: string;
  contentStandard: string;
  performanceStandard: string;
  weeklyLearningCompetency: string;

  mondayTopic: string;
  tuesdayTopic: string;
  wednesdayTopic: string;
  thursdayTopic: string;
  fridayTopic: string;
  planDuration: string; // Added to match the form input
}

export interface DayProcedures {
  reviewNewLesson: string; // A. Review/New Lesson
  establishingPurposeMotivation: string; // B. Establishing a purpose (Motivation)
  presentingExamplesInstances: string; // C. Presenting examples/instances
  discussingNewConcepts1: string; // D. Discussing new concepts (#1)
  discussingNewConcepts2: string; // E. Discussing new concepts (#2)
  developingMasteryFormativeAssessment: string; // F. Developing mastery (Formative Assessment)
  practicalApplicationOfConcepts: string; // G. Practical application of concepts
  makingGeneralizationsAbstractions: string; // H. Making generalizations/abstractions
  evaluatingLearningAssessment: string; // I. Evaluating learning (Assessment)
  additionalActivitiesRemediation: string; // J. Additional activities/remediation
}

export interface DailyLessonLogOutput {
  school: string;
  teacher: string;
  teachingDatesAndTime: string;
  gradeLevel: string;
  learningArea: string;
  quarter: string;
  subject: string;
  contentStandard: string; // Weekly
  performanceStandard: string; // Weekly
  learningCompetency: string; // C. Learning Competency (LC Code) - Weekly

  weeklyLearningObjectives: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
  }; // D. Learning Objectives (Weekly) - appears daily in sample
  contentTopic: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
  }; // II. CONTENT (Topic) - appears daily in sample

  learningResources: {
    references: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
    };
    otherResources: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
    };
  };

  procedures: {
    monday: DayProcedures;
    tuesday: DayProcedures;
    wednesday: DayProcedures;
    thursday: DayProcedures;
    friday: DayProcedures;
  };
}

const DayProceduresSchema = {
  type: Type.OBJECT,
  properties: {
    reviewNewLesson: { type: Type.STRING },
    establishingPurposeMotivation: { type: Type.STRING },
    presentingExamplesInstances: { type: Type.STRING },
    discussingNewConcepts1: { type: Type.STRING },
    discussingNewConcepts2: { type: Type.STRING },
    developingMasteryFormativeAssessment: { type: Type.STRING },
    practicalApplicationOfConcepts: { type: Type.STRING },
    makingGeneralizationsAbstractions: { type: Type.STRING },
    evaluatingLearningAssessment: { type: Type.STRING },
    additionalActivitiesRemediation: { type: Type.STRING },
  },
  required: [
    'reviewNewLesson',
    'establishingPurposeMotivation',
    'presentingExamplesInstances',
    'discussingNewConcepts1',
    'discussingNewConcepts2',
    'developingMasteryFormativeAssessment',
    'practicalApplicationOfConcepts',
    'makingGeneralizationsAbstractions',
    'evaluatingLearningAssessment',
    'additionalActivitiesRemediation',
  ],
};

export const DailyLessonLogOutputSchema = {
  type: Type.OBJECT,
  properties: {
    school: { type: Type.STRING },
    teacher: { type: Type.STRING },
    teachingDatesAndTime: { type: Type.STRING },
    gradeLevel: { type: Type.STRING },
    learningArea: { type: Type.STRING },
    quarter: { type: Type.STRING },
    subject: { type: Type.STRING },
    contentStandard: { type: Type.STRING },
    performanceStandard: { type: Type.STRING },
    learningCompetency: { type: Type.STRING },
    weeklyLearningObjectives: {
      type: Type.OBJECT,
      properties: {
        monday: { type: Type.STRING },
        tuesday: { type: Type.STRING },
        wednesday: { type: Type.STRING },
        thursday: { type: Type.STRING },
        friday: { type: Type.STRING },
      },
      required: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    },
    contentTopic: {
      type: Type.OBJECT,
      properties: {
        monday: { type: Type.STRING },
        tuesday: { type: Type.STRING },
        wednesday: { type: Type.STRING },
        thursday: { type: Type.STRING },
        friday: { type: Type.STRING },
      },
      required: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    },
    learningResources: {
      type: Type.OBJECT,
      properties: {
        references: {
          type: Type.OBJECT,
          properties: {
            monday: { type: Type.STRING },
            tuesday: { type: Type.STRING },
            wednesday: { type: Type.STRING },
            thursday: { type: Type.STRING },
            friday: { type: Type.STRING },
          },
          required: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        },
        otherResources: {
          type: Type.OBJECT,
          properties: {
            monday: { type: Type.STRING },
            tuesday: { type: Type.STRING },
            wednesday: { type: Type.STRING },
            thursday: { type: Type.STRING },
            friday: { type: Type.STRING },
          },
          required: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        },
      },
      required: ['references', 'otherResources'],
    },
    procedures: {
      type: Type.OBJECT,
      properties: {
        monday: DayProceduresSchema,
        tuesday: DayProceduresSchema,
        wednesday: DayProceduresSchema,
        thursday: DayProceduresSchema,
        friday: DayProceduresSchema,
      },
      required: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    },
  },
  required: [
    'gradeLevel',
    'learningArea',
    'quarter',
    'subject',
    'contentStandard',
    'performanceStandard',
    'learningCompetency',
    'weeklyLearningObjectives',
    'contentTopic',
    'learningResources',
    'procedures',
  ],
};

export interface GenerationRequest {
  model: string;
  prompt: string;
  apiKey?: string; // Made optional as it will be passed explicitly
}

export interface GenerationResponse {
  text: string;
}
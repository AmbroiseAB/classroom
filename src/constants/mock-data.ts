import { Subject } from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Computer Science',
    department: 'Computer Science',
    description: 'Foundational course covering programming, algorithms, and computing systems for first-year students.',
    createdAt: '2026-01-10T09:00:00.000Z'
  },
  {
    id: 2,
    code: 'ENG205',
    name: 'Professional Communication',
    department: 'English',
    description: 'Explores writing, speaking, and presentation skills for academic and professional settings.',
    createdAt: '2026-01-11T09:00:00.000Z'
  },
  {
    id: 3,
    code: 'MATH220',
    name: 'Calculus II',
    department: 'Mathematics',
    description: 'Continues integral and differential calculus with applications in science and engineering.',
    createdAt: '2026-01-12T09:00:00.000Z'
  }
];

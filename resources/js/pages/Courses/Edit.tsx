// resources/js/Pages/Courses/Edit.tsx
import FormCourse from './FormCourse';
import { Instructor, Course } from '@/types/models';

interface Props {
    course: Course & {
        instructor: Instructor;
    };
    instructors: Instructor[];
}

export default function Edit({ course, instructors }: Props) {
    return (
        <FormCourse
            course={course}
            instructors={instructors}
            isEditing={true}
        />
    );
}

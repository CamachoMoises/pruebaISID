export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    two_factor_confirmed_at?: string;
    created_at: string;
    updated_at: string;
    // Relations
    favorite_courses?: Course[];
    comments?: Comment[];
    ratings?: Rating[];
}

export interface Instructor {
    id: number;
    name: string;
    email: string;
    bio: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    // Relations
    courses?: Course[];
    comments?: Comment[];
    ratings?: Rating[];
}

export type CourseStatus = 'borrador' | 'published' | 'archived';

export interface Course {
    id: number;
    instructor_id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    status: CourseStatus;
    average_rating: number;
    total_ratings: number;
    level: 'principiante' | 'intermedio' | 'avanzado';
    total_students: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    // Relations
    instructor?: Instructor;
    lessons?: Lesson[];
    favorited_by_users?: User[];
    comments?: Comment[];
    ratings?: Rating[];
}

export interface Lesson {
    id: number;
    course_id: number;
    title: string;
    description: string;
    video_url: string;
    order: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    // Relations
    course?: Course;
}

export interface Comment {
    id: number;
    user_id: number;
    commentable_id: number;
    commentable_type: 'App\\Models\\Course' | 'App\\Models\\Instructor';
    content: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    // Relations
    user?: User;
    commentable?: Course | Instructor;
}

export interface Rating {
    id: number;
    user_id: number;
    ratable_id: number;
    ratable_type: 'App\\Models\\Course' | 'App\\Models\\Instructor';
    rating: number; // 1-5
    review?: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    // Relations
    user?: User;
    ratable?: Course | Instructor;
}

export interface PivotCourseUser {
    id: number;
    user_id: number;
    course_id: number;
    favorited_at: string;
}


export interface PaginatedData<T> {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}
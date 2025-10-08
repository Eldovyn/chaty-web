declare interface RegisterInput {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    provider: string
}

declare interface LoginInput {
    email: string;
    password: string;
    provider: string
}

declare interface FormErrorsRegister {
    username?: string[];
    email?: string[];
    password?: string[];
    confirm_password?: string[];
    password_security?: string[];
    password_match?: string[];
}

declare interface FormErrorsLogin {
    email?: string[];
    password?: string[];
}

declare interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
    data?: {
        [field: string]: string[];
    };
    token?: {
        [field: string]: string[];
    };
}
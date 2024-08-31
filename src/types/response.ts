export interface ResponseType {
    status_code: number;
    success: boolean;
    message?: string;
    data?: Record<string, any>;
    error?: string;
    messages?: Record<string, Message[]>;
    is_accepting_messages?: boolean;
  }
  
  interface Message {
    // Define the structure of your `Message` model here
    // For example:
    id: string;
    content: string;
    createdAt: string;
    // Add more fields as per your Go `models.Message` struct
  }
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

    id: string;
    content: string;
    createdAt: string;
  }
export interface TutorChatMessageDTO {
  id: string;
  sender: "user" | "kibo";
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    href: string;
  };
}

export interface AskTutorRequestDTO {
  message: string;
  grade?: number;
  interest?: string;
  conversationHistory?: Array<{
    role: "user" | "model";
    parts: string;
  }>;
}

export interface AskTutorResponseDTO {
  reply: string;
  suggestedChips?: string[];
  suggestedAction?: {
    label: string;
    href: string;
  };
}

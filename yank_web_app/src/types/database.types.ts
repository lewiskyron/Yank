export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			Flashcard: {
				Row: {
					created_at: string;
					difficulty: number | null;
					due: string | null;
					flashcard_id: string;
					folder_id: number;
					lapses: number | null;
					last_review: string | null;
					reps: number | null;
					scheduled_days: number | null;
					stability: number | null;
					state: number | null;
					text: string;
					user_id: string | null;
				};
				Insert: {
					created_at?: string;
					difficulty?: number | null;
					due?: string | null;
					flashcard_id?: string;
					folder_id: number;
					lapses?: number | null;
					last_review?: string | null;
					reps?: number | null;
					scheduled_days?: number | null;
					stability?: number | null;
					state?: number | null;
					text: string;
					user_id?: string | null;
				};
				Update: {
					created_at?: string;
					difficulty?: number | null;
					due?: string | null;
					flashcard_id?: string;
					folder_id?: number;
					lapses?: number | null;
					last_review?: string | null;
					reps?: number | null;
					scheduled_days?: number | null;
					stability?: number | null;
					state?: number | null;
					text?: string;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "Flashcard_folder_id_fkey";
						columns: ["folder_id"];
						isOneToOne: false;
						referencedRelation: "Folders";
						referencedColumns: ["folder_id"];
					},
				];
			};
			Folders: {
				Row: {
					created_at: string;
					folder_id: number;
					folder_name: string;
					no_of_flashcards: number;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					folder_id?: number;
					folder_name: string;
					no_of_flashcards?: number;
					user_id?: string;
				};
				Update: {
					created_at?: string;
					folder_id?: number;
					folder_name?: string;
					no_of_flashcards?: number;
					user_id?: string;
				};
				Relationships: [];
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					first_name: string | null;
					id: string;
					last_name: string | null;
					role: string | null;
					updated_at: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					first_name?: string | null;
					id: string;
					last_name?: string | null;
					role?: string | null;
					updated_at?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					first_name?: string | null;
					id?: string;
					last_name?: string | null;
					role?: string | null;
					updated_at?: string | null;
				};
				Relationships: [];
			};
			views: {
				Row: {
					created_at: string;
					id: number;
					namer: string | null;
				};
				Insert: {
					created_at?: string;
					id?: number;
					namer?: string | null;
				};
				Update: {
					created_at?: string;
					id?: number;
					namer?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
		? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

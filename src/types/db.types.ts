export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accessibility: {
        Row: {
          clinic_id: number
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          clinic_id: number
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          clinic_id?: number
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accessiblity_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      amenities: {
        Row: {
          clinic_id: number
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          clinic_id: number
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          clinic_id?: number
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "amenities_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      category: {
        Row: {
          clinic_id: number
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          clinic_id: number
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          clinic_id?: number
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      clinics: {
        Row: {
          address: string
          archive: boolean
          boosted: boolean
          contacts: string[] | null
          created_at: string
          description: string | null
          doctor_id: number
          email: string
          id: number
          img: string
          map: string | null
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address: string
          archive?: boolean
          boosted?: boolean
          contacts?: string[] | null
          created_at?: string
          description?: string | null
          doctor_id: number
          email: string
          id?: number
          img?: string
          map?: string | null
          name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string
          archive?: boolean
          boosted?: boolean
          contacts?: string[] | null
          created_at?: string
          description?: string | null
          doctor_id?: number
          email?: string
          id?: number
          img?: string
          map?: string | null
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clinics_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          active: boolean
          category_id: number
          clinic_id: number
          created_at: string
          description: string | null
          id: number
          img: string | null
          name: string
          rate: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          category_id: number
          clinic_id: number
          created_at?: string
          description?: string | null
          id?: number
          img?: string | null
          name: string
          rate?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          category_id?: number
          clinic_id?: number
          created_at?: string
          description?: string | null
          id?: number
          img?: string | null
          name?: string
          rate?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_category_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          address: string | null
          auth_id: string
          birth_date: string | null
          boost: boolean
          clinic_id: number | null
          contacts: string[] | null
          created_at: string | null
          email: string
          id: number
          img: string | null
          license_number: string
          name: string
          role: string | null
          updated_at: string
          verified: boolean
        }
        Insert: {
          address?: string | null
          auth_id: string
          birth_date?: string | null
          boost?: boolean
          clinic_id?: number | null
          contacts?: string[] | null
          created_at?: string | null
          email: string
          id?: number
          img?: string | null
          license_number: string
          name: string
          role?: string | null
          updated_at?: string
          verified?: boolean
        }
        Update: {
          address?: string | null
          auth_id?: string
          birth_date?: string | null
          boost?: boolean
          clinic_id?: number | null
          contacts?: string[] | null
          created_at?: string | null
          email?: string
          id?: number
          img?: string | null
          license_number?: string
          name?: string
          role?: string | null
          updated_at?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "user_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never

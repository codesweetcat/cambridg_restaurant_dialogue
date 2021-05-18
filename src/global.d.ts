export interface I_taskData {
  'task_name'?:string;
  'function_name'?:string;
  'mturk_user_id'?:string;
  }
  
  export interface I_userUtt_item {
   'user_utt'?: string; 
   'confidence_score'?: string;
                      }
  export interface I_dialogue_payLoad {//
    'session_id'?: string
    'utt_number'?: number;
    'user_utt'?:string;
    'user_utt_array'?: I_userUtt_item[] | null;
    'function_name'?:string;
    }
  
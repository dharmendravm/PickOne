import type { CloudinaryUploadResponse } from "../services/cloudinary.service.js";
import type { ApiResponse } from "./api.js";
type image = {
  image: CloudinaryUploadResponse
}

type battle = {
 title: string;
 description: string;
 image: string;
 created_at: Date;
 expires_at: Date;
 id: number;
}


export interface CreateBattleApiRequest {
  title: string;
  description: string;
  image: File;
  expires_at: string | Date;
}

interface CreateBattleResponse {
  statusCode: number;
  message: string;
  data?: battle;
}

export type CreateBattleApiResponse = ApiResponse<CreateBattleResponse>;

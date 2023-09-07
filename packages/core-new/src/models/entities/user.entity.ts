export interface UserRoles {
  admin?: boolean;
  adminWeb?: boolean;
  managerWeb?: boolean;
  adminProviders?: Record<string, boolean>;
  protectorProviders?: Record<string, boolean>;
  traderProviders?: Record<string, boolean>;
  viewerProviders?: Record<string, boolean>;
}

export interface UserPushNotif {
  type: 'fcm' | 'expo',
  token: string,
  topic?: string,
  data?: any,
}

export interface User {
  _id: string;
  email: string;
  name: string;
  picture?: string;

  roles?: UserRoles;
  starProviders?: Record<string, boolean>;

  telegram?: {
    userId: string;
    userName?: string;
    phoneNumber?: string;
  };

  pushNotif?: UserPushNotif[];

  updatedAt?: Date;
  createdAt?: Date;
}

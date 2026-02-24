export interface UserDTO {
  id: string;
  username: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
}

export default async function UserFetch(): Promise<ApiResponse<UserDTO>> {
  try {
    const res = await fetch("http://localhost:4000/users/me", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      if (res.status === 401) {
        return { success: false, data: null };
      }
      return { success: false, data: null };
    }

    const result: ApiResponse<UserDTO> = await res.json();

    return result;
  } catch (error) {
    return { success: false, data: null };
  }
}

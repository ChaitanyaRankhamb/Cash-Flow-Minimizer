export interface GroupDTO {
  id: {
    value: string;
  };
  name?: string;
  description?: string;
  isActive: boolean;
}


export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export default async function getGroups() {
  try {
    const res = await fetch("http://localhost:4000/groups/", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch groups");
    }

    const result: ApiResponse<GroupDTO[]> = await res.json();

    console.log("groups: ", result);
    return result;
  } catch (error) {
    console.error("Groups Fetching failed");
  }
}

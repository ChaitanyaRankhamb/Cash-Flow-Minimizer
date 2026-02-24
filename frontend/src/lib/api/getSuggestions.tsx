type GroupRef = { id: {
  value: string
} };

export interface SuggestionDTO {
  id: string;
  who: string;
  whom: string;
  groupId: string;
  amount: number;
  isSettled: boolean;
}

export interface SuggestionResponseType {
  success: boolean;
  message: string;
  data: SuggestionDTO[];
}

export default async function getSuggestions(
  groups: GroupRef[]
): Promise<SuggestionDTO[]> {
  try {
    const responses = await Promise.all(
      groups.map((group) =>
        fetch(
          `http://localhost:4000/groups/${group.id.value}/balance/minimize`,
          {
            method: "GET",
            credentials: "include",
          }
        )
      )
    );

    const parsedResults: SuggestionDTO[] = [];

    for (const res of responses) {
      if (!res.ok) {
        console.error("Failed suggestion fetch:", res.status);
        continue; // skip only failed ones
      }

      const json: SuggestionResponseType = await res.json();

      if (json.success && Array.isArray(json.data)) {
        parsedResults.push(...json.data);
      }
    }

    console.log("suggestions: ", parsedResults);
    return parsedResults;
  } catch (error) {
    console.error("Error in suggestion fetching!", error);
    return [];
  }
}

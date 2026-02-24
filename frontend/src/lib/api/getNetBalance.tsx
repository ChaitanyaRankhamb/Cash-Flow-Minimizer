export interface BalanceDTO {
  userId: {
    value: string;
  };
  netBalance: number;
  role: "CREDITOR" | "DEBTOR" | "SETTLED";
}

export interface BalanceResponseType {
  success: boolean;
  message: string;
  data: BalanceDTO[];
}

type GroupRef = {
  id: {
    value: string;
  };
};

export default async function getNetBalance(
  groups: GroupRef[]
): Promise<BalanceDTO[]> {
  try {
    if (!groups || groups.length === 0) {
      return [];
    }

    const responses = await Promise.all(
      groups.map((group) =>
        fetch(
          `http://localhost:4000/groups/${group.id.value}/balance`,
          {
            method: "GET",
            credentials: "include",
          }
        )
      )
    );

    const parsedResults: BalanceDTO[] = [];

    for (const res of responses) {
      if (!res.ok) {
        console.error("Failed balance fetch:", res.status);
        continue; // skip failed group
      }

      const json: BalanceResponseType = await res.json();

      if (json.success && Array.isArray(json.data)) {
        parsedResults.push(...json.data);
      }
    }

    console.log("netBalance: ", parsedResults);
    return parsedResults;
  } catch (error) {
    console.error("Error during net balance fetching:", error);
    return [];
  }
}

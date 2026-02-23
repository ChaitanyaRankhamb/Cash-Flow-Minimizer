"use client";

export interface ExpenseDTO {
  id: string;
  amount: number;
  groupId: string;
  title: string;
  notes: string;
  expenseDate: string; // JSON returns string, not Date
}

interface ExpenseApiResponse {
  success: boolean;
  message: string;
  data: ExpenseDTO[];
}

type GroupRef = {
  id: {
    value: string;
  };
};

export default async function getExpenses(
  groups: GroupRef[]
): Promise<ExpenseDTO[]> {
  try {
    const responses = await Promise.all(
      groups.map((group) =>
        fetch(`http://localhost:4000/groups/${group.id.value}/expenses`, {
          method: "GET",
          credentials: "include",
        })
      )
    );

    const parsedResults: ExpenseDTO[] = [];

    for (const res of responses) {
      if (!res.ok) {
        console.error("Failed fetching group expenses:", res.status);
        continue; // Don't break entire dashboard
      }

      const json: ExpenseApiResponse = await res.json();

      if (json.success && Array.isArray(json.data)) {
        parsedResults.push(...json.data);
      }
    }

    return parsedResults;
  } catch (error) {
    console.error("Group expenses fetching failed:", error);
    return []; // Always return safe fallback
  }
}

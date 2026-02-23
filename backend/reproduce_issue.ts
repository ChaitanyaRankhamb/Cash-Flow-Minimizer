const BASE_URL = "http://localhost:4000";

async function run() {
  try {
    // 1. Register a user
    const email = `testuser_${Date.now()}@example.com`;
    const password = "password123";
    const registerRes = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        username: `Test User ${Date.now()}`,
      }),
    });

    const registerText = await registerRes.text();
    console.log("Register raw response:", registerText);
    let registerData;
    try {
      registerData = JSON.parse(registerText);
    } catch (e) {
      console.error("Failed to parse register response");
    }

    if (!registerRes.ok) {
      // try login if user already exists
      console.log("Register failed, trying login...");
    }

    // Login to get token
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-device-id": "test-device-id",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const loginText = await loginRes.text();
    console.log("Login raw response:", loginText);
    const loginData = JSON.parse(loginText);

    if (!loginRes.ok) {
      throw new Error("Login failed");
    }

    const token = loginData.token;
    const userId = loginData.user.id;

    // 2. Create a group
    const createGroupRes = await fetch(`${BASE_URL}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: `Test Group ${Date.now()}`,
        description: "This is a test group",
        userId: userId,
      }),
    });

    const createGroupData = await createGroupRes.json();
    console.log("Create Group response:", createGroupData);

    if (!createGroupRes.ok) {
      throw new Error("Create group failed");
    }

    const groupId = createGroupData.group.id.value;

    // 3. Check Balance
    console.log(`Checking balance for group ${groupId}...`);
    const balanceRes = await fetch(`${BASE_URL}/groups/${groupId}/balance`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const balanceData = await balanceRes.json();
    console.log("Balance response:", balanceData);

    if (!balanceRes.ok) {
      console.error("Balance check failed:", balanceData);
    } else {
      console.log("Balance check success!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

run();

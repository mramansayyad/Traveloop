import { NextResponse } from "next/server";
import { ai, defaultModel } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const { destination, days, budget } = await request.json();

    if (!destination || !days) {
      return NextResponse.json(
        { error: "Destination and days are required" },
        { status: 400 }
      );
    }

    const prompt = `You are an expert travel planner. Generate a detailed day-wise itinerary for a trip to ${destination} for ${days} days with a budget level of ${budget || "moderate"}.
    
    Provide the response ONLY as a valid JSON object with the following structure. Do not include any markdown formatting or extra text outside the JSON.
    
    {
      "trip": {
        "destination": "${destination}",
        "days": ${days},
        "budgetLevel": "${budget || "moderate"}",
        "summary": "A brief summary of the trip"
      },
      "itinerary": [
        {
          "day": 1,
          "title": "Day 1 Title",
          "activities": [
            {
              "title": "Activity Title",
              "description": "Short description of what to do",
              "cost": 50,
              "duration": 120
            }
          ]
        }
      ]
    }`;

    const response = await ai.models.generateContent({
      model: defaultModel,
      contents: prompt,
    });

    const text = response.text;
    
    // Attempt to parse the JSON
    try {
      // Sometimes the model might still wrap it in ```json ... ``` despite instructions
      const jsonContent = text.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
      const data = JSON.parse(jsonContent);
      return NextResponse.json(data);
    } catch (parseError) {
      console.error("Failed to parse JSON from Gemini response:", text);
      return NextResponse.json(
        { error: "Failed to generate structured itinerary", rawResponse: text },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ai, defaultModel } from "@/lib/gemini";

export async function saveTrip(data: {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  itinerary: any;
}) {
  try {
    // 1. Ensure a mock user exists
    let user = await prisma.user.findUnique({
      where: { email: "mockuser@traveloop.com" },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "mockuser@traveloop.com",
          name: "Mock Traveler",
        },
      });
    }

    // 2. Create the Trip
    const trip = await prisma.trip.create({
      data: {
        title: data.title || `Trip to ${data.destination}`,
        description: data.itinerary?.trip?.summary || `A wonderful trip to ${data.destination}`,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        userId: user.id,
        budget: {
          create: {
            totalBudget: data.budget === "luxury" ? 5000 : data.budget === "moderate" ? 2000 : 1000,
            currency: "USD",
          },
        },
      },
    });

    // 3. Create Stops and Activities
    // We assume each day is a stop for simplicity in this hackathon demo
    if (data.itinerary?.itinerary) {
      for (const day of data.itinerary.itinerary) {
        const stop = await prisma.stop.create({
          data: {
            cityName: data.destination, // Assuming same city for all days for now
            country: "Unknown", // Gemini might not return country in this specific structure
            arrivalAt: new Date(data.startDate), // Mock dates for stops
            departureAt: new Date(data.endDate),
            tripId: trip.id,
          },
        });

        if (day.activities) {
          for (const act of day.activities) {
            await prisma.activity.create({
              data: {
                title: act.title,
                description: `Day ${day.day} activity`,
                stopId: stop.id,
              },
            });
          }
        }
      }
    }

    revalidatePath("/dashboard");
    revalidatePath("/trips");

    return { success: true, tripId: trip.id };
  } catch (error) {
    console.error("Failed to save trip:", error);
    return { success: false, error: "Failed to save trip to database." };
  }
}

export async function askAI(question: string, context: string) {
  try {
    const prompt = `You are a helpful travel assistant for Traveloop. 
    The user is looking at their itinerary and asking a question.
    
    Trip Context: ${context}
    User Question: ${question}
    
    Provide a concise, friendly, and helpful answer.`;

    const response = await ai.models.generateContent({
      model: defaultModel,
      contents: prompt,
    });

    return { success: true, answer: response.text };
  } catch (error) {
    console.error("Failed to ask AI:", error);
    return { success: false, error: "Failed to get response from AI." };
  }
}

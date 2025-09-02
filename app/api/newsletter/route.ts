import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();

    // Forward the form data to Brevo
    const response = await fetch(
      "https://f7d6e1ff.sibforms.com/serve/MUIFAHPD2BAccwnpN1kWQTSaNjOC6H4laKDmSnI68HIM6PHBz7vexM__cJvE6dEYwkm9ytlkwMPgUaPujqvkSDrQeSiz-VzThaZpLyn9EfBvGIkURbnd6PVIOMvSU1E3YRRA222gsT5SCu80op_2m0QGymPamxL7-2IulBTKUf_9q7MozlTToKY9x0RyTzIr9ub8DIWNOEzq8Q4s",
      {
        method: "POST",
        body: body,
        headers: {
          // Don't set Content-Type - let fetch handle it for FormData
        },
      },
    );

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error("Brevo API error:", response.status, response.statusText);
      return NextResponse.json(
        { success: false, error: "Subscription failed" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}

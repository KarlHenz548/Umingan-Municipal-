import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        reply: "Hello! Gemini API key is missing in environment variables. However, here is standard LGU info: You can process business permits, real property taxes, civil registry documents at the Umingan Municipal Hall, Poblacion, Umingan, Pangasinan. Office hours are Monday to Friday, 8:00 AM to 5:00 PM."
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = `You are "Lingkod-Umingan AI", the official AI Citizen & Visitor Assistant for the Municipality of Umingan, Pangasinan, Philippines.

Key Municipal Info for Umingan, Pangasinan:
- Region: Ilocos Region (Region I), Province of Pangasinan.
- Mayor's Office: LGU Umingan Municipal Hall, Poblacion.
- Key Services: Business Permits & Licensing (BPLO), Real Property Tax (RPT), Civil Registrar (Birth/Marriage/Death certificates), Building Permits, Municipal Social Welfare & Development (MSWD), Municipal Agriculture Office (RSBSA Farmer Registry), Rural Health Unit (RHU).
- Key Tourist Destinations: Mount Amor (mountain trekking & panoramic view deck), Barat River Eco-Park (clean river spillway & picnic grounds), Salasa Caves (natural rock caves), Umingan Town Plaza & Heritage Fountain, Immaculate Conception Parish Church, Kanen Festival (celebrating sticky rice delicacies like suman, tupig, and kalamay).
- Emergency Hotlines: PNP Umingan (+63 998 598 5092), BFP Fire Station (+63 923 741 8912), MDRRMO Rescue 911 (+63 917 123 4567), RHU Emergency (+63 920 888 7766).
- Barangays: 58 Barangays including Poblacion East, Poblacion West, Barat, Alo-o, Cabalitian, Salasa, San Vicente, Prado, Esperanza, La Paz, San Manuel, etc.

Instructions:
- Provide clear, polite, structured responses in English, Tagalog, or Ilocano depending on user input.
- Give step-by-step checklists for permit applications or public services when requested.
- Highlight tourism spots with travel tips, best time to visit, and local delicacies (e.g., Kanen delicacies like Tupig, Suman, Kalamay).
- Keep formatting clean with bullet points and bold headers.`;

    const formattedContents = [
      ...(history || []).slice(-6).map((h: { role: string; content: string }) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.content }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.6,
      }
    });

    return NextResponse.json({ reply: response.text || "Thank you for reaching out to the Umingan LGU. How else can we assist you today?" });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({
      reply: "Thank you for contacting LGU Umingan. For urgent concerns, please call our hotline at (075) 574-1234 or visit the Municipal Hall in Poblacion, Umingan, Pangasinan."
    });
  }
}

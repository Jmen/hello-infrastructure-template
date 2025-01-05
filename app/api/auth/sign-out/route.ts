import { signOutAction } from "@/components/auth/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json({ error: "Authorization header required" }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const result = await signOutAction(token);
    
    if (result?.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
    }
    
    return NextResponse.json({ success: true });
}